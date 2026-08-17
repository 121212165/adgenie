import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy · AdGenie",
  description: "AdGenie 隐私政策 — 我们收集什么数据、为什么收集、如何保护你的数据。",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14 font-sans text-[#1A1A2E]">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-[#6B7280]">最后更新:2026-08-17</p>
      <div className="mt-8 space-y-6 text-sm leading-7 text-[#374151]">
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">1. 我们收集哪些数据</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>账户信息:邮箱地址、登录账号(通过第三方 Auth 登录)</li>
            <li>使用数据:你输入的 prompt、上传的商品图片、生成结果记录</li>
            <li>支付相关记录:订阅状态、支付时间(支付处理由第三方支付服务商完成,我们不存储卡号)</li>
            <li>日志:基础访问日志(IP、设备、页面),用于风控与故障排查</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">2. 为什么收集</h2>
          <p>
            登录与身份识别、提供生成与存储服务、额度计费、风险控制与反滥用、客服支持、满足法律合规要求。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">3. 第三方服务</h2>
          <p>为提供本服务,我们会与以下类别的服务商共享必要数据:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>认证服务(Supabase Auth / Google OAuth):邮箱、账号标识</li>
            <li>数据库与存储(Supabase Postgres / Storage):账户、生成记录、上传素材</li>
            <li>AI 模型服务商:上传图片与 prompt(用于生成广告素材)</li>
            <li>支付平台(Stripe 等):支付信息(由其隐私政策管辖)</li>
            <li>部署与托管(Vercel):网站内容与基础日志</li>
            <li>邮件与客服服务:客服往来邮件</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">4. 数据保存多久</h2>
          <p>
            账号与生成记录:账号存续期间保留,删除账号后 30 天内清除。支付记录:按支付服务商要求保留。
            客服邮件:问题解决后保留 12 个月。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">5. 你的权利</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>访问:查看我们持有的你的数据</li>
            <li>删除:删除账号及关联数据(联系客服)</li>
            <li>修改:更正邮箱等账户信息</li>
            <li>导出:获取你的生成记录副本</li>
            <li>撤回同意:拒绝某些非必要数据处理</li>
          </ul>
          <p className="mt-2">行使权利请邮件 <a href={`mailto:${site.supportEmail}`} className="text-[#6C5CE7] hover:underline">{site.supportEmail}</a>。</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">6. Cookies 与分析</h2>
          <p>
            我们使用必要的 Cookies 维持登录与安全;当前未接入第三方分析工具。若未来接入(如 Vercel Analytics / GA),
            会在此更新并允许你选择退出。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">7. 数据安全</h2>
          <p>
            传输全程加密(HTTPS),上传素材存于私有存储桶(仅本人可读),API 密钥仅存于服务端。我们定期审查
            访问权限,但任何互联网传输都不能保证绝对安全。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#1A1A2E]">8. 联系我们</h2>
          <p>
            隐私相关问题:<a href={`mailto:${site.supportEmail}`} className="text-[#6C5CE7] hover:underline">{site.supportEmail}</a>
          </p>
        </section>
      </div>
    </div>
  );
}
