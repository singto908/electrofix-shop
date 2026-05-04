import type { MetadataRoute } from 'next';
import { products, siteUrl } from '@/lib/products';
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 }, ...products.map((p) => ({ url: `${siteUrl}/products/${p.slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 }))];
}
