import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  const now = new Date();
  const pages = [
    { path: "", priority: 1, freq: "weekly" as const },
    { path: "/pricing", priority: 0.8, freq: "monthly" as const },
    { path: "/terms", priority: 0.3, freq: "yearly" as const },
    { path: "/privacy", priority: 0.3, freq: "yearly" as const },
    { path: "/refund", priority: 0.3, freq: "yearly" as const },
    { path: "/acceptable-use", priority: 0.3, freq: "yearly" as const },
    { path: "/contact", priority: 0.3, freq: "yearly" as const },
  ];
  return pages.map((p) => ({
    url: `${base}${p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));
}
