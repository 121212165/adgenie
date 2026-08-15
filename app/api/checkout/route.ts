import { NextRequest, NextResponse } from "next/server";

// Stripe checkout 会话(AC-4.2)
// 真实模式:配置 STRIPE_SECRET_KEY 后走 Stripe Checkout
// Mock 模式:无 key 时返回模拟 checkout URL,动线可跑通

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      // Mock:模拟 checkout 会话(演示用,不会真实扣款)
      return NextResponse.json(
        {
          ok: true,
          mode: "mock",
          checkoutUrl: `/api/webhook/stripe?mock=pro&price=9`,
          message: "Mock 模式:模拟 Pro 订阅 $9/月(未配置 Stripe Key)",
        },
        { status: 200 }
      );
    }

    // 真实模式:创建 Stripe Checkout Session
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(secretKey);
    const body = (await req.json()) as { userId?: string };
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID_PRO, // Pro $9/月(Stripe 后台创建)
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/generator?paid=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/pricing?paid=cancel`,
      client_reference_id: body.userId,
    });

    return NextResponse.json({ ok: true, mode: "real", checkoutUrl: session.url }, { status: 200 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "创建支付会话失败";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
