// 图像生成 API 封装
// 真实模式:调用配置的图像 API(env: IMAGE_API_KEY / IMAGE_API_URL)
// Mock 模式:无 key 时返回占位素材,保证核心动线可跑通、可演示

export interface GeneratedAd {
  platform: "facebook" | "instagram" | "tiktok";
  size: string;
  imageUrl: string; // 生成图(或 mock 占位图)
  copy: string; // 广告文案
}

const PLATFORM_SIZES: Record<GeneratedAd["platform"], string> = {
  facebook: "1200×628",
  instagram: "1080×1080",
  tiktok: "1080×1920",
};

export function platformSize(p: GeneratedAd["platform"]): string {
  return PLATFORM_SIZES[p];
}

function mockImageUrl(platform: GeneratedAd["platform"], productName: string): string {
  // mock 占位:用数据 URI 画一张带平台标签的广告图(演示用)
  const label = `${platform.toUpperCase()} ${PLATFORM_SIZES[platform]}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <rect width="600" height="600" fill="#6C5CE7"/>
    <rect x="40" y="40" width="520" height="520" rx="24" fill="#5a4bd1"/>
    <text x="300" y="240" font-family="Arial" font-size="44" fill="#fff" text-anchor="middle" font-weight="bold">${productName}</text>
    <text x="300" y="300" font-family="Arial" font-size="28" fill="#ddd" text-anchor="middle">Ad by AdGenie (mock)</text>
    <text x="300" y="500" font-family="Arial" font-size="22" fill="#fff" text-anchor="middle">${label}</text>
    <text x="300" y="545" font-family="Arial" font-size="16" fill="#ccc" text-anchor="middle">AI-generated · AdGenie</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function mockCopy(productName: string, platform: GeneratedAd["platform"]): string {
  const ctas: Record<GeneratedAd["platform"], string> = {
    facebook: "Shop now and see the difference.",
    instagram: "Tap the link to shop this drop.",
    tiktok: "Get yours before it's gone — link in bio!",
  };
  return `Meet ${productName} — designed to make everyday life better. ${ctas[platform]}`;
}

export async function generateAd(
  image: string,
  productName: string
): Promise<{ ads: GeneratedAd[]; mode: "real" | "mock" }> {
  const apiKey = process.env.IMAGE_API_KEY;
  const apiUrl = process.env.IMAGE_API_URL;

  if (!apiKey || !apiUrl) {
    // Mock 模式:直接返回占位素材(动线可跑通,无外部依赖)
    const platforms: GeneratedAd["platform"][] = ["facebook", "instagram", "tiktok"];
    return {
      mode: "mock",
      ads: platforms.map((p) => ({
        platform: p,
        size: PLATFORM_SIZES[p],
        imageUrl: mockImageUrl(p, productName),
        copy: mockCopy(productName, p),
      })),
    };
  }

  // 真实模式:调图像 API 生成一张电商风广告图(按产品名构图),文案走 LLM
  const [imgRes] = await Promise.all([
    fetch(`${apiUrl}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        prompt: `E-commerce product ad creative for "${productName}", clean background, product focus, modern advertising style`,
        n: 3,
        size: "1024x1024",
      }),
    }),
  ]);
  if (!imgRes.ok) throw new Error(`Image API error: ${imgRes.status}`);

  const imgData = (await imgRes.json()) as { data?: { url?: string; b64_json?: string }[] };
  const urls = (imgData.data ?? []).map((d) => d.url ?? `data:image/png;base64,${d.b64_json ?? ""}`);
  if (urls.length < 3) throw new Error("Image API returned fewer than 3 images");

  const platforms: GeneratedAd["platform"][] = ["facebook", "instagram", "tiktok"];
  const copyApi = process.env.LLM_API_URL;
  const copyKey = process.env.LLM_API_KEY;
  const copies: string[] = [];
  if (copyApi && copyKey) {
    for (const p of platforms) {
      const r = await fetch(copyApi, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${copyKey}` },
        body: JSON.stringify({
          model: process.env.LLM_MODEL ?? "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: `Write one short English ad copy (under 60 words) with a CTA for ${productName} for ${p} ads.`,
            },
          ],
        }),
      });
      if (r.ok) {
        const d = (await r.json()) as { choices?: { message?: { content?: string } }[] };
        copies.push(d.choices?.[0]?.message?.content?.trim() ?? "");
      }
    }
  }

  return {
    mode: "real",
    ads: platforms.map((p, i) => ({
      platform: p,
      size: PLATFORM_SIZES[p],
      imageUrl: urls[i],
      copy: copies[i] || mockCopy(productName, p),
    })),
  };
}
