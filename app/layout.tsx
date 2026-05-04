import type { Metadata } from 'next';
import './globals.css';
import { Footer, Header, StoreProvider } from '@/components/store';
import { siteUrl } from '@/lib/products';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'ElectroFixParts | อะไหล่ซ่อมอิเล็กทรอนิกส์ แผงวงจร ดอกลำโพง เครื่องมือซ่อม', template: '%s | ElectroFixParts' },
  description: 'ร้านขายอะไหล่อิเล็กทรอนิกส์ อุปกรณ์ซ่อมเครื่องใช้ไฟฟ้า แผงวงจร ดอกลำโพง คาปาซิเตอร์ หัวแร้ง มัลติมิเตอร์ พร้อมสั่งซื้อผ่าน LINE',
  keywords: ['อะไหล่อิเล็กทรอนิกส์', 'แผงวงจร', 'ดอกลำโพง', 'อุปกรณ์ซ่อมเครื่องใช้ไฟฟ้า', 'คาปาซิเตอร์', 'หัวแร้ง', 'มัลติมิเตอร์'],
  alternates: { canonical: '/' },
  openGraph: { title: 'ElectroFixParts', description: 'อะไหล่ซ่อมอิเล็กทรอนิกส์ครบวงจร ส่งไว ทัก LINE ได้', url: '/', siteName: 'ElectroFixParts', locale: 'th_TH', type: 'website' },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationLd = {
    '@context': 'https://schema.org', '@type': 'Store', name: 'ElectroFixParts', url: siteUrl,
    description: 'ร้านอะไหล่ซ่อมอิเล็กทรอนิกส์และเครื่องใช้ไฟฟ้า', telephone: '02-123-4567'
  };
  return <html lang="th"><body><StoreProvider><Header />{children}<Footer /></StoreProvider><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} /></body></html>;
}
