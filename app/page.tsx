import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1A1A2E]">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 border-b border-black/5 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6C5CE7] text-sm font-bold text-white">
              A
            </span>
            <span className="text-lg font-semibold tracking-tight">AdGenie</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/generator" className="text-sm font-medium text-[#6B7280] hover:text-[#1A1A2E]">
              免费生成
            </Link>
            <Link
              href="/generator"
              className="rounded-lg bg-[#6C5CE7] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#5a4bd1]"
            >
              开始试用
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 text-center">
          <p className="mx-auto mb-4 inline-block rounded-full bg-[#6C5CE7]/10 px-4 py-1 text-sm font-medium text-[#6C5CE7]">
            3 个平台尺寸 · 60 秒出图 · AI 生成声明合规
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            10 分钟,把一张商品图
            <br />
            变成一套广告素材
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[#6B7280]">
            面向电商卖家的 AI 广告素材生成器:上传商品图,生成
            Facebook / Instagram / TikTok 创意图 + 英文文案,一键导出。不用学设计,不用请设计师。
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/generator"
              className="rounded-xl bg-[#6C5CE7] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#6C5CE7]/25 transition-colors hover:bg-[#5a4bd1]"
            >
              立即免费生成
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-black/10 px-8 py-3.5 text-base font-semibold text-[#1A1A2E] transition-colors hover:bg-black/5"
            >
              查看定价
            </Link>
          </div>
          <p className="mt-4 text-sm text-[#6B7280]">注册即送 3 次免费生成额度,无需信用卡</p>
        </section>

        {/* 三步用法 */}
        <section className="border-t border-black/5 bg-[#F7F8FA] py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-2xl font-bold tracking-tight">三步,出素材</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  step: "①",
                  title: "上传商品图",
                  desc: "拖拽上传产品图,或粘贴商品链接自动抓主图",
                },
                {
                  step: "②",
                  title: "AI 生成图 + 文案",
                  desc: "输入产品名,60 秒生成 3 平台广告创意图 + 英文文案",
                },
                {
                  step: "③",
                  title: "一键导出",
                  desc: "免费 1280px 带水印,Pro 解锁 2048px 无水印全尺寸",
                },
              ].map((s) => (
                <div key={s.step} className="rounded-2xl border border-black/5 bg-white p-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6C5CE7]/10 text-lg font-bold text-[#6C5CE7]">
                    {s.step}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 定价入口 */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-center text-2xl font-bold tracking-tight">简单定价</h2>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-black/10 p-8">
              <h3 className="text-lg font-semibold">免费</h3>
              <p className="mt-2 text-3xl font-bold">
                $0<span className="text-base font-normal text-[#6B7280]">/月</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[#6B7280]">
                <li>✓ 3 次免费生成</li>
                <li>✓ 1280px 带水印导出</li>
                <li>✓ FB/IG/TK 各 1 张</li>
              </ul>
              <Link
                href="/generator"
                className="mt-6 block rounded-xl border border-[#6C5CE7] py-3 text-center font-semibold text-[#6C5CE7] transition-colors hover:bg-[#6C5CE7]/5"
              >
                开始免费试用
              </Link>
            </div>
            <div className="rounded-2xl border-2 border-[#6C5CE7] bg-[#6C5CE7]/5 p-8">
              <span className="rounded-full bg-[#6C5CE7] px-3 py-1 text-xs font-semibold text-white">
                推荐
              </span>
              <h3 className="mt-2 text-lg font-semibold">Pro</h3>
              <p className="mt-2 text-3xl font-bold">
                $9<span className="text-base font-normal text-[#6B7280]">/月</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[#6B7280]">
                <li>✓ 无限生成</li>
                <li>✓ 2048px 无水印 + 全部尺寸</li>
                <li>✓ 批量导出</li>
              </ul>
              <Link
                href="/pricing"
                className="mt-6 block rounded-xl bg-[#6C5CE7] py-3 text-center font-semibold text-white transition-colors hover:bg-[#5a4bd1]"
              >
                升级 Pro
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ + 合规 */}
        <section className="border-t border-black/5 bg-[#F7F8FA] py-12">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <p className="text-sm text-[#6B7280]">
              生成内容均附带 AI 生成声明,符合 Meta / TikTok 广告平台对 AI 内容的披露要求。
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-[#6B7280] sm:flex-row">
          <span>© 2026 AdGenie</span>
          <nav className="flex flex-wrap items-center gap-4">
            <Link href="/terms" className="hover:text-[#1A1A2E]">Terms</Link>
            <Link href="/privacy" className="hover:text-[#1A1A2E]">Privacy</Link>
            <Link href="/refund" className="hover:text-[#1A1A2E]">Refund</Link>
            <Link href="/acceptable-use" className="hover:text-[#1A1A2E]">Acceptable Use</Link>
            <Link href="/contact" className="hover:text-[#1A1A2E]">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
