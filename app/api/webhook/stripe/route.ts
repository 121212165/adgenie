import { NextRequest, NextResponse } from "next/server";

// Stripe webhook:支付成功 → 升级用户为 pro(AC-4.2)
// 真实模式:验签后更新 Supabase users.plan='pro'
// Mock 模式:?mock=pro 直接返回成功(供 checkout mock 回调)

export async function GET(req: NextRequest) {
  const mock = req.nextUrl.searchParams.get("mock");
  if (mock === "pro") {
    // Mock 升级(演示):实际生产由 POST webhook 处理
    return NextResponse.json({ ok: true, mode: "mock", upgraded: "pro" }, { status: 200 });
  }
  return NextResponse.json({ ok: false, error: "invalid mock" }, { status: 400 });
}

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ received: true, mode: "mock" }, { status: 200 });
    }

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(secretKey);
    const signature = req.headers.get("stripe-signature");
    if (!signature) throw new Error("missing stripe-signature");

    const rawBody = await req.text();
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? ""
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as { client_reference_id?: string };
      const userId = session.client_reference_id;
      if (userId) {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (url && serviceKey) {
          const { createClient } = await import("@supabase/supabase-js");
          const sb = createClient(url, serviceKey);
          await sb.from("users").update({ plan: "pro" }).eq("id", userId);
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "webhook error";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
}
