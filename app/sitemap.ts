import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/locales";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: SITE_URL,
          tr: `${SITE_URL}/tr`,
        },
      },
    },
    {
      url: `${SITE_URL}/tr`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: SITE_URL,
          tr: `${SITE_URL}/tr`,
        },
      },
    },
  ];
}
