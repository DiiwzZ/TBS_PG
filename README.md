```markdown
#  Bar Table Booking System (ระบบจองโต๊ะร้านเหล้า)

โปรเจกต์นี้คือระบบจัดการการจองโต๊ะสำหรับร้านอาหาร/บาร์ พัฒนาด้วย Java Spring Boot ภายใต้สถาปัตยกรรมแบบ Service-Oriented (SOA) เพื่อใช้เป็นโปรเจกต์สำหรับมหาวิทยาลัย

## 🌟 ฟีเจอร์หลัก (Core Features)

* **User Login:** ระบบยืนยันตัวตนพื้นฐาน (Username/Password)
* **Time/Fee Blocks:** การจองตามรอบเวลาที่กำหนดค่าบริการต่างกัน (20:00 ฟรี, 21:00 500 บาท, 22:00 1000 บาท)
* **Booking Types:**
    * **Normal:** จองได้เฉพาะโซน
    * **Premium:** จองโดยเลือกโต๊ะได้
* **Payment (Mock):** จำลองการชำระเงินเพื่อยืนยันการจอง
* **QR Check-in:** พนักงานสแกน QR Code ของลูกค้าเพื่อยืนยันการรับโต๊ะ
* **No-Show Policy:**
    * **Grace Period:** สายได้ 15 นาทีหลังจากเวลารอบจอง
    * **Limit:** หากจองฟรี (รอบ 20:00) และ No-Show ครบ 3 ครั้ง จะถูกแบนไม่ให้จองรอบฟรีได้อีก

## 🏛️ สถาปัตยกรรมและ Tech Stack

ระบบนี้ใช้สถาปัตยกรรมแบบ Service-Oriented โดยมี Service หลักดังนี้:
* `api-gateway`: จัดการการ Routing, Authentication (JWT), และ Rate-Limiting
* `user-service`: จัดการข้อมูลผู้ใช้, การ Login, และสถิติ No-Show
* `table-service`: จัดการข้อมูลโต๊ะและโซน (Inventory)
* `booking-service`: จัดการ Logic การจอง, State Machine, และ No-Show Timer
* `checkin-service`: จัดการ Logic การสแกน QR Code
* `payment-service`: Service จำลองการจ่ายเงิน

**Tech Stack:**

**Backend:**
* **Core:** Java 21, Spring Boot 3.x, Gradle
* **Security:** Spring Security (JWT)
* **Data:** MySQL 8, Flyway (DB Migration)
* **Async & Scheduling:**
    * **Quartz Scheduler** + **Outbox Pattern** (สำหรับ No-Show Timer)
    * **RabbitMQ** (สำหรับ Event-Driven เช่น แจ้งเตือนเมื่อ No-Show)
* **Cache:** **Redis** (สำหรับ Rate-Limit และ QR Token)
* **Dev/Deploy:** **Docker Compose**
* **Testing:** JUnit 5, Testcontainers

**Frontend:**
* **Framework:** Next.js 14+ (App Router, TypeScript)
* **UI Library:** Material-UI (MUI)
* **State Management:** Zustand
* **HTTP Client:** Axios
* **Form Handling:** React Hook Form + Zod validation

## 🚀 ขั้นตอนการติดตั้งและรัน (Getting Started)

นี่คือขั้นตอนการรันโปรเจกต์ในเครื่องของคุณ (Development)

### 1. สิ่งที่ต้องมี (Prerequisites)

* JDK 21 (Java Development Kit)
* Node.js 18+ และ npm (สำหรับ Frontend)
* Docker และ Docker Compose
* IDE (เช่น IntelliJ IDEA หรือ VSCode)
* Git

### 2. ขั้นตอนการติดตั้ง (Setup)

1.  **Clone โปรเจกต์:**
    ```bash
    git clone [URL_PROJECT_ของคุณ]
    cd bar-table-booking
    ```

2.  **ตั้งค่า Environment:**
    (โปรเจกต์นี้อ่านค่า Config จาก `application.yml` ของแต่ละ Service โดยตรง ซึ่งจะเชื่อมต่อไปยัง Docker)

3.  **ติดตั้ง Frontend Dependencies:**
    ```bash
    cd frontend
    npm install
    cd ..
    ```

### 3. ขั้นตอนการรัน (How to Run)

#### วิธีที่ 1: รัน Infrastructure + รันแอปใน IDE (แนะนำสำหรับ Dev)

วิธีนี้จะทำให้คุณสามารถ Debug โค้ดใน IDE ได้ง่าย

1.  **รัน Infrastructure (DB, RabbitMQ, Redis):**
    เปิด Terminal และสั่งรันเฉพาะ Service ที่เป็น Infrastructure
    ```bash
    docker-compose -f deploy/docker-compose.yaml up -d mysql rabbitmq redis
    ```
    (รอจนกว่าทุกอย่างจะรันเสร็จสมบูรณ์)

2.  **รันแอปพลิเคชัน (Services):**
    เปิดโปรเจกต์ (โฟลเดอร์ `bar-table-booking`) ด้วย IntelliJ IDEA หรือ VSCode

    * IDE ของคุณ (IntelliJ) ควรมองเห็น Gradle Monorepo นี้โดยอัตโนมัติ
    * ค้นหาไฟล์ Application หลักของแต่ละ Service (เช่น `BookingServiceApplication.java`)
    * คลิกขวาและ "Run" หรือ "Debug" ทีละ Service ตามลำดับความสำคัญ:
        1.  `user-service`
        2.  `table-service`
        3.  `booking-service`
        4.  `checkin-service`
        5.  `payment-service`
        6.  `api-gateway`

    * **การ Migration (Flyway):** `user-service` และ `booking-service` ถูกตั้งค่าให้รัน Flyway ตอน khởi động (Startup) มันจะสร้างตารางใน `mysql` (ที่รันใน Docker) ให้โดยอัตโนมัติ

3.  **รัน Frontend (Next.js):**
    เปิด Terminal ใหม่และรันคำสั่ง:
    ```bash
    cd frontend
    npm run dev
    ```
    * Frontend จะรันที่ `http://localhost:3001` (เปลี่ยนจาก 3000 เพื่อไม่ทับกับ Grafana)
    * Frontend จะเชื่อมต่อไปยัง API Gateway ที่ `http://localhost:8080`

