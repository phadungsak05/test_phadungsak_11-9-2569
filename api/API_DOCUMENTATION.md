# API Documentation

**Base URL:** `http://localhost:3000` (หรือตามที่ระบุใน `.env`)  
**Headers ทั่วไปที่จำเป็น (สำหรับ Request ที่มี Body):**  
`Content-Type: application/json`

---

## 1. Health Check

### 1.1 ตรวจสอบสถานะเซิร์ฟเวอร์
- **URL:** `/health`
- **Method:** `GET`
- **Headers:** None
- **Request Body:** None
- **Response (Success - 200 OK):**
  ```json
  {
    "status": "ok",
    "db_test": 2
  }
  ```
- **Response (Error - 500 Internal Server Error):**
  ```json
  {
    "status": "error",
    "message": "Error message details"
  }
  ```

---

## 2. Users (ผู้ใช้งาน)

### 2.1 เพิ่มผู้ใช้งาน (Create User)
- **URL:** `/api/users`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Request Body (JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```
- **Response (Success - 201 Created):**
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```
- **Response (Error - 400 Bad Request):**
  ```json
  {
    "error": "name และ email จำเป็นต้องมี"
  }
  ```

### 2.2 ดึงข้อมูลผู้ใช้งานทั้งหมด (Get All Users)
- **URL:** `/api/users`
- **Method:** `GET`
- **Headers:** None
- **Request Body:** None
- **Response (Success - 200 OK):**
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
  ]
  ```

### 2.3 ดึงข้อมูลผู้ใช้งานรายบุคคล (Get User by ID)
- **URL:** `/api/users/:id`
- **Method:** `GET`
- **Headers:** None
- **Request Body:** None
- **Response (Success - 200 OK):**
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```
- **Response (Error - 404 Not Found):**
  ```json
  {
    "error": "ไม่พบ user"
  }
  ```

