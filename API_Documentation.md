# API Documentation - ระบบจัดการสต็อกสินค้า (Inventory Management System)

## ข้อมูลทั่วไป

- **Base URL**: `http://localhost:3000`
- **Content-Type**: `application/json`
- **Authentication**: ไม่มี (dev environment)

ทุก endpoint (ยกเว้น `/health`) จะมี prefix `/api` นำหน้า

---

## สารบัญ

1. [Health Check](#1-health-check)
2. [Users](#2-users)
3. [Categories](#3-categories)
4. [Products](#4-products)
5. [Stock Adjustment](#5-stock-adjustment)
6. [Error Codes](#6-error-codes)

---

## 1. Health Check

### ตรวจสอบสถานะเซิร์ฟเวอร์และการเชื่อมต่อฐานข้อมูล

| Method | URL |
|--------|-----|
| GET | `/health` |

**Headers**: ไม่ต้องระบุ

**Response (200 OK)**
```json
{
  "status": "ok",
  "db_test": 2
}
```

**Response (500 Internal Server Error)**
```json
{
  "status": "error",
  "message": "รายละเอียด error"
}
```

---

## 2. Users

### 2.1 สร้าง user ใหม่

| Method | URL |
|--------|-----|
| POST | `/api/users` |

**Headers**
```
Content-Type: application/json
```

**Request Body**
```json
{
  "name": "สมชาย ใจดี",
  "email": "somchai@example.com"
}
```

**Response (201 Created)**
```json
{
  "id": 1,
  "name": "สมชาย ใจดี",
  "email": "somchai@example.com"
}
```

**Response (400 Bad Request)**
```json
{
  "error": "name และ email จำเป็นต้องมี"
}
```

---

### 2.2 ดึงข้อมูล user ทั้งหมด

| Method | URL |
|--------|-----|
| GET | `/api/users` |

**Response (200 OK)**
```json
[
  {
    "id": 2,
    "name": "สมหญิง รักเรียน",
    "email": "somying@example.com",
    "created_at": "2026-09-10T10:00:00.000Z"
  },
  {
    "id": 1,
    "name": "สมชาย ใจดี",
    "email": "somchai@example.com",
    "created_at": "2026-09-09T08:30:00.000Z"
  }
]
```

---

### 2.3 ดึงข้อมูล user ตาม id

| Method | URL |
|--------|-----|
| GET | `/api/users/:id` |

**ตัวอย่าง**: `GET /api/users/1`

**Response (200 OK)**
```json
{
  "id": 1,
  "name": "สมชาย ใจดี",
  "email": "somchai@example.com",
  "created_at": "2026-09-09T08:30:00.000Z"
}
```

**Response (404 Not Found)**
```json
{
  "error": "ไม่พบ user"
}
```

---

### 2.4 แก้ไข user

| Method | URL |
|--------|-----|
| PUT | `/api/users/:id` |

**Request Body**
```json
{
  "name": "สมชาย ใจดี (แก้ไข)",
  "email": "somchai.new@example.com"
}
```

**Response (200 OK)**
```json
{
  "id": "1",
  "name": "สมชาย ใจดี (แก้ไข)",
  "email": "somchai.new@example.com"
}
```

---

### 2.5 ลบ user

| Method | URL |
|--------|-----|
| DELETE | `/api/users/:id` |

**Response (200 OK)**
```json
{
  "message": "ลบสำเร็จ"
}
```

**Response (404 Not Found)**
```json
{
  "error": "ไม่พบ user"
}
```

---

## 3. Categories

### 3.1 สร้างหมวดหมู่ใหม่

| Method | URL |
|--------|-----|
| POST | `/api/categories` |

**Request Body**
```json
{
  "name": "IT",
  "description": "อุปกรณ์คอมพิวเตอร์"
}
```

**Response (201 Created)**
```json
{
  "id": 1,
  "name": "IT",
  "description": "อุปกรณ์คอมพิวเตอร์"
}
```

**Response (400 Bad Request)**
```json
{
  "error": "name จำเป็นต้องมี"
}
```

---

### 3.2 ดึงหมวดหมู่ทั้งหมด

| Method | URL |
|--------|-----|
| GET | `/api/categories` |

**Response (200 OK)**
```json
[
  {
    "id": 1,
    "name": "IT",
    "description": "อุปกรณ์คอมพิวเตอร์",
    "created_at": "2026-09-09T08:00:00.000Z"
  }
]
```

---

### 3.3 ดึงหมวดหมู่ตาม id

| Method | URL |
|--------|-----|
| GET | `/api/categories/:id` |

**Response (200 OK)**
```json
{
  "id": 1,
  "name": "IT",
  "description": "อุปกรณ์คอมพิวเตอร์",
  "created_at": "2026-09-09T08:00:00.000Z"
}
```

**Response (404 Not Found)**
```json
{
  "error": "ไม่พบหมวดหมู่"
}
```

---

### 3.4 แก้ไขหมวดหมู่

| Method | URL |
|--------|-----|
| PUT | `/api/categories/:id` |

**Request Body**
```json
{
  "name": "IT & Electronics",
  "description": "อุปกรณ์คอมพิวเตอร์และอิเล็กทรอนิกส์"
}
```

**Response (200 OK)**
```json
{
  "id": "1",
  "name": "IT & Electronics",
  "description": "อุปกรณ์คอมพิวเตอร์และอิเล็กทรอนิกส์"
}
```

---

### 3.5 ลบหมวดหมู่

| Method | URL |
|--------|-----|
| DELETE | `/api/categories/:id` |

**Response (200 OK)**
```json
{
  "message": "ลบสำเร็จ"
}
```

> **หมายเหตุ**: หากมีสินค้า (products) ที่ผูกกับหมวดหมู่นี้อยู่ `category_id` ของสินค้านั้นจะถูกตั้งเป็น `NULL` แทนที่จะลบสินค้าทิ้ง (ตั้งค่าไว้เป็น `ON DELETE SET NULL`)

---

## 4. Products

### 4.1 สร้างสินค้าใหม่

| Method | URL |
|--------|-----|
| POST | `/api/products` |

**Request Body**
```json
{
  "sku": "IT-001",
  "name": "เมาส์ไร้สาย",
  "price": 290.00,
  "quantity": 50,
  "category_id": 1
}
```

| Field | Type | Required | หมายเหตุ |
|-------|------|----------|----------|
| sku | string | ✅ | ต้องไม่ซ้ำกับสินค้าอื่น |
| name | string | ✅ | |
| price | number | ❌ (default 0) | |
| quantity | integer | ❌ (default 0) | |
| category_id | integer | ❌ | ต้องมี category นี้อยู่จริงในระบบ |

**Response (201 Created)**
```json
{
  "id": 1,
  "sku": "IT-001",
  "name": "เมาส์ไร้สาย",
  "price": 290,
  "quantity": 50,
  "category_id": 1
}
```

**Response (400 Bad Request)**
```json
{
  "error": "sku และ name จำเป็นต้องมี"
}
```
```json
{
  "error": "ไม่พบ category_id นี้"
}
```

**Response (409 Conflict)** — SKU ซ้ำ
```json
{
  "error": "SKU นี้มีอยู่แล้ว"
}
```

---

### 4.2 ดึงสินค้าทั้งหมด

| Method | URL |
|--------|-----|
| GET | `/api/products` |

**Response (200 OK)**
```json
[
  {
    "id": 1,
    "sku": "IT-001",
    "name": "เมาส์ไร้สาย",
    "price": "290.00",
    "quantity": 45,
    "category_id": 1,
    "created_at": "2026-09-09T09:00:00.000Z",
    "category_name": "IT"
  }
]
```

> ผลลัพธ์จะรวมชื่อหมวดหมู่ (`category_name`) มาให้ด้วยเสมอ (join จากตาราง categories)

---

### 4.3 ดึงสินค้าใกล้หมด (Low Stock Alert)

| Method | URL |
|--------|-----|
| GET | `/api/products/low-stock` |

**Query Parameters**

| Parameter | Type | Default | คำอธิบาย |
|-----------|------|---------|----------|
| threshold | integer | 5 | แสดงสินค้าที่มีจำนวนน้อยกว่าค่านี้ |

**ตัวอย่าง**: `GET /api/products/low-stock?threshold=10`

**Response (200 OK)**
```json
[
  {
    "id": 3,
    "sku": "OFF-005",
    "name": "กระดาษ A4",
    "price": "120.00",
    "quantity": 2,
    "category_id": 2,
    "category_name": "Office Supply"
  }
]
```

> ⚠️ **สำคัญ**: endpoint นี้ต้องเรียกก่อน `/api/products/:id` เสมอในลำดับของ route เพื่อไม่ให้ `low-stock` ถูกตีความเป็นค่า `id`

---

### 4.4 ดึงสินค้าตาม id

| Method | URL |
|--------|-----|
| GET | `/api/products/:id` |

**Response (200 OK)**
```json
{
  "id": 1,
  "sku": "IT-001",
  "name": "เมาส์ไร้สาย",
  "price": "290.00",
  "quantity": 45,
  "category_id": 1,
  "category_name": "IT"
}
```

**Response (404 Not Found)**
```json
{
  "error": "ไม่พบสินค้า"
}
```

---

### 4.5 แก้ไขสินค้า

| Method | URL |
|--------|-----|
| PUT | `/api/products/:id` |

**Request Body**
```json
{
  "sku": "IT-001",
  "name": "เมาส์ไร้สาย (รุ่นใหม่)",
  "price": 350.00,
  "quantity": 45,
  "category_id": 1
}
```

**Response (200 OK)**
```json
{
  "id": "1",
  "sku": "IT-001",
  "name": "เมาส์ไร้สาย (รุ่นใหม่)",
  "price": 350,
  "quantity": 45,
  "category_id": 1
}
```

> ⚠️ ไม่แนะนำให้แก้ `quantity` ผ่าน endpoint นี้โดยตรง ควรใช้ `/api/stock/adjust` แทนเพื่อให้มีการบันทึกประวัติ (audit trail)

---

### 4.6 ลบสินค้า

| Method | URL |
|--------|-----|
| DELETE | `/api/products/:id` |

**Response (200 OK)**
```json
{
  "message": "ลบสำเร็จ"
}
```

> ⚠️ **คำเตือน**: การลบสินค้าจะลบประวัติ `stock_transactions` ที่เกี่ยวข้องทั้งหมดไปด้วย (ตั้งค่าไว้เป็น `ON DELETE CASCADE`)

---

## 5. Stock Adjustment

### 5.1 ปรับจำนวนสต็อกสินค้า

| Method | URL |
|--------|-----|
| PATCH | `/api/stock/adjust` |

ใช้สำหรับปรับจำนวนสินค้าเข้า/ออก (รับสินค้าใหม่, ขายออก, ปรับยอดจากการนับสต็อก ฯลฯ) โดยระบบจะอัปเดตจำนวนใน `products` และบันทึกประวัติลง `stock_transactions` พร้อมกันในธุรกรรมเดียว (atomic transaction)

**Request Body**
```json
{
  "product_id": 1,
  "adjust_quantity": 10,
  "note": "รับสินค้าใหม่จาก supplier"
}
```

| Field | Type | Required | หมายเหตุ |
|-------|------|----------|----------|
| product_id | integer | ✅ | id ของสินค้าที่ต้องการปรับ |
| adjust_quantity | integer | ✅ | ค่าบวก = รับเข้า (IN), ค่าลบ = จ่ายออก (OUT), ห้ามเป็น 0 |
| note | string | ❌ | หมายเหตุประกอบ |

**ตัวอย่าง: รับสินค้าเข้า**
```json
{ "product_id": 1, "adjust_quantity": 10, "note": "รับสินค้าใหม่" }
```

**ตัวอย่าง: จ่ายสินค้าออก**
```json
{ "product_id": 1, "adjust_quantity": -5, "note": "ขายออกหน้าร้าน" }
```

**Response (200 OK)**
```json
{
  "product_id": 1,
  "previous_quantity": 45,
  "adjusted_by": 10,
  "new_quantity": 55,
  "type": "IN"
}
```

**Response (400 Bad Request)** — ข้อมูลไม่ครบ/ไม่ถูกรูปแบบ
```json
{
  "error": "product_id และ adjust_quantity จำเป็นต้องมี"
}
```
```json
{
  "error": "adjust_quantity ต้องเป็นจำนวนเต็มและไม่เป็น 0 (เช่น +10 หรือ -5)"
}
```

**Response (400 Bad Request)** — สต็อกไม่พอ
```json
{
  "error": "จำนวนคงเหลือไม่พอ (คงเหลือ 3, ขอปรับ -5)"
}
```

**Response (404 Not Found)**
```json
{
  "error": "ไม่พบสินค้า"
}
```

> **Logic การทำงาน**:
> 1. ล็อกแถวสินค้าไว้ระหว่างทำธุรกรรม (`FOR UPDATE`) เพื่อป้องกัน race condition กรณีมีหลาย request เข้ามาพร้อมกัน
> 2. คำนวณจำนวนใหม่ = จำนวนปัจจุบัน + adjust_quantity
> 3. หากจำนวนใหม่ติดลบ → ยกเลิกการทำรายการ (rollback) ทันที
> 4. หากผ่าน → อัปเดต `products.quantity` และ insert แถวใหม่ใน `stock_transactions` พร้อมกัน
> 5. หากขั้นตอนใดล้มเหลว ระบบจะ rollback ทั้งหมด ไม่มีข้อมูลค้างครึ่ง ๆ กลาง ๆ

---

## 6. Error Codes

| HTTP Status | ความหมาย | กรณีที่พบ |
|-------------|----------|-----------|
| 200 | OK | คำขอสำเร็จ (GET, PUT, DELETE, PATCH) |
| 201 | Created | สร้างข้อมูลใหม่สำเร็จ (POST) |
| 400 | Bad Request | ข้อมูลที่ส่งมาไม่ครบหรือไม่ถูกต้อง เช่น ขาด field ที่จำเป็น, สต็อกไม่พอ |
| 404 | Not Found | ไม่พบข้อมูลตาม id ที่ระบุ |
| 409 | Conflict | ข้อมูลซ้ำกับที่มีอยู่แล้ว เช่น SKU ซ้ำ |
| 500 | Internal Server Error | ข้อผิดพลาดฝั่งเซิร์ฟเวอร์/ฐานข้อมูล |

---

## ตัวอย่างการทดสอบด้วย curl

```bash
# สร้างหมวดหมู่
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"IT\",\"description\":\"อุปกรณ์คอมพิวเตอร์\"}"

# สร้างสินค้า
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d "{\"sku\":\"IT-001\",\"name\":\"เมาส์ไร้สาย\",\"price\":290,\"quantity\":50,\"category_id\":1}"

# ปรับสต็อก (รับเข้า)
curl -X PATCH http://localhost:3000/api/stock/adjust \
  -H "Content-Type: application/json" \
  -d "{\"product_id\":1,\"adjust_quantity\":10,\"note\":\"รับสินค้าใหม่\"}"

# ดูสินค้าใกล้หมด
curl http://localhost:3000/api/products/low-stock?threshold=10
```

---

*เอกสารนี้อัปเดตล่าสุด: กันยายน 2026*
