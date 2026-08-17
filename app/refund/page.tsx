import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = {
  title: "Refund Policy · AdGenie",
  description: "AdGenie 退款政策 — 订阅与额度包退款规则。",
};

export default function RefundPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14 font-sans text-[#1A1A2E]">
      <h1 className="text-3xl font-bold">Refund Policy</h1>
      <p className="mt-2 text-sm text-[#6B7280]">最后更新:2026-08-17</p>
      <div className="mt-8 space-y-6 text-sm leading-7 text-[#374151]">
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">1. 适用对象</h2>
          <p>
            本政策适用于 Pro 订阅(USD 9/月)。当前阶段未提供一次性 credits 包;如未来上线,另行补充对应规则。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">2. 退款窗口</h2>
          <p>订阅后 <b>14 天内</b>可申请退款。</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">3. 可退款情形</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>误扣款、重复扣款</li>
            <li>订阅期间未使用任何生成额度</li>
            <li>平台故障导致核心功能无法使用且 48 小时内未修复</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">4. 不可退款情形</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>违反 Acceptable Use 政策导致的封禁</li>
            <li>超出 14 天退款窗口</li>
            <li>已大量使用生成服务的订阅周期</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">5. 取消订阅</h2>
          <p>
            取消后当前周期结束时停止续费,已付周期内可继续使用至周期结束;当期剩余金额不退还(14 天窗口内除外)。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">6. 处理时间与方式</h2>
          <p>退款申请批准后 <b>5-10 个工作日</b>原路退回。</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">7. 如何申请</h2>
          <p>
            发邮件至 <a href={`mailto:${site.supportEmail}`} className="text-[#6C5CE7] hover:underline">{site.supportEmail}</a>,
            附上:注册邮箱、订单号(如有)、退款原因。我们会在 3 个工作日内回复。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">8. 支付服务商角色</h2>
          <p>
            付款与退款实际由支付服务商(如 Stripe)作为 Merchant of Record 处理。AdGenie 负责确认资格与发起
            退款指令,资金流转以支付服务商规则为准。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">9. 其他政策</h2>
          <p>
            参见 <Link href="/terms" className="text-[#6C5CE7] hover:underline">Terms</Link> ·{" "}
            <Link href="/privacy" className="text-[#6C5CE7] hover:underline">Privacy</Link> ·{" "}
            <Link href="/acceptable-use" className="text-[#6C5CE7] hover:underline">Acceptable Use</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
