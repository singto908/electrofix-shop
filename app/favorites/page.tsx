import type { Metadata } from 'next';
import { FavoritesClient } from '@/components/store';
export const metadata: Metadata = { title: 'สินค้าที่ถูกใจ', robots: { index: false, follow: false } };
export default function FavoritesPage() { return <FavoritesClient />; }
