import type { Metadata } from 'next';
import { AccountClient } from '@/components/store';
export const metadata: Metadata = { title: 'บัญชีของฉัน', robots: { index: false, follow: false } };
export default function AccountPage() { return <AccountClient />; }
