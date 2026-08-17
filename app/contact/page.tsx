import { site } from "@/lib/site";

export const metadata = {
  title: "Contact Us · AdGenie",
  description: "联系 AdGenie 客服 — 支持邮箱。",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-14 font-sans text-[#1A1A2E]">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="mt-3 text-sm text-[#6B7280]">
        有任何问题?给我们发邮件,我们通常会在 3 个工作日内回复。
      </p>
      <div className="mt-8 rounded-2xl border border-black/10 bg-white p-8">
        <p className="text-sm font-medium text-[#6B7280]">客服邮箱</p>
        <a
          href={`mailto:${site.supportEmail}?subject=${encodeURIComponent("AdGenie 支持请求")}`}
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[#6C5CE7] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#5a4bd1]"
        >
          ✉️ {site.supportEmail}
        </a>
        <div className="mt-8 space-y-2 text-sm text-[#6B7280]">
          <p><b className="text-[#1A1A2E]">商务合作 / 反馈建议</b>:同一邮箱,主题注明即可。</p>
          <p><b className="text-[#1A1A2E]">隐私 / 数据请求</b>:见{" "}
            <a href="/privacy" className="text-[#6C5CE7] hover:underline">Privacy Policy</a> 第 5 节。</p>
          <p><b className="text-[#1A1A2E]">退款申请</b>:见{" "}
            <a href="/refund" className="text-[#6C5CE7] hover:underline">Refund Policy</a> 第 7 节。</p>
        </div>
      </div>
    </div>
  );
}
