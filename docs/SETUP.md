# Setup & Installation Guide

## 📋 Prerequisites

ก่อนเริ่มต้น ตรวจสอบให้แน่ใจว่าคุณมีสิ่งเหล่านี้ติดตั้งแล้ว:

- ☑️ **JDK 21** (Java Development Kit)
- ☑️ **Node.js 18+** และ npm
- ☑️ **Docker Desktop** และ Docker Compose
- ☑️ **Git**
- ☑️ **IDE** (IntelliJ IDEA แนะนำ, หรือ VSCode)

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/DiiwzZ/TBS_PG.git
cd TBS_PG
```

### 2. Start Infrastructure

เริ่มต้น MySQL, RabbitMQ, Redis ด้วย Docker Compose:

```bash
docker-compose -f deploy/docker-compose.yaml up -d mysql rabbitmq redis
```

รอจนกว่า containers จะ ready (ประมาณ 30 วินาที):

```bash
# ตรวจสอบสถานะ
docker-compose -f deploy/docker-compose.yaml ps
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

### 4. Start Backend Services (ใน IDE)

เปิดโปรเจกต์ใน IntelliJ IDEA:
1. File → Open → เลือกโฟลเดอร์ project root
2. รอให้ Gradle sync เสร็จ
3. Run services ตามลำดับ (คลิกขวา → Run):
   - `UserServiceApplication.java`
   - `TableServiceApplication.java`
   - `BookingServiceApplication.java`
   - `CheckinServiceApplication.java`
   - `PaymentServiceApplication.java`
   - `ApiGatewayApplication.java` (รันสุดท้าย)

> **หมายเหตุ:** Flyway จะทำ database migration อัตโนมัติตอน startup

### 5. Start Frontend

เปิด terminal ใหม่:

```bash
cd frontend
npm run dev
```

Frontend จะรันที่: **http://localhost:3001**

---

## 🧪 Verify Installation

### Check Backend Services

```bash
# API Gateway
curl http://localhost:8080/actuator/health

# User Service
curl http://localhost:8081/actuator/health
```

### Check Frontend

เปิดเบราว์เซอร์: **http://localhost:3001**

### Access Admin Tools

- **RabbitMQ Management:** http://localhost:15672 (guest/guest)
- **Grafana:** http://localhost:3000 (admin/admin)
- **Prometheus:** http://localhost:9090

---

## 🔧 Configuration

### Backend Configuration

แต่ละ service มี `application.yml` ของตัวเอง:

```
services/
├── user-service/src/main/resources/application.yml
├── table-service/src/main/resources/application.yml
├── booking-service/src/main/resources/application.yml
└── ...
```

### Frontend Configuration

สร้างไฟล์ `.env.local` (ถ้ายังไม่มี):

```bash
cd frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:8080" > .env.local
```

---

## 🗄️ Database Setup

### Database per Service Strategy

โปรเจกต์ใช้ "Database per Service" pattern:

| Service | Database Name | Port |
|---------|--------------|------|
| User Service | `user_db` | 3307 |
| Table Service | `table_db` | 3307 |
| Booking Service | `booking_db` | 3307 |
| Check-in Service | `checkin_db` | 3307 |
| Payment Service | `payment_db` | 3307 |

### Reset Database (ถ้าจำเป็น)

```bash
# เข้า MySQL container
docker exec bar-booking-mysql mysql -uroot -proot

# ใน MySQL shell
DROP DATABASE IF EXISTS user_db;
CREATE DATABASE user_db;
-- ทำซ้ำสำหรับ database อื่นๆ

# หรือใช้คำสั่งเดียว
docker exec bar-booking-mysql mysql -uroot -proot -e "DROP DATABASE IF EXISTS user_db; CREATE DATABASE user_db;"
```

จากนั้น restart services เพื่อให้ Flyway run migration ใหม่

---

## 🐛 Troubleshooting

### Port Already in Use

ถ้า port 3307 (MySQL) ถูกใช้แล้ว:

```bash
# Windows
netstat -ano | findstr :3307

# Linux/Mac
lsof -i :3307
```

แก้ไข `deploy/docker-compose.yaml` เปลี่ยน port mapping:

```yaml
ports:
  - "3308:3306"  # เปลี่ยนจาก 3307
```

