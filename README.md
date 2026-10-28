# ElectroFixParts Prototype

เว็บต้นแบบร้านขายอะไหล่อิเล็กทรอนิกส์และอุปกรณ์ซ่อมเครื่องใช้ไฟฟ้า

## ฟังก์ชันที่มี

- ล็อกอินจำลองด้วย localStorage
- ค้นหาสินค้า
- เลือกยี่ห้อสินค้า
- กรองหมวดหมู่และราคา
- ดูรายละเอียดสินค้า
- เพิ่มลงตะกร้า
- ปรับจำนวนสินค้าในตะกร้า
- ถูกใจสินค้าเพื่อบันทึก
- แชทสอบถามแบบจำลอง
- ปุ่มสั่งซื้อผ่าน LINE
- Header/Footer ติดทุกหน้า
- SEO metadata, canonical, Open Graph, Product JSON-LD, sitemap.xml, robots.txt

## วิธีรัน

```bash
npm install
npm run dev
```

เปิด http://localhost:3000

## ตั้งค่า LINE

แก้ตัวแปร `lineUrl` ใน `lib/products.ts`