### 2.4 แก้ไขข้อมูลผู้ใช้งาน (Update User)
- **URL:** `/api/users/:id`
- **Method:** `PUT`
- **Headers:** `Content-Type: application/json`
- **Request Body (JSON):**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  }
  ```
- **Response (Success - 200 OK):**
  ```json
  {
    "id": "1",
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  }
  ```
- **Response (Error - 404 Not Found):**
  ```json
  {
    "error": "ไม่พบ user"
  }
  ```

### 2.5 ลบข้อมูลผู้ใช้งาน (Delete User)
- **URL:** `/api/users/:id`
- **Method:** `DELETE`
- **Headers:** None
- **Request Body:** None
- **Response (Success - 200 OK):**
  ```json
  {
    "message": "ลบสำเร็จ"
  }
  ```
- **Response (Error - 404 Not Found):**
  ```json
  {
    "error": "ไม่พบ user"
  }
  ```

---

## 3. Categories (หมวดหมู่สินค้า)

### 3.1 เพิ่มหมวดหมู่ (Create Category)
- **URL:** `/api/categories`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Request Body (JSON):**
  ```json
  {
    "name": "Electronics",
    "description": "อุปกรณ์อิเล็กทรอนิกส์"
  }
  ```
  *(หมายเหตุ: `description` เป็น optional สามารถไม่ส่งได้)*
- **Response (Success - 201 Created):**
  ```json
  {
    "id": 1,
    "name": "Electronics",
    "description": "อุปกรณ์อิเล็กทรอนิกส์"
  }
  ```
- **Response (Error - 400 Bad Request):**
  ```json
  {
    "error": "name จำเป็นต้องมี"
  }
  ```

### 3.2 ดึงข้อมูลหมวดหมู่ทั้งหมด (Get All Categories)
- **URL:** `/api/categories`
- **Method:** `GET`
- **Headers:** None
- **Request Body:** None
- **Response (Success - 200 OK):**
  ```json
  [
    {
      "id": 1,
      "name": "Electronics",
      "description": "อุปกรณ์อิเล็กทรอนิกส์"
    }
  ]
  ```

### 3.3 ดึงข้อมูลหมวดหมู่ตาม ID (Get Category by ID)
- **URL:** `/api/categories/:id`
- **Method:** `GET`
- **Headers:** None
- **Request Body:** None
- **Response (Success - 200 OK):**
  ```json
  {
    "id": 1,
    "name": "Electronics",
    "description": "อุปกรณ์อิเล็กทรอนิกส์"
  }
  ```
- **Response (Error - 404 Not Found):**
  ```json
  {
    "error": "ไม่พบหมวดหมู่"
  }
  ```

### 3.4 แก้ไขหมวดหมู่ (Update Category)
- **URL:** `/api/categories/:id`
- **Method:** `PUT`
- **Headers:** `Content-Type: application/json`
- **Request Body (JSON):**
  ```json
  {
    "name": "Home Appliances",
    "description": "เครื่องใช้ไฟฟ้าในบ้าน"
  }
  ```
- **Response (Success - 200 OK):**
  ```json
  {
    "id": "1",
    "name": "Home Appliances",
    "description": "เครื่องใช้ไฟฟ้าในบ้าน"
  }
  ```
- **Response (Error - 400 Bad Request):**
  ```json
  {
    "error": "name จำเป็นต้องมี"
  }
  ```
- **Response (Error - 404 Not Found):**
  ```json
  {
    "error": "ไม่พบหมวดหมู่"
  }
  ```

### 3.5 ลบหมวดหมู่ (Delete Category)
- **URL:** `/api/categories/:id`
- **Method:** `DELETE`
- **Headers:** None
- **Request Body:** None
- **Response (Success - 200 OK):**
  ```json
  {
    "message": "ลบสำเร็จ"
  }
  ```
- **Response (Error - 404 Not Found):**
  ```json
  {
    "error": "ไม่พบหมวดหมู่"
  }
  ```

---

## 4. Products (สินค้า)

### 4.1 ดึงข้อมูลสินค้าคงเหลือน้อย (Get Low Stock Products)
- **URL:** `/api/products/low-stock` *(สามารถส่ง query parameter `?threshold=5` ได้ ค่าเริ่มต้นคือ 5)*
- **Method:** `GET`
- **Headers:** None
- **Request Body:** None
- **Response (Success - 200 OK):**
  ```json
  [
    {
      "id": 1,
      "sku": "SKU001",
      "name": "iPhone 15",
      "price": 32900,
      "quantity": 2,
      "category_id": 1,
      "category_name": "Electronics"
    }
  ]
  ```

### 4.2 เพิ่มสินค้า (Create Product)
- **URL:** `/api/products`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Request Body (JSON):**
  ```json
  {
    "sku": "SKU001",
    "name": "iPhone 15",
    "price": 32900,
    "quantity": 10,
    "category_id": 1
  }
  ```
  *(หมายเหตุ: `price`, `quantity`, `category_id` เป็น optional)*
- **Response (Success - 201 Created):**
  ```json
  {
    "id": 1,
    "sku": "SKU001",
    "name": "iPhone 15",
    "price": 32900,
    "quantity": 10,
    "category_id": 1
  }
  ```
- **Response (Error - 400 Bad Request - Missing required fields):**
  ```json
  {
    "error": "sku และ name จำเป็นต้องมี"
  }
  ```
- **Response (Error - 400 Bad Request - Invalid Category):**
  ```json
  {
    "error": "ไม่พบ category_id นี้"
  }
  ```
- **Response (Error - 409 Conflict - Duplicate SKU):**
  ```json
  {
    "error": "SKU นี้มีอยู่แล้ว"
  }
  ```

### 4.3 ดึงข้อมูลสินค้าทั้งหมด (Get All Products)
- **URL:** `/api/products`
- **Method:** `GET`
- **Headers:** None
- **Request Body:** None
- **Response (Success - 200 OK):**
  ```json
  [
    {
      "id": 1,
      "sku": "SKU001",
      "name": "iPhone 15",
      "price": 32900,
      "quantity": 10,
      "category_id": 1,
      "category_name": "Electronics"
    }
  ]
  ```

### 4.4 ดึงข้อมูลสินค้าตาม ID (Get Product by ID)
- **URL:** `/api/products/:id`
- **Method:** `GET`
- **Headers:** None
- **Request Body:** None
- **Response (Success - 200 OK):**
  ```json
  {
    "id": 1,
    "sku": "SKU001",
    "name": "iPhone 15",
    "price": 32900,
    "quantity": 10,
    "category_id": 1,
    "category_name": "Electronics"
  }
  ```
- **Response (Error - 404 Not Found):**
  ```json
  {
    "error": "ไม่พบสินค้า"
  }
  ```

### 4.5 แก้ไขสินค้า (Update Product)
- **URL:** `/api/products/:id`
- **Method:** `PUT`
- **Headers:** `Content-Type: application/json`
- **Request Body (JSON):**
  ```json
  {
    "sku": "SKU001",
    "name": "iPhone 15 Pro",
    "price": 41900,
    "quantity": 15,
    "category_id": 1
  }
  ```
- **Response (Success - 200 OK):**
  ```json
  {
    "id": "1",
    "sku": "SKU001",
    "name": "iPhone 15 Pro",
    "price": 41900,
    "quantity": 15,
    "category_id": 1
  }
  ```
- **Response (Error - 404 Not Found):**
  ```json
  {
    "error": "ไม่พบสินค้า"
  }
  ```

### 4.6 ลบสินค้า (Delete Product)
- **URL:** `/api/products/:id`
- **Method:** `DELETE`
- **Headers:** None
- **Request Body:** None
- **Response (Success - 200 OK):**
  ```json
  {
    "message": "ลบสำเร็จ"
  }
  ```
- **Response (Error - 404 Not Found):**
  ```json
  {
    "error": "ไม่พบสินค้า"
  }
  ```

---

## 5. Stock Transactions (การจัดการสต็อก)

### 5.1 ปรับปรุงจำนวนสต็อกสินค้า (Adjust Stock)
- **URL:** `/api/stock/adjust`
- **Method:** `PATCH`
- **Headers:** `Content-Type: application/json`
- **Request Body (JSON):**
  ```json
  {
    "product_id": 1,
    "adjust_quantity": 10,
    "note": "รับสินค้าเข้าสต็อกรอบเดือนตุลาคม"
  }
  ```
  *(หมายเหตุ: `adjust_quantity` ใช้จำนวนบวกเพื่อเพิ่ม และจำนวนลบเพื่อลด, `note` เป็น optional)*
- **Response (Success - 200 OK):**
  ```json
  {
    "product_id": 1,
    "previous_quantity": 5,
    "adjusted_by": 10,
    "new_quantity": 15,
    "type": "IN"
  }
  ```
- **Response (Error - 400 Bad Request - Missing required fields):**
  ```json
  {
    "error": "product_id และ adjust_quantity จำเป็นต้องมี"
  }
  ```
- **Response (Error - 400 Bad Request - Invalid quantity):**
  ```json
  {
    "error": "adjust_quantity ต้องเป็นจำนวนเต็มและไม่เป็น 0 (เช่น +10 หรือ -5)"
  }
  ```
- **Response (Error - 400 Bad Request - Insufficient Stock):**
  ```json
  {
    "error": "จำนวนคงเหลือไม่พอ (คงเหลือ 5, ขอปรับ -10)"
  }
  ```
- **Response (Error - 404 Not Found):**
  ```json
  {
    "error": "ไม่พบสินค้า"
  }
  ```