จากนั้นแก้ไข `application.yml` ทุกไฟล์ให้ตรงกัน

### Docker Containers Not Starting

```bash
# ตรวจสอบ logs
docker-compose -f deploy/docker-compose.yaml logs mysql

# Restart containers
docker-compose -f deploy/docker-compose.yaml restart
```

### Gradle Build Errors

```bash
# Clean และ build ใหม่
./gradlew clean build -x test

# Windows
gradlew.bat clean build -x test
```

### Frontend Not Starting

```bash
cd frontend

# ลบ node_modules และติดตั้งใหม่
rm -rf node_modules package-lock.json
npm install

# หรือ (Windows)
rmdir /s node_modules
del package-lock.json
npm install
```

---

## 🔄 Daily Development Workflow

### Starting Development Session

```bash
# 1. Start infrastructure
docker-compose -f deploy/docker-compose.yaml up -d mysql rabbitmq redis

# 2. Start backend services in IDE (Run each Application.java)

# 3. Start frontend
cd frontend && npm run dev
```

### Stopping Development Session

```bash
# Stop frontend (Ctrl+C in terminal)

# Stop backend services (Click stop in IDE)

# Stop infrastructure
docker-compose -f deploy/docker-compose.yaml down
```

### Keep Containers Running (Recommended)

```bash
# Infrastructure containers สามารถเปิดค้างไว้ได้
# ไม่ต้อง down ทุกครั้ง เพื่อประหยัดเวลา startup
```

---

## 💻 VS Code Development

### Using Scripts (Recommended)

เราได้สร้าง scripts ที่ใช้งานง่ายสำหรับ VS Code:

#### **Windows:**

```bash
# Start all services
start-all.bat

# Stop all services
stop-all.bat
```

#### **Linux/Mac:**

```bash
# Make scripts executable (first time only)
chmod +x start-all.sh stop-all.sh

# Start all services
./start-all.sh

# Stop all services
./stop-all.sh
```

### Using VS Code Tasks

กด **Ctrl+Shift+P** (หรือ **Cmd+Shift+P** บน Mac) แล้วพิมพ์ **"Tasks: Run Task"**

จะเห็น tasks ทั้งหมด:

- **🚀 Start All Services** - เริ่มทุกอย่างพร้อมกัน
- **🛑 Stop All Services** - หยุดทุกอย่าง
- **🐳 Start Infrastructure** - เริ่มแค่ Docker containers
- **🗄️ Stop Infrastructure** - หยุด Docker containers
- **👤 Start User Service** - เริ่ม User Service เดี่ยว
- **🪑 Start Table Service** - เริ่ม Table Service เดี่ยว
- **📅 Start Booking Service** - เริ่ม Booking Service เดี่ยว
- **📱 Start Check-in Service** - เริ่ม Check-in Service เดี่ยว
- **💳 Start Payment Service** - เริ่ม Payment Service เดี่ยว
- **🌐 Start API Gateway** - เริ่ม API Gateway เดี่ยว
- **💻 Start Frontend** - เริ่ม Frontend เดี่ยว

### Using npm Scripts

```bash
# Start infrastructure only
npm run start:infra

# Start individual services
npm run start:user
npm run start:table
npm run start:booking
npm run start:checkin
npm run start:payment
npm run start:gateway
npm run start:frontend

# Stop infrastructure
npm run stop:infra

# View logs
npm run logs:infra
npm run logs:mysql

# Check container status
npm run docker:ps

# Show all available commands
npm run help
```

### VS Code Extensions (Recommended)

ติดตั้ง extensions เหล่านี้:

1. **Extension Pack for Java** (Microsoft)
2. **Spring Boot Extension Pack** (VMware)
3. **Docker** (Microsoft)
4. **ES7+ React/Redux/React-Native snippets**
5. **Prettier - Code formatter**
6. **ESLint**

หลังจากติดตั้ง Spring Boot Extension Pack:
- เปิด **Spring Boot Dashboard** ใน sidebar
- คลิก **▶️** เพื่อ start/stop services ได้ง่ายๆ

---

## 📚 Next Steps

- [Architecture Documentation](./ARCHITECTURE.md)
- [API Documentation](./API.md)
- [Testing Guide](./TESTING.md) (coming soon)

