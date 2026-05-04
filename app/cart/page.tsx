import type { Metadata } from 'next';
import { CartClient } from '@/components/store';
export const metadata: Metadata = { title: 'ตะกร้าสินค้า', robots: { index: false, follow: false } };
export default function CartPage() { return <CartClient />; }
