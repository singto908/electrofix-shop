'use client';

import Link from 'next/link';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Heart, MessageCircle, Minus, Plus, Search, ShoppingCart, Trash2, User, X } from 'lucide-react';
import { brands, categories, lineUrl, money, Product, products } from '@/lib/products';

type UserProfile = { name: string; phone: string; email: string } | null;
type ChatMessage = { from: 'user' | 'shop'; text: string };

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try { return JSON.parse(localStorage.getItem(key) || '') as T; } catch { return fallback; }
}
function writeJson<T>(key: string, value: T) { if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(value)); }

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [user, setUser] = useState<UserProfile>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ from: 'shop', text: 'สวัสดีครับ ElectroFix Parts ยินดีให้คำปรึกษาเรื่องอะไหล่และอุปกรณ์ซ่อมครับ' }]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => { setCart(readJson('ef_cart', {})); setFavorites(readJson('ef_favorites', [])); setUser(readJson('ef_user', null)); setHydrated(true); }, []);
  useEffect(() => { if (hydrated) writeJson('ef_cart', cart); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) writeJson('ef_favorites', favorites); }, [favorites, hydrated]);
  useEffect(() => { if (hydrated) writeJson('ef_user', user); }, [user, hydrated]);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartItems = useMemo(() => Object.entries(cart).map(([id, qty]) => ({ product: products.find((p) => p.id === id)!, qty })).filter((x) => x.product), [cart]);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  function addToCart(id: string) { setCart((v) => ({ ...v, [id]: (v[id] || 0) + 1 })); }
  function removeFromCart(id: string) { setCart((v) => { const next = { ...v }; delete next[id]; return next; }); }
  function changeQty(id: string, diff: number) { setCart((v) => ({ ...v, [id]: Math.max(1, (v[id] || 1) + diff) })); }
  function toggleFavorite(id: string) { setFavorites((v) => v.includes(id) ? v.filter((x) => x !== id) : [...v, id]); }
  function sendChat(text: string) {
    const clean = text.trim(); if (!clean) return;
    setMessages((m) => [...m, { from: 'user', text: clean }, { from: 'shop', text: 'รับเรื่องแล้วครับ ทีมงานจะช่วยเช็กสเปก/ความเข้ากันได้ และแนะนำสินค้าที่เหมาะสมให้ครับ' }]);
  }

  return <StoreContext.Provider value={{ cart, favorites, user, setUser, cartCount, cartItems, cartTotal, addToCart, removeFromCart, changeQty, toggleFavorite, chatOpen, setChatOpen, messages, sendChat }}>{children}<ChatWidget /></StoreContext.Provider>;
}

const StoreContext = createContext<any>(null);
export function useStore() { return useContext(StoreContext); }

