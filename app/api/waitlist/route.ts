import { NextRequest, NextResponse } from "next/server";

// Join Waitlist(阶段3:未接支付前收集意向用户)
// 真实模式:写 Supabase waitlist 表;Mock 模式:校验后返回 ok(演示)
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const email = (form.get("email") as string)?.trim().toLowerCase() ?? "";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "邮箱格式不正确" }, { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (url && serviceKey) {
      const { createClient } = await import("@supabase/supabase-js");
      const sb = createClient(url, serviceKey);
      const { error } = await sb.from("waitlist").insert({ email });
      if (error) {
        if (error.code === "23505") {
          return NextResponse.json({ ok: true, message: "你已在候选名单中" }, { status: 200 });
        }
        throw error;
      }
      return NextResponse.json({ ok: true, message: "已加入 Waitlist" }, { status: 200 });
    }

    // Mock 模式
    return NextResponse.json({ ok: true, mode: "mock", message: "已加入 Waitlist(演示模式)" }, { status: 200 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "加入失败";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
