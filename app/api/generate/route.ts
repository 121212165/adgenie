import { NextRequest, NextResponse } from "next/server";
import { generateAd } from "@/lib/image-api";

export const runtime = "nodejs";
export const maxDuration = 60; // AC-2:≤60s

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { image?: string; productName?: string };

    const image = body.image;
    const productName = body.productName?.trim();

    // 参数校验
    if (!image) {
      return NextResponse.json({ error: "缺少商品图" }, { status: 400 });
    }
    if (!productName || productName.length < 2) {
      return NextResponse.json({ error: "产品名至少 2 个字符" }, { status: 400 });
    }

    // 生成编排(图像 API + 文案,60s 超时)
    const result = await generateAd(image, productName);

    return NextResponse.json({ ok: true, ...result }, { status: 200 });
  } catch (e) {
    // AC-2.3:失败给可理解错误,不白屏
    const msg = e instanceof Error ? e.message : "生成失败";
    console.error("[generate] error:", msg);
    return NextResponse.json({ ok: false, error: `生成失败:${msg}` }, { status: 500 });
  }
}
