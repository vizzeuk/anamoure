import type { MetadataRoute } from "next";
import { client, isCmsConfigured } from "@/sanity/client";

const siteUrl = "https://anamoure.com";

async function getProductSlugs(): Promise<string[]> {
  if (!isCmsConfigured) return [];
  const query = `*[_type == "product" && defined(slug.current)][].slug.current`;
  return client.fetch<string[]>(query);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getProductSlugs();

  const productUrls: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${siteUrl}/catalogo/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/catalogo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...productUrls,
  ];
}
