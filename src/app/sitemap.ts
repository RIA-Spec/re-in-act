import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllDocSlugs } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = getAllDocSlugs().map((slug) => ({
    url: `${SITE_URL}/${slug.join("/")}`,
    changeFrequency: "weekly" as const,
    priority: slug.length === 1 ? 0.8 : 0.7,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...docs,
  ];
}
