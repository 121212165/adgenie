import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = {
  title: "Terms of Service · AdGenie",
  description: "AdGenie 服务条款 — 使用 AI 电商广告素材生成器的用户协议。",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14 font-sans text-[#1A1A2E]">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="mt-2 text-sm text-[#6B7280]">最后更新:2026-08-17</p>
      <div className="mt-8 space-y-6 text-sm leading-7 text-[#374151]">
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">1. 服务说明</h2>
          <p>
            {site.name} 是一个面向独立电商卖家的 AI 广告素材生成工具。用户上传商品图片或粘贴商品链接,
            AdGenie 通过 AI 生成 Facebook / Instagram / TikTok 平台的广告创意图与英文文案,并可一键导出。
            使用本服务即表示你同意本条款。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">2. 账户与额度</h2>
          <p>
            注册即获得 3 次免费生成额度(Pro 订阅用户不受限)。额度在服务端扣减,不兑换现金、不可转让。
            你需对账户下的一切行为负责,并妥善保管登录凭据。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">3. 用户内容与责任</h2>
          <p>
            你保证上传的素材(图片、商品链接、文案输入)拥有合法使用权。生成结果可用于你的商业广告投放,
            但你须自行遵守各广告平台(Meta、TikTok 等)对 AI 生成内容的披露要求。不得上传违法、侵权、
            NSFW、仿冒或涉及未成年人性化的内容(详见 Acceptable Use)。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">4. AI 生成结果的免责</h2>
          <p>
            AI 生成内容(图片、文案)可能包含不准确、不完整或不符合你预期的部分。AdGenie 不对生成结果的
            商业效果、合规性或可投放性作任何保证。你在投放前应对素材进行人工审核。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">5. 订阅与退款</h2>
          <p>
            Pro 订阅为 USD 9/月,通过支付服务商处理。退款规则详见{" "}
            <Link href="/refund" className="text-[#6C5CE7] hover:underline">Refund Policy</Link>。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">6. 服务可用性</h2>
          <p>
            AdGenie 依赖第三方 AI API 与基础设施,尽力保证稳定但不承诺 100% 可用。因维护、升级或第三方
            故障导致的中断,不构成退款理由(平台故障导致无法使用的情形除外,见退款政策)。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">7. 条款变更</h2>
          <p>我们可能不时更新本条款,更新后会在本页面公布并更新「最后更新」日期。继续使用即视为接受新条款。</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">8. 联系我们</h2>
          <p>
            如有疑问,请通过 <a href={`mailto:${site.supportEmail}`} className="text-[#6C5CE7] hover:underline">{site.supportEmail}</a>{" "}
            联系我们。
          </p>
        </section>
      </div>
    </div>
  );
}
