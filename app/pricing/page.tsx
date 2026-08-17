import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = {
  title: "Pricing · AdGenie",
  description: "AdGenie 定价 — 免费 3 次试用,Pro 订阅 USD 9/月(2048px 无水印 + 全部尺寸)。",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1A1A2E]">
      <header className="border-b border-black/5 bg-white">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6C5CE7] text-sm font-bold text-white">A</span>
            <span className="text-lg font-semibold tracking-tight">AdGenie</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-[#6B7280] hover:text-[#1A1A2E]">← 返回首页</Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-14">
        <h1 className="text-center text-3xl font-bold tracking-tight">简单定价</h1>
        <p className="mt-2 text-center text-sm text-[#6B7280]">
          币种:USD · 周期:月付 · 随时取消
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-2">
          {/* 免费 */}
          <div className="rounded-2xl border border-black/10 p-8">
            <h3 className="text-lg font-semibold">Free</h3>
            <p className="mt-2 text-3xl font-bold">$0<span className="text-base font-normal text-[#6B7280]">/月</span></p>
            <ul className="mt-4 space-y-2 text-sm text-[#6B7280]">
              <li>✓ 3 次免费生成额度</li>
              <li>✓ FB / IG / TikTok 各 1 张创意图 + 文案</li>
              <li>✓ 1280px 导出(带 AdGenie 水印)</li>
              <li>✓ 无需信用卡</li>
            </ul>
            <Link href="/generator" className="mt-6 block rounded-xl border border-[#6C5CE7] py-3 text-center font-semibold text-[#6C5CE7] transition-colors hover:bg-[#6C5CE7]/5">
              开始免费试用
            </Link>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border-2 border-[#6C5CE7] bg-[#6C5CE7]/5 p-8">
            <span className="rounded-full bg-[#6C5CE7] px-3 py-1 text-xs font-semibold text-white">推荐</span>
            <h3 className="mt-2 text-lg font-semibold">Pro</h3>
            <p className="mt-2 text-3xl font-bold">$9<span className="text-base font-normal text-[#6B7280]">/月 · USD</span></p>
            <ul className="mt-4 space-y-2 text-sm text-[#6B7280]">
              <li>✓ 无限生成额度</li>
              <li>✓ 2048px 高清无水印</li>
              <li>✓ 全部平台尺寸批量导出</li>
              <li>✓ 优先客服</li>
            </ul>
            {/* 未接入支付前:Join Waitlist(阶段3 要求) */}
            <JoinWaitlist />
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-[#6B7280]">
          支付服务接入中 — 先加入 Waitlist,上线第一时间通知你。
        </p>
      </main>

      <Footer />
    </div>
  );
}

function JoinWaitlist() {
  return (
    <form
      action="/api/waitlist"
      method="POST"
      className="mt-6 space-y-3"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-[#6C5CE7]"
      />
      <button
        type="submit"
        className="w-full rounded-xl bg-[#6C5CE7] py-3 font-semibold text-white transition-colors hover:bg-[#5a4bd1]"
      >
        Join Waitlist
      </button>
      <p className="text-center text-xs text-[#6B7280]">支付上线前 0 元锁定 Pro 权益</p>
    </form>
  );
}

function Footer() {
  return (
    <footer className="border-t border-black/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-[#6B7280] sm:flex-row">
        <span>© 2026 {site.name}</span>
        <nav className="flex flex-wrap items-center gap-4">
          <Link href="/terms" className="hover:text-[#1A1A2E]">Terms</Link>
          <Link href="/privacy" className="hover:text-[#1A1A2E]">Privacy</Link>
          <Link href="/refund" className="hover:text-[#1A1A2E]">Refund</Link>
          <Link href="/acceptable-use" className="hover:text-[#1A1A2E]">Acceptable Use</Link>
          <Link href="/contact" className="hover:text-[#1A1A2E]">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
