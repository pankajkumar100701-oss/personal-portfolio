import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/work`, changeFrequency: "monthly", priority: 0.8 },
    ...profile.multitudes.map((m) => ({
      url: `${siteUrl}/multitudes/${m.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
