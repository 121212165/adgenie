// 站点集中配置:改域名/邮箱只动这一处
export const site = {
  name: "AdGenie",
  tagline: "AI 电商广告素材生成器",
  domain: "useadgenie.com", // 待购买后确认;当前线上预览域: adgenie-app.vercel.app
  supportEmail: "support@useadgenie.com",
  pricing: {
    free: { credits: 3, resolution: "1280px", watermark: true },
    pro: { price: 9, currency: "USD", period: "monthly", resolution: "2048px", watermark: false },
  },
} as const;
