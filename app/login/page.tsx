import type { Metadata } from 'next';
import { LoginClient } from '@/components/store';
export const metadata: Metadata = { title: 'เข้าสู่ระบบ', robots: { index: false, follow: false } };
export default function LoginPage() { return <LoginClient />; }
