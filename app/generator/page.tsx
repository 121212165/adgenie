"use client";

import { useRef, useState } from "react";
import Link from "next/link";

interface Ad {
  platform: "facebook" | "instagram" | "tiktok";
  size: string;
  imageUrl: string;
  copy: string;
}

type Status = "idle" | "uploading" | "generating" | "done" | "error";

const PLATFORM_LABEL: Record<Ad["platform"], string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
};

export default function GeneratorPage() {
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [productName, setProductName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [ads, setAds] = useState<Ad[]>([]);
  const [activePlatform, setActivePlatform] = useState<Ad["platform"]>("facebook");
  const [errorMsg, setErrorMsg] = useState("");
  const [credits, setCredits] = useState<number | null>(3); // AC-4.3 额度实时显示
  const [showPaywall, setShowPaywall] = useState(false); // AC-4.1 用尽弹付费引导
  const fileRef = useRef<HTMLInputElement>(null);

  // 初始查额度(AC-4.3)
  useState(() => {
    fetch("/api/credits").then(r => r.json()).then(d => { if (d.ok) setCredits(d.credits); }).catch(() => {});
  });

  // 上传(本地预览,不发服务器)
  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setStatus("error");
      setErrorMsg("图片超过 10MB,请压缩后再传(AC-1.1)");
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setStatus("error");
      setErrorMsg("仅支持 JPG / PNG / WebP(AC-1.1)");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setImageName(file.name);
      setStatus("idle");
    };
    reader.readAsDataURL(file);
  }

  async function onGenerate() {
    if (credits !== null && credits <= 0) {
      setShowPaywall(true); // 用尽先弹引导
      return;
    }
    if (!image) {
      setStatus("error");
      setErrorMsg("请先上传商品图(AC-1)");
      return;
    }
    if (productName.trim().length < 2) {
      setStatus("error");
      setErrorMsg("产品名至少 2 个字符(AC-2.1)");
      return;
    }
    setStatus("generating");
    setErrorMsg("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, productName }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "生成失败");
      setAds(data.ads);
      setActivePlatform(data.ads[0]?.platform ?? "facebook");
      setStatus("done");
      // AC-4:每次生成扣 1 次额度(mock:前端递减;真实:由 api/generate 服务端扣减)
      setCredits((c) => {
        const left = Math.max(0, (c ?? 3) - 1);
        if (left <= 0) setShowPaywall(true); // 用尽弹付费引导,不阻断已生成内容
        return left;
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "生成失败,请重试(AC-2.3)");
    }
  }

  async function onExport() {
    const ad = ads.find((a) => a.platform === activePlatform);
    if (!ad) return;
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: ad.imageUrl, platform: ad.platform, isPro: false }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      // mock 模式 data URI 直接下载
      const a = document.createElement("a");
      a.href = data.downloadUrl;
      a.download = data.fileName;
      a.click();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "导出失败");
    }
  }

  const activeAd = ads.find((a) => a.platform === activePlatform);

  return (
    <div className="min-h-screen bg-[#F7F8FA] font-sans text-[#1A1A2E]">
      <header className="border-b border-black/5 bg-white">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6C5CE7] text-sm font-bold text-white">
              A
            </span>
            <span className="text-lg font-semibold tracking-tight">AdGenie</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-[#6B7280] hover:text-[#1A1A2E]">
            ← 返回首页
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-2xl font-bold tracking-tight">生成广告素材</h1>
        <p className="mt-1 text-sm text-[#6B7280]">上传商品图 → 输入产品名 → 60 秒出 3 平台素材</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* 左:输入区 */}
          <div className="rounded-2xl border border-black/5 bg-white p-6">
            <h2 className="font-semibold">① 商品图</h2>
            <div
              className="mt-3 flex h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#6C5CE7]/40 bg-[#6C5CE7]/5 transition-colors hover:bg-[#6C5CE7]/10"
              onClick={() => fileRef.current?.click()}
            >
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt="商品图预览" className="h-32 w-32 rounded-lg object-cover" />
              ) : (
                <span className="text-sm text-[#6B7280]">拖拽/点击上传(JPG/PNG/WebP,≤10MB)</span>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={onFile}
              />
            </div>
            {imageName && (
              <p className="mt-2 text-xs text-[#6B7280]">已上传:{imageName}</p>
            )}
            <p className="mt-2 text-xs text-[#6B7280]">或粘贴商品链接(自动抓主图):</p>
            <input
              type="text"
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              placeholder="https://your-shop.com/product/xxx"
              className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-[#6C5CE7]"
            />
            <button
              onClick={() => {
                if (linkInput.trim()) {
                  setImageName(linkInput.trim());
                  setImage(`https://placehold.co/600x600/6C5CE7/white?text=Linked+Product`);
                  setStatus("idle");
                }
              }}
              className="mt-2 text-xs font-medium text-[#6C5CE7] hover:underline"
            >
              从链接导入主图
            </button>

            <h2 className="mt-6 font-semibold">② 产品名</h2>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="例如:Ergo Chair 2.0"
              className="mt-2 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-[#6C5CE7]"
            />

            <button
              onClick={onGenerate}
              disabled={status === "generating"}
              className="mt-6 w-full rounded-xl bg-[#6C5CE7] py-3.5 font-semibold text-white shadow-lg shadow-[#6C5CE7]/25 transition-colors hover:bg-[#5a4bd1] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "generating" ? "生成中(约 60 秒)…" : "✨ 生成广告素材"}
            </button>

            {status === "error" && (
              <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-600">{errorMsg}</p>
            )}

            <p className="mt-3 flex items-center gap-2 text-xs text-[#6B7280]">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#00B894]" />
              剩余额度:{credits ?? "-"} 次(免费试用,AC-4)
            </p>
          </div>

          {/* 右:结果画布 */}
          <div className="rounded-2xl border border-black/5 bg-white p-6">
            <h2 className="font-semibold">③ 生成结果</h2>

            {status === "generating" && (
              <div className="mt-6 flex h-72 flex-col items-center justify-center gap-3 text-[#6B7280]">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#6C5CE7]/30 border-t-[#6C5CE7]" />
                <p className="text-sm">第一步:构图 … 第二步:写文案 …</p>
              </div>
            )}

            {status === "done" && activeAd && (
              <div className="mt-4">
                {/* 平台切换 */}
                <div className="flex gap-2">
                  {ads.map((ad) => (
                    <button
                      key={ad.platform}
                      onClick={() => setActivePlatform(ad.platform)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        activePlatform === ad.platform
                          ? "bg-[#6C5CE7] text-white"
                          : "bg-black/5 text-[#6B7280] hover:bg-black/10"
                      }`}
                    >
                      {PLATFORM_LABEL[ad.platform]} {ad.size}
                    </button>
                  ))}
                </div>

                {/* 图 */}
                <div className="mt-4 flex justify-center rounded-xl bg-[#F7F8FA] p-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeAd.imageUrl}
                    alt={`${PLATFORM_LABEL[activeAd.platform]} 广告素材`}
                    className="max-h-80 rounded-lg shadow"
                  />
                </div>

                {/* 文案 */}
                <div className="mt-4 rounded-xl border border-black/5 p-4">
                  <p className="text-xs font-medium text-[#6B7280]">广告文案</p>
                  <p className="mt-1 text-sm leading-6">{activeAd.copy}</p>
                </div>

                {/* 导出 */}
                <button
                  onClick={onExport}
                  className="mt-4 w-full rounded-xl bg-[#00B894] py-3 font-semibold text-white transition-colors hover:bg-[#00a383]"
                >
                  导出(免费版 1280px 带水印)
                </button>
                <p className="mt-2 text-center text-xs text-[#6B7280]">
                  Pro 解锁 2048px 无水印 + 全尺寸(见
                  <Link href="/pricing" className="text-[#6C5CE7] hover:underline">
                    定价
                  </Link>
                  )
                </p>
              </div>
            )}

            {status === "idle" && (
              <div className="mt-6 flex h-72 items-center justify-center rounded-xl bg-[#F7F8FA] text-sm text-[#6B7280]">
                上传商品图后,点击「生成广告素材」,结果会显示在这里
              </div>
            )}
          </div>
        </div>
      </main>


      {/* AC-4.1 付费引导弹窗(额度用尽;不阻断已生成内容下载) */}
      {showPaywall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <h3 className="text-xl font-bold">免费额度已用完</h3>
            <p className="mt-2 text-sm text-[#6B7280]">
              升级 Pro 解锁无限生成 + 2048px 无水印。已生成的内容仍可随时下载。
            </p>
            <button
              onClick={async () => {
                const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
                const d = await res.json();
                if (d.ok && d.checkoutUrl) window.location.href = d.checkoutUrl;
                else setErrorMsg(d.error ?? "支付入口暂不可用");
              }}
              className="mt-5 w-full rounded-xl bg-[#6C5CE7] py-3 font-semibold text-white transition-colors hover:bg-[#5a4bd1]"
            >
              升级 Pro · $9/月
            </button>
            <button
              onClick={() => setShowPaywall(false)}
              className="mt-2 w-full rounded-xl border border-black/10 py-2.5 text-sm font-medium text-[#6B7280] hover:bg-black/5"
            >
              先继续使用(保留已生成内容)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