#### วิธีที่ 2: รันทุกอย่างด้วย Docker Compose (Production-like)

วิธีนี้จะรันทุกอย่าง (รวมถึง Service ที่ Build แล้ว) ภายใน Docker ทั้งหมด

1.  **Build Service (ยังไม่รองรับใน `docker-compose.yaml` นี้):**
    (คุณต้องเขียน `Dockerfile` สำหรับแต่ละ Service และเพิ่มเข้าไปใน `docker-compose.yaml` เพื่อใช้ท่านี้)

2.  **รันเฉพาะ Infrastructure (สำหรับตอนนี้):**
    ```bash
    docker-compose -f deploy/docker-compose.yaml up -d
    ```

### 4. ตรวจสอบระบบ (Endpoints)

* **Frontend (Next.js):** `http://localhost:3001` ⭐
* **API Gateway:** `http://localhost:8080`
* **Grafana:** `http://localhost:3000` (user: `admin`, pass: `admin`)
* **RabbitMQ Management:** `http://localhost:15672` (user: `guest`, pass: `guest`)
* **Prometheus:** `http://localhost:9090`

**Service Ports:**
* user-service: `http://localhost:8081`
* table-service: `http://localhost:8082`
* booking-service: `http://localhost:8083`
* checkin-service: `http://localhost:8084`
* payment-service: `http://localhost:8085`

## 🎨 Frontend Features

ระบบ Frontend มีฟีเจอร์ต่อไปนี้:

### Authentication & User Management
* **หน้า Landing Page:** แสดงข้อมูลระบบและปุ่ม CTA
* **หน้า Register:** ลงทะเบียนผู้ใช้ใหม่ (ได้รับ JWT token ทันที)
* **หน้า Login:** เข้าสู่ระบบด้วย Email และ Password
* **หน้า Dashboard:** แสดงข้อมูลผู้ใช้และเมนูต่างๆ (Protected Route)
* **Navbar:** แสดงสถานะการ Login และปุ่ม Logout

### Technical Features
* **JWT Authentication:** ส่ง Bearer token ใน Authorization header
* **Protected Routes:** ใช้ Next.js middleware + client-side protection
* **State Management:** Zustand สำหรับจัดการ auth state
* **Form Validation:** React Hook Form + Zod schema validation
* **Error Handling:** แสดง error messages จาก backend API
* **Loading States:** แสดง loading spinner ระหว่างรอ response
* **Auto Logout:** ถ้า token หมดอายุ (401) จะ logout อัตโนมัติ
* **LocalStorage Persistence:** เก็บ auth state ไว้ใน localStorage

## 🧪 การทดสอบระบบ (Testing)

### ทดสอบ Authentication Flow

1. **เปิด Frontend:** `http://localhost:3001` ⭐
2. **Register User ใหม่:** 
   - คลิก "Register" หรือ "Get Started"
   - กรอกข้อมูล: username, email, phone number, password, confirm password
   - คลิก "Register"
   - ระบบจะ redirect ไป Dashboard อัตโนมัติ
3. **Logout:**
   - คลิก "Logout" ใน Navbar
   - ระบบจะ clear token และ redirect ไป home page
4. **Login:**
   - คลิก "Login"
   - กรอก email และ password
   - คลิก "Login"
   - ระบบจะ redirect ไป Dashboard

### ทดสอบ Protected Routes

1. **ลองเข้า Dashboard โดยไม่ Login:**
   - เข้า `http://localhost:3001/dashboard`
   - ระบบจะ redirect ไป `/login` อัตโนมัติ
2. **Login แล้วเข้า Dashboard:**
   - Login เข้าระบบ
   - เข้า `http://localhost:3001/dashboard`
   - ควรเห็นหน้า Dashboard พร้อมข้อมูลผู้ใช้

### ทดสอบ API โดยตรง (ด้วย curl หรือ Postman)

```bash
# Register (fullName จะถูกตั้งค่าเป็น username โดยอัตโนมัติ)
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123","fullName":"testuser","phoneNumber":"0123456789"}'

# Login
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get Current User (ต้องมี token)
curl -X GET http://localhost:8080/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```