import type { MetadataRoute } from "next";
import { allTypes } from "@/data/profile";
import { templates } from "@/data/templates";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/explore`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/work`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/templates`, changeFrequency: "monthly", priority: 0.8 },
    ...templates.map((t) => ({
      url: `${siteUrl}/templates/${t.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.6 },
    ...allTypes.map((m) => ({
      url: `${siteUrl}/multitudes/${m.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
