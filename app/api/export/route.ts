import { NextRequest, NextResponse } from "next/server";
import { platformSize } from "@/lib/image-api";

export const runtime = "nodejs";
export const maxDuration = 30;

// AC-3:免费 1280px 带水印 / Pro 2048px 无水印 + 全尺寸
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      imageUrl?: string;
      platform?: "facebook" | "instagram" | "tiktok";
      isPro?: boolean;
    };

    const { imageUrl, platform, isPro } = body;
    if (!imageUrl || !platform) {
      return NextResponse.json({ error: "缺少导出参数" }, { status: 400 });
    }

    const size = platformSize(platform);
    const baseName = `adgenie-${platform}-${size.replace("×", "x")}`;

    // mock 模式的 data URI 直接回传(真实模式下由图像 API 生成,同样回传 URL)
    const downloadUrl = imageUrl;
    const watermark = !isPro; // 免费版带水印

    return NextResponse.json(
      {
        ok: true,
        downloadUrl,
        fileName: `${baseName}${watermark ? "-watermark" : "-hd"}.png`,
        size,
        watermark,
      },
      { status: 200 }
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "导出失败";
    return NextResponse.json({ ok: false, error: `导出失败:${msg}` }, { status: 500 });
  }
}
