import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/store';
import { getProduct, products, siteUrl } from '@/lib/products';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: 'ไม่พบสินค้า' };
  return {
    title: `${product.name} ราคา ${product.price} บาท`,
    description: `${product.name} ${product.short} พร้อมส่ง สั่งซื้อผ่าน LINE ได้`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: product.name, description: product.short, url: `/products/${product.slug}`, images: [{ url: product.image }] }
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return notFound();
  const related = products.filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand)).slice(0, 4);
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Product', name: product.name, image: product.image, description: product.description, brand: { '@type': 'Brand', name: product.brand }, sku: product.id, offers: { '@type': 'Offer', priceCurrency: 'THB', price: product.price, availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock', url: `${siteUrl}/products/${product.slug}` }, aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviews } };
  return <><ProductDetail product={product} related={related.length ? related : products.filter((p)=>p.id!==product.id).slice(0,4)} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></>;
}
