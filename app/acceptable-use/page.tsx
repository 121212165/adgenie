import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = {
  title: "Acceptable Use Policy · AdGenie",
  description: "AdGenie 可接受使用政策 — AI 内容生成产品的使用边界与内容审核机制。",
};

export default function AcceptableUsePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14 font-sans text-[#1A1A2E]">
      <h1 className="text-3xl font-bold">Acceptable Use Policy</h1>
      <p className="mt-2 text-sm text-[#6B7280]">最后更新:2026-08-17</p>
      <div className="mt-8 space-y-6 text-sm leading-7 text-[#374151]">
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">1. 适用范围</h2>
          <p>本政策适用于你对 AdGenie 的全部使用,包括:prompt 输入、上传图片、生成结果与账号行为。</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">2. 禁止用途</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>违法用途:诈骗、钓鱼、非法交易、规避执法、网络攻击等</li>
            <li>成人 / NSFW 内容,特别是 AI 图像/视频生成场景</li>
            <li>任何涉及未成年人的性化、剥削、诱导或虐待内容</li>
            <li>非自愿深度伪造、冒充、名人/普通人肖像滥用</li>
            <li>侵权内容:盗用品牌、商标、版权素材、受保护角色、未经授权的人像</li>
            <li>误导性政治、医疗、金融、法律内容</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">3. 内容审核机制</h2>
          <p>
            prompt / 上传内容 / 生成输出可能被自动或人工审核。审核触发条件包括但不限于:举报、异常使用模式、
            模型服务商的违规信号。审核仅用于风控与合规,不会用于训练或出售你的数据(见 Privacy Policy)。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">4. 违规处理</h2>
          <p>
            视情节轻重,我们可能:拒绝生成、删除违规内容、暂停账户、终止服务、拒绝退款。严重或重复违规将
            立即终止服务。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">5. 用户责任</h2>
          <p>
            你对输入内容、上传素材、生成结果及其使用方式负全部责任,包括投放前的合规审核与遵守各广告平台规则。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">6. 举报与申诉</h2>
          <p>
            发现违规内容或对你的账号处理有异议,请邮件{" "}
            <a href={`mailto:${site.supportEmail}`} className="text-[#6C5CE7] hover:underline">{site.supportEmail}</a>{" "}
            说明情况,我们会在 3 个工作日内复核。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">7. 其他政策</h2>
          <p>
            参见 <Link href="/terms" className="text-[#6C5CE7] hover:underline">Terms</Link> ·{" "}
            <Link href="/privacy" className="text-[#6C5CE7] hover:underline">Privacy</Link> ·{" "}
            <Link href="/refund" className="text-[#6C5CE7] hover:underline">Refund</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
