export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  badge?: string;
  image: string;
  short: string;
  specs: string[];
  description: string;
  compatibleWith: string[];
};

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export const lineUrl = 'https://line.me/R/ti/p/@electrofix';

export const products: Product[] = [
  {
    id: 'p001', slug: 'arduino-uno-r3-compatible-board', name: 'บอร์ด Arduino UNO R3 Compatible', brand: 'Arduino', category: 'แผงวงจร', price: 189, oldPrice: 250, rating: 4.8, reviews: 124, stock: 42, badge: 'ขายดี',
    image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?q=80&w=1200&auto=format&fit=crop',
    short: 'บอร์ดไมโครคอนโทรลเลอร์สำหรับงานซ่อม ทดลองวงจร และโปรเจกต์ DIY',
    specs: ['ATmega328P', 'USB Type-B', 'Digital I/O 14 ขา', 'Analog input 6 ช่อง'],
    description: 'เหมาะสำหรับช่างซ่อม นักเรียน และงานต้นแบบอิเล็กทรอนิกส์ ใช้ทดสอบเซนเซอร์ รีเลย์ มอเตอร์ และวงจรควบคุมต่าง ๆ',
    compatibleWith: ['เซนเซอร์ 5V', 'รีเลย์โมดูล', 'จอ LCD 1602', 'มอเตอร์ไดรเวอร์']
  },
  {
    id: 'p002', slug: 'raspberry-pi-pico-rp2040', name: 'Raspberry Pi Pico RP2040', brand: 'Raspberry Pi', category: 'แผงวงจร', price: 155, oldPrice: 190, rating: 4.9, reviews: 88, stock: 65, badge: 'ใหม่',
    image: 'https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?q=80&w=1200&auto=format&fit=crop',
    short: 'บอร์ดขนาดเล็กสำหรับควบคุมอุปกรณ์ไฟฟ้าและงาน IoT',
    specs: ['Dual-core Arm Cortex-M0+', 'GPIO 26 ขา', 'MicroPython/C++', 'แรงดัน 3.3V'],
    description: 'เหมาะกับงานควบคุมวงจรขนาดเล็ก อ่านสัญญาณเซนเซอร์ และทำเครื่องมือช่วยซ่อมอุปกรณ์ไฟฟ้า',
    compatibleWith: ['Breadboard', 'เซนเซอร์ I2C', 'จอ OLED', 'โมดูล WiFi ภายนอก']
  },
  {
    id: 'p003', slug: 'speaker-driver-4-inch-8ohm-20w', name: 'ดอกลำโพง 4 นิ้ว 8Ω 20W', brand: 'SoundFix', category: 'อะไหล่เครื่องเสียง', price: 229, oldPrice: 320, rating: 4.7, reviews: 96, stock: 30, badge: 'ลดราคา',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop',
    short: 'ดอกลำโพงอะไหล่สำหรับซ่อมตู้ลำโพง วิทยุ และเครื่องเสียงบ้าน',
    specs: ['ขนาด 4 นิ้ว', 'Impedance 8Ω', 'กำลังขับ 20W', 'แม่เหล็กเฟอร์ไรต์'],
    description: 'ให้เสียงชัด เหมาะสำหรับเปลี่ยนแทนดอกลำโพงเดิมในตู้ลำโพงขนาดเล็ก เครื่องเสียงบ้าน และลำโพงบลูทูธ DIY',
    compatibleWith: ['ตู้ลำโพงเล็ก', 'เครื่องเสียงบ้าน', 'แอมป์ 20W', 'ลำโพง DIY']
  },
  {
    id: 'p004', slug: 'capacitor-kit-105c-low-esr', name: 'ชุดคาปาซิเตอร์ 105°C Low ESR', brand: 'CapPro', category: 'อะไหล่อิเล็กทรอนิกส์', price: 139, oldPrice: 180, rating: 4.6, reviews: 52, stock: 120, badge: 'คุ้มค่า',
    image: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48f?q=80&w=1200&auto=format&fit=crop',
    short: 'รวมค่าคาปาซิเตอร์ยอดนิยมสำหรับซ่อมภาคจ่ายไฟและบอร์ดเครื่องใช้ไฟฟ้า',
    specs: ['อุณหภูมิ 105°C', 'Low ESR', 'รวมหลายค่า', 'เหมาะกับภาคจ่ายไฟ'],
    description: 'ชุดอะไหล่พื้นฐานสำหรับช่างซ่อมทีวี จอคอม แหล่งจ่ายไฟ และเครื่องใช้ไฟฟ้าที่มีอาการเปิดไม่ติดหรือไฟตก',
    compatibleWith: ['Power supply', 'ทีวี LED', 'จอคอม', 'เครื่องใช้ไฟฟ้า']
  },
  {
    id: 'p005', slug: 'soldering-iron-60w-temperature-control', name: 'หัวแร้งปรับอุณหภูมิ 60W', brand: 'FixTool', category: 'เครื่องมือซ่อม', price: 349, oldPrice: 450, rating: 4.8, reviews: 210, stock: 24, badge: 'ขายดี',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1200&auto=format&fit=crop',
    short: 'หัวแร้งสำหรับซ่อมบอร์ด บัดกรีสายไฟ และงานอะไหล่อิเล็กทรอนิกส์',
    specs: ['กำลังไฟ 60W', 'ปรับอุณหภูมิได้', 'ปลายหัวแร้งเปลี่ยนได้', 'ด้ามจับกันร้อน'],
    description: 'เหมาะสำหรับงานซ่อมทั่วไป งานบัดกรีแผงวงจร เปลี่ยนคาปาซิเตอร์ ต่อสายไฟ และงาน DIY',
    compatibleWith: ['ตะกั่วบัดกรี', 'ฟลักซ์', 'แผงวงจร', 'งานซ่อมเครื่องใช้ไฟฟ้า']
  },
  {
    id: 'p006', slug: 'digital-multimeter-auto-range', name: 'มัลติมิเตอร์ดิจิทัล Auto Range', brand: 'MeterMax', category: 'เครื่องมือวัด', price: 590, oldPrice: 790, rating: 4.9, reviews: 174, stock: 18, badge: 'แนะนำ',
    image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=1200&auto=format&fit=crop',
    short: 'เครื่องมือวัดไฟฟ้าสำหรับเช็กวงจร วัดโวลต์ โอห์ม และไดโอด',
    specs: ['Auto Range', 'วัด AC/DC', 'Continuity buzzer', 'วัดไดโอด'],
    description: 'ใช้ตรวจเช็กอาการเสียของเครื่องใช้ไฟฟ้า ตรวจสายขาด เช็กแรงดัน และตรวจอะไหล่ก่อนเปลี่ยน',
    compatibleWith: ['งานซ่อมบอร์ด', 'เครื่องใช้ไฟฟ้า', 'ระบบ DC', 'ระบบ AC']
  },
  {
    id: 'p007', slug: 'relay-module-5v-2-channel', name: 'รีเลย์โมดูล 5V 2 ช่อง', brand: 'RelayTech', category: 'โมดูลควบคุม', price: 75, oldPrice: 99, rating: 4.6, reviews: 77, stock: 80, badge: 'พร้อมส่ง',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    short: 'โมดูลรีเลย์สำหรับควบคุมโหลดไฟฟ้าด้วยบอร์ดไมโครคอนโทรลเลอร์',
    specs: ['5V', '2 Channel', 'Optocoupler', 'รองรับโหลด AC/DC'],
    description: 'ใช้เปิดปิดอุปกรณ์ไฟฟ้าด้วยสัญญาณดิจิทัล เหมาะกับงานควบคุมพัดลม ปั๊มน้ำ ไฟ และเครื่องใช้ไฟฟ้า',
    compatibleWith: ['Arduino', 'ESP32', 'Raspberry Pi Pico', 'โหลด AC/DC']
  },
  {
    id: 'p008', slug: 'washing-machine-door-switch', name: 'สวิตช์ประตูเครื่องซักผ้า', brand: 'HomeParts', category: 'อะไหล่เครื่องใช้ไฟฟ้า', price: 180, oldPrice: 240, rating: 4.5, reviews: 41, stock: 22, badge: 'อะไหล่ซ่อม',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=1200&auto=format&fit=crop',
    short: 'อะไหล่สวิตช์ประตูสำหรับซ่อมเครื่องซักผ้าอาการไม่ทำงานหรือไม่ปั่น',
    specs: ['ขั้วต่อมาตรฐาน', 'วัสดุทนความร้อน', 'ติดตั้งง่าย', 'สำหรับช่างซ่อม'],
    description: 'เหมาะสำหรับตรวจเปลี่ยนเมื่อเครื่องซักผ้าไม่เริ่มทำงาน ไม่ปั่น หรือระบบแจ้งว่าฝาไม่ปิด',
    compatibleWith: ['เครื่องซักผ้าฝาหน้า', 'เครื่องซักผ้าฝาบนบางรุ่น', 'งานซ่อมเครื่องใช้ไฟฟ้า']
  }
];

export const categories = Array.from(new Set(products.map((p) => p.category)));
export const brands = Array.from(new Set(products.map((p) => p.brand)));
export function getProduct(slug: string) { return products.find((p) => p.slug === slug); }
export function money(value: number) { return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(value); }
