import { NextRequest, NextResponse } from "next/server";
import { getCredits } from "@/lib/credits";

// 额度查询(AC-4.3:右上角实时可见)
// userId 由 header 传入(mock 场景用固定测试 id;生产接 Auth 后取登录态)
export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id") ?? "test-user";
  try {
    const { credits, mode } = await getCredits(userId);
    return NextResponse.json({ ok: true, credits, mode }, { status: 200 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "查询额度失败";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