export function Header() {
  const { cartCount, favorites, user, setChatOpen } = useStore();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const nav = [['/', 'หน้าแรก'], ['/#products', 'สินค้า'], ['/#brands', 'ยี่ห้อ'], ['/#articles', 'บทความ'], ['/cart', 'ตะกร้า']];
  const goSearch = () => { window.location.href = `/#products?q=${encodeURIComponent(q)}`; };
  return <header className="sticky top-0 z-40 border-b border-blue-100 bg-white/95 backdrop-blur">
    <div className="bg-brand-700 text-white"><div className="container-page flex items-center justify-between py-2 text-sm"><span>ส่งไวทั่วไทย • รับประกันสินค้า • ปรึกษาช่างก่อนซื้อ</span><button onClick={() => setChatOpen(true)} className="inline-flex items-center gap-2"><MessageCircle size={16}/> สอบถามแชท</button></div></div>
    <div className="container-page flex items-center gap-3 py-3">
      <Link href="/" className="text-xl sm:text-2xl font-black text-brand-700">ElectroFix<span className="text-slate-800">Parts</span></Link>
      <div className="hidden md:flex flex-1 items-center rounded-2xl border border-blue-100 bg-blue-50 px-3"><input value={q} onChange={(e)=>setQ(e.target.value)} onKeyDown={(e)=> e.key==='Enter' && goSearch()} className="w-full bg-transparent px-2 py-3 outline-none" placeholder="ค้นหาอะไหล่ เช่น คาปาซิเตอร์, ดอกลำโพง, รีเลย์"/><button onClick={goSearch} className="rounded-xl bg-brand-700 p-2 text-white"><Search size={18}/></button></div>
      <Link href="/login" className="hidden sm:flex items-center gap-1 text-sm text-slate-700"><User size={18}/>{user ? user.name : 'เข้าสู่ระบบ'}</Link>
      <Link href="/favorites" className="relative rounded-xl border border-blue-100 p-2 text-brand-700"><Heart size={20}/>{favorites.length>0 && <b className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1.5 text-xs text-white">{favorites.length}</b>}</Link>
      <Link href="/cart" className="relative rounded-xl bg-brand-700 p-2 text-white"><ShoppingCart size={20}/>{cartCount>0 && <b className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1.5 text-xs">{cartCount}</b>}</Link>
      <button onClick={()=>setOpen(!open)} className="md:hidden rounded-xl border border-blue-100 p-2">☰</button>
    </div>
    <div className="container-page md:hidden pb-3"><div className="flex rounded-2xl border border-blue-100 bg-blue-50 p-1"><input value={q} onChange={(e)=>setQ(e.target.value)} className="w-full bg-transparent px-3 outline-none" placeholder="ค้นหาอะไหล่"/><button onClick={goSearch} className="rounded-xl bg-brand-700 px-3 py-2 text-white"><Search size={18}/></button></div></div>
    <nav className={`${open ? 'block' : 'hidden'} md:block border-t border-blue-50`}><div className="container-page flex flex-col gap-1 py-2 md:flex-row md:gap-8">{nav.map(([href,label])=><Link key={href} href={href} className="rounded-xl px-3 py-2 font-medium text-slate-700 hover:bg-blue-50 hover:text-brand-700">{label}</Link>)}<button onClick={()=>setChatOpen(true)} className="rounded-xl px-3 py-2 text-left font-medium text-green-600 md:ml-auto">สั่งซื้อผ่าน LINE</button></div></nav>
  </header>;
}

export function Footer() {
  return <footer className="mt-14 bg-brand-900 text-white">
    <div className="container-page grid gap-8 py-10 md:grid-cols-5">
      <div className="md:col-span-2"><h3 className="text-2xl font-black">ElectroFixParts</h3><p className="mt-3 max-w-md text-blue-100">ร้านอะไหล่ซ่อมอิเล็กทรอนิกส์ แผงวงจร เครื่องมือช่าง ดอกลำโพง และอะไหล่เครื่องใช้ไฟฟ้า พร้อมทีมช่วยเช็กสเปกก่อนสั่งซื้อ</p></div>
      <div><h4 className="font-bold">หมวดสินค้า</h4><p className="mt-3 grid gap-2 text-blue-100">แผงวงจร<br/>อะไหล่เครื่องเสียง<br/>เครื่องมือซ่อม<br/>เครื่องมือวัด</p></div>
      <div><h4 className="font-bold">บริการลูกค้า</h4><p className="mt-3 grid gap-2 text-blue-100">วิธีสั่งซื้อ<br/>การจัดส่ง<br/>รับประกันสินค้า<br/>คืนสินค้า</p></div>
      <div><h4 className="font-bold">ติดต่อเรา</h4><p className="mt-3 text-blue-100">LINE: @electrofix<br/>โทร: 02-123-4567<br/>อีเมล: support@electrofix.co.th</p></div>
    </div>
    <div className="border-t border-white/10"><div className="container-page flex flex-col gap-2 py-4 text-sm text-blue-100 md:flex-row md:justify-between"><span>© 2026 ElectroFixParts. All rights reserved.</span><span>นโยบายความเป็นส่วนตัว • เงื่อนไขการใช้งาน • Sitemap</span></div></div>
  </footer>;
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, favorites } = useStore();
  const liked = favorites.includes(product.id);
  return <article className="group overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-soft transition hover:-translate-y-1">
    <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-blue-50"><img src={product.image} alt={product.name} className="h-full w-full object-cover transition group-hover:scale-105" />{product.badge && <span className="absolute left-3 top-3 rounded-full bg-brand-700 px-3 py-1 text-xs font-bold text-white">{product.badge}</span>}</Link>
    <div className="p-4"><div className="flex justify-between gap-3"><Link href={`/products/${product.slug}`} className="font-bold text-slate-900 line-clamp-2">{product.name}</Link><button aria-label="favorite" onClick={()=>toggleFavorite(product.id)} className={liked ? 'text-red-500' : 'text-slate-300'}><Heart fill={liked ? 'currentColor' : 'none'} size={21}/></button></div>
      <p className="mt-1 text-sm text-slate-500 line-clamp-2">{product.short}</p><p className="mt-2 text-sm text-amber-500">★★★★★ <span className="text-slate-400">({product.reviews})</span></p>
      <div className="mt-2 flex items-end gap-2"><b className="text-xl text-brand-700">{money(product.price)}</b>{product.oldPrice && <span className="text-sm text-slate-400 line-through">{money(product.oldPrice)}</span>}</div>
      <p className="mt-1 text-sm text-green-600">มีสินค้า {product.stock} ชิ้น พร้อมส่ง</p>
      <div className="mt-4 grid grid-cols-2 gap-2"><Link href={`/products/${product.slug}`} className="rounded-xl border border-brand-600 px-3 py-2 text-center text-sm font-bold text-brand-700">รายละเอียด</Link><button onClick={()=>addToCart(product.id)} className="rounded-xl bg-brand-700 px-3 py-2 text-sm font-bold text-white">ใส่ตะกร้า</button></div>
      <a href={`${lineUrl}?text=${encodeURIComponent('สนใจสินค้า ' + product.name)}`} target="_blank" className="mt-2 block rounded-xl bg-green-600 px-3 py-2 text-center text-sm font-bold text-white">ทัก LINE สั่งซื้อ</a>
    </div>
  </article>;
}

export function HomeClient() {
  const [query, setQuery] = useState(''); const [brand, setBrand] = useState(''); const [category, setCategory] = useState(''); const [maxPrice, setMaxPrice] = useState(''); const [sort, setSort] = useState('recommended');
  useEffect(() => { const params = new URLSearchParams(window.location.hash.split('?')[1] || ''); const q = params.get('q'); if (q) setQuery(q); }, []);
  const filtered = useMemo(() => {
    let list = products.filter(p => (!query || `${p.name} ${p.short} ${p.category}`.toLowerCase().includes(query.toLowerCase())) && (!brand || p.brand === brand) && (!category || p.category === category) && (!maxPrice || p.price <= Number(maxPrice)));
    if (sort === 'price-low') list = [...list].sort((a,b)=>a.price-b.price); if (sort === 'price-high') list = [...list].sort((a,b)=>b.price-a.price); if (sort === 'rating') list = [...list].sort((a,b)=>b.rating-a.rating); return list;
  }, [query, brand, category, maxPrice, sort]);
  return <><section className="bg-gradient-to-br from-blue-50 via-white to-blue-100"><div className="container-page grid items-center gap-8 py-12 md:grid-cols-2 md:py-16"><div><p className="font-bold text-brand-700">อะไหล่ซ่อมอิเล็กทรอนิกส์ ส่งไวทั่วไทย</p><h1 className="mt-3 text-4xl font-black leading-tight text-brand-900 md:text-6xl">แผงวงจร ดอกลำโพง เครื่องมือซ่อม ครบในที่เดียว</h1><p className="mt-4 text-lg text-slate-600">ค้นหาง่าย กรองตามยี่ห้อและงบประมาณ พร้อมแชทถามทีมงานก่อนสั่งซื้อผ่าน LINE</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><a href="#products" className="rounded-2xl bg-brand-700 px-6 py-3 text-center font-bold text-white">เลือกซื้อสินค้า</a><a href={lineUrl} target="_blank" className="rounded-2xl bg-green-600 px-6 py-3 text-center font-bold text-white">ทัก LINE สั่งซื้อ</a></div></div><div className="rounded-[2rem] bg-white p-4 shadow-soft"><div className="grid grid-cols-2 gap-3"><img alt="circuit" src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop" className="h-44 w-full rounded-3xl object-cover"/><img alt="tools" src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=1000&auto=format&fit=crop" className="h-44 w-full rounded-3xl object-cover"/><img alt="audio" src="https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop" className="col-span-2 h-44 w-full rounded-3xl object-cover"/></div></div></div></section>
    <section id="products" className="container-page -mt-6 rounded-3xl border border-blue-100 bg-white p-4 shadow-soft md:p-6"><div className="grid gap-3 md:grid-cols-6"><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="ค้นหาชื่อสินค้า/อาการเสีย" className="rounded-2xl border border-blue-100 px-4 py-3 md:col-span-2"/><select value={brand} onChange={(e)=>setBrand(e.target.value)} className="rounded-2xl border border-blue-100 px-4 py-3"><option value="">ทุกยี่ห้อ</option>{brands.map(b=><option key={b}>{b}</option>)}</select><select value={category} onChange={(e)=>setCategory(e.target.value)} className="rounded-2xl border border-blue-100 px-4 py-3"><option value="">ทุกหมวด</option>{categories.map(c=><option key={c}>{c}</option>)}</select><select value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} className="rounded-2xl border border-blue-100 px-4 py-3"><option value="">ทุกราคา</option><option value="100">ไม่เกิน 100</option><option value="300">ไม่เกิน 300</option><option value="600">ไม่เกิน 600</option></select><select value={sort} onChange={(e)=>setSort(e.target.value)} className="rounded-2xl border border-blue-100 px-4 py-3"><option value="recommended">แนะนำ</option><option value="price-low">ราคาต่ำไปสูง</option><option value="price-high">ราคาสูงไปต่ำ</option><option value="rating">คะแนนสูงสุด</option></select></div><div className="mt-4 flex flex-wrap gap-2">{['คาปาซิเตอร์','ดอกลำโพง','หัวแร้ง','มัลติมิเตอร์','Arduino','เครื่องซักผ้า'].map(t=><button key={t} onClick={()=>setQuery(t)} className="rounded-full border border-blue-200 px-3 py-1 text-sm text-brand-700">{t}</button>)}</div></section>
    <section className="container-page mt-10"><div className="flex items-end justify-between"><div><p className="font-bold text-brand-700">สินค้าแนะนำ</p><h2 className="text-3xl font-black text-slate-900">อะไหล่และเครื่องมือซ่อมยอดนิยม</h2></div><span className="text-sm text-slate-500">พบ {filtered.length} รายการ</span></div><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{filtered.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>
    <section id="brands" className="container-page mt-12"><h2 className="text-2xl font-black">เลือกตามยี่ห้อ</h2><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">{brands.map(b=><button key={b} onClick={()=>setBrand(b)} className="rounded-2xl border border-blue-100 bg-white p-4 font-bold text-brand-700 shadow-sm">{b}</button>)}</div></section>
    <section id="articles" className="container-page mt-12"><h2 className="text-2xl font-black">บทความ SEO และคู่มือซ่อม</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{['วิธีเลือกคาปาซิเตอร์สำหรับซ่อมบอร์ดจ่ายไฟ','ดอกลำโพง 4 นิ้ว 8 โอห์มเหมาะกับงานแบบไหน','มัลติมิเตอร์วัดอะไรได้บ้างสำหรับมือใหม่'].map((a,i)=><article key={a} className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm"><p className="text-sm font-bold text-brand-700">คู่มือช่าง #{i+1}</p><h3 className="mt-2 text-lg font-bold">{a}</h3><p className="mt-2 text-slate-600">บทความช่วยให้ลูกค้าค้นหาสินค้าได้ตรงอาการเสีย และช่วยให้เว็บติด SEO จากคีย์เวิร์ดเฉพาะทาง</p><a className="mt-4 inline-block font-bold text-brand-700" href="#">อ่านต่อ →</a></article>)}</div></section></>;
}

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const { addToCart, toggleFavorite, favorites, setChatOpen } = useStore(); const liked = favorites.includes(product.id);
  return <main className="container-page py-8"><nav className="text-sm text-slate-500">หน้าแรก / {product.category} / <span className="text-slate-900">{product.name}</span></nav><section className="mt-5 grid gap-8 lg:grid-cols-2"><div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-3 shadow-soft"><img src={product.image} alt={product.name} className="h-[360px] w-full rounded-[1.5rem] object-cover md:h-[520px]"/></div><div><span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-brand-700">{product.badge || product.category}</span><h1 className="mt-4 text-3xl font-black md:text-5xl">{product.name}</h1><p className="mt-3 text-lg text-slate-600">{product.short}</p><p className="mt-4 text-amber-500">★★★★★ <span className="text-slate-500">{product.rating} จาก {product.reviews} รีวิว</span></p><div className="mt-5 flex items-end gap-3"><b className="text-4xl text-brand-700">{money(product.price)}</b>{product.oldPrice && <span className="text-xl text-slate-400 line-through">{money(product.oldPrice)}</span>}</div><p className="mt-2 font-medium text-green-600">พร้อมส่ง {product.stock} ชิ้น • รับประกันสินค้า</p><div className="mt-6 grid gap-3 sm:grid-cols-2"><button onClick={()=>addToCart(product.id)} className="rounded-2xl bg-brand-700 px-5 py-4 font-bold text-white">เพิ่มลงตะกร้า</button><a href={`${lineUrl}?text=${encodeURIComponent('สนใจสินค้า ' + product.name)}`} target="_blank" className="rounded-2xl bg-green-600 px-5 py-4 text-center font-bold text-white">สั่งซื้อผ่าน LINE</a><button onClick={()=>toggleFavorite(product.id)} className="rounded-2xl border border-blue-100 px-5 py-4 font-bold text-brand-700">{liked ? 'บันทึกแล้ว' : 'บันทึกถูกใจ'}</button><button onClick={()=>setChatOpen(true)} className="rounded-2xl border border-blue-100 px-5 py-4 font-bold text-brand-700">แชทถามช่าง</button></div><div className="mt-6 rounded-3xl bg-blue-50 p-5"><h2 className="font-black">สเปกสินค้า</h2><ul className="mt-3 grid gap-2 text-slate-700">{product.specs.map(s=><li key={s}>✓ {s}</li>)}</ul></div></div></section><section className="mt-10 grid gap-5 md:grid-cols-2"><div className="rounded-3xl border border-blue-100 bg-white p-6"><h2 className="text-2xl font-black">รายละเอียดสินค้า</h2><p className="mt-3 text-slate-600">{product.description}</p></div><div className="rounded-3xl border border-blue-100 bg-white p-6"><h2 className="text-2xl font-black">ใช้งานร่วมกับ</h2><div className="mt-3 flex flex-wrap gap-2">{product.compatibleWith.map(c=><span key={c} className="rounded-full bg-blue-50 px-3 py-2 text-sm font-medium text-brand-700">{c}</span>)}</div></div></section><section className="mt-12"><h2 className="text-2xl font-black">สินค้าใกล้เคียงที่แนะนำ</h2><div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map(p=><ProductCard key={p.id} product={p}/>)}</div></section></main>;
}

export function LoginClient() { const { user, setUser } = useStore(); const [form, setForm] = useState(user || { name:'', phone:'', email:'' }); return <main className="container-page grid min-h-[60vh] place-items-center py-10"><form onSubmit={(e)=>{e.preventDefault(); setUser(form); window.location.href='/account';}} className="w-full max-w-lg rounded-[2rem] border border-blue-100 bg-white p-7 shadow-soft"><h1 className="text-3xl font-black">เข้าสู่ระบบสมาชิก</h1><p className="mt-2 text-slate-600">ระบบจำลองใช้ localStorage สำหรับ prototype</p>{(['name','phone','email'] as const).map(k=><input key={k} required value={(form as any)[k]} onChange={e=>setForm({...form,[k]:e.target.value})} placeholder={k==='name'?'ชื่อ':'phone'===k?'เบอร์โทร':'อีเมล'} className="mt-4 w-full rounded-2xl border border-blue-100 px-4 py-3"/>)}<button className="mt-5 w-full rounded-2xl bg-brand-700 px-5 py-3 font-bold text-white">เข้าสู่ระบบ</button></form></main>; }

export function CartClient() { const { cartItems, cartTotal, changeQty, removeFromCart } = useStore(); return <main className="container-page py-10"><h1 className="text-3xl font-black">ตะกร้าสินค้า</h1>{cartItems.length===0 ? <p className="mt-6 rounded-3xl bg-white p-8 text-slate-600">ยังไม่มีสินค้าในตะกร้า</p> : <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]"><div className="grid gap-3">{cartItems.map(({product,qty}: any)=><div key={product.id} className="flex gap-4 rounded-3xl border border-blue-100 bg-white p-4"><img src={product.image} alt={product.name} className="h-24 w-24 rounded-2xl object-cover"/><div className="flex-1"><Link href={`/products/${product.slug}`} className="font-bold">{product.name}</Link><p className="text-brand-700 font-black">{money(product.price)}</p><div className="mt-2 flex items-center gap-2"><button onClick={()=>changeQty(product.id,-1)} className="rounded-lg border p-1"><Minus size={16}/></button><b>{qty}</b><button onClick={()=>changeQty(product.id,1)} className="rounded-lg border p-1"><Plus size={16}/></button><button onClick={()=>removeFromCart(product.id)} className="ml-auto text-red-500"><Trash2 size={18}/></button></div></div></div>)}</div><aside className="h-fit rounded-3xl bg-white p-6 shadow-soft"><h2 className="text-xl font-black">สรุปคำสั่งซื้อ</h2><div className="mt-4 flex justify-between"><span>รวม</span><b>{money(cartTotal)}</b></div><a href={`${lineUrl}?text=${encodeURIComponent('ต้องการสั่งซื้อสินค้าในตะกร้า ยอดรวม ' + money(cartTotal))}`} target="_blank" className="mt-5 block rounded-2xl bg-green-600 px-5 py-3 text-center font-bold text-white">ส่งรายการไป LINE</a></aside></div>}</main>; }

export function FavoritesClient() { const { favorites } = useStore(); const favs = products.filter(p=>favorites.includes(p.id)); return <main className="container-page py-10"><h1 className="text-3xl font-black">สินค้าที่ถูกใจ</h1><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{favs.length ? favs.map(p=><ProductCard key={p.id} product={p}/>) : <p className="rounded-3xl bg-white p-8 text-slate-600">ยังไม่มีสินค้าที่บันทึกไว้</p>}</div></main>; }

export function AccountClient() { const { user } = useStore(); return <main className="container-page py-10"><div className="rounded-3xl bg-white p-7 shadow-soft"><h1 className="text-3xl font-black">บัญชีของฉัน</h1><p className="mt-3 text-slate-600">{user ? `สวัสดี ${user.name} (${user.phone})` : 'กรุณาเข้าสู่ระบบก่อนใช้งาน'}</p></div></main>; }

function ChatWidget() { const { chatOpen, setChatOpen, messages, sendChat } = useStore(); const [text,setText]=useState(''); if (!chatOpen) return <button onClick={()=>setChatOpen(true)} className="fixed bottom-5 right-5 z-50 rounded-full bg-green-600 p-4 text-white shadow-soft"><MessageCircle/></button>; return <div className="fixed bottom-5 right-5 z-50 w-[calc(100%-24px)] max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl"><div className="flex items-center justify-between bg-brand-700 p-4 text-white"><b>แชทสอบถามสินค้า</b><button onClick={()=>setChatOpen(false)}><X/></button></div><div className="h-80 space-y-3 overflow-y-auto bg-blue-50 p-4">{messages.map((m: ChatMessage,i: number)=><p key={i} className={`max-w-[85%] rounded-2xl px-4 py-2 ${m.from==='user'?'ml-auto bg-brand-700 text-white':'bg-white text-slate-700'}`}>{m.text}</p>)}</div><form onSubmit={(e)=>{e.preventDefault(); sendChat(text); setText('');}} className="flex gap-2 p-3"><input value={text} onChange={e=>setText(e.target.value)} placeholder="พิมพ์คำถาม เช่น ใช้กับรุ่นไหนได้บ้าง" className="w-full rounded-2xl border border-blue-100 px-3 py-2"/><button className="rounded-2xl bg-brand-700 px-4 text-white">ส่ง</button></form></div>; }
