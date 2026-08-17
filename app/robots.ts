import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/generator"], // 生成器需要登录/交互,不收录;API 不收录
      },
    ],
    sitemap: `https://${site.domain}/sitemap.xml`,
  };
}
