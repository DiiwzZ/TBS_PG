# 🍺 Bar Table Booking System

ระบบจองโต๊ะสำหรับร้านบาร์/ร้านอาหาร พัฒนาด้วย Java Spring Boot (Microservices) และ Next.js

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Features

- 🔐 **JWT Authentication** - ระบบ login/register พร้อม role-based access control
- 🪑 **Table Management** - จัดการโต๊ะและโซนต่างๆ
- 📅 **Time-based Booking** - จองตามรอบเวลา (ฟรี/มีค่าธรรมเนียม)
- 💳 **Payment Integration** - ระบบจำลองการชำระเงิน
- 📱 **QR Check-in** - ระบบ check-in ด้วย QR code
- 🚫 **No-Show Policy** - ติดตาม no-show และระบบแบนอัตโนมัติ
- 📊 **Monitoring** - Prometheus + Grafana สำหรับติดตามระบบ

---

## 🚀 Quick Start

### Prerequisites
- Java 21
- Node.js 18+
- Docker & Docker Compose

### Installation

```bash
# 1. Clone repository
git clone https://github.com/DiiwzZ/TBS_PG.git
cd TBS_PG

# 2. Start infrastructure
docker-compose -f deploy/docker-compose.yaml up -d mysql rabbitmq redis

# 3. Install frontend dependencies
cd frontend && npm install && cd ..

# 4. Run backend services (ใน IDE)
#    - UserServiceApplication
#    - ApiGatewayApplication
#    (และ services อื่นๆ ตามต้องการ)

# 5. Start frontend
cd frontend && npm run dev
```

เปิดเบราว์เซอร์: **http://localhost:3001** 🎉

---

## 🏗️ Architecture

```
┌─────────────┐
│   Next.js   │  ← Frontend (Port 3001)
│  (TypeScript)│
└──────┬──────┘
       │ HTTP/REST
       ↓
┌─────────────────────────────────────┐
│       API Gateway (Port 8080)       │  ← JWT Authentication, Routing
└─────────────────────────────────────┘
       │
       ├─→ User Service (8081)
       ├─→ Table Service (8082)
       ├─→ Booking Service (8083)
       ├─→ Check-in Service (8084)
       └─→ Payment Service (8085)
              │
              ├─→ MySQL (3307)
              ├─→ RabbitMQ (5672)
              └─→ Redis (6379)
```

**Pattern:** Microservices + Hexagonal Architecture + Event-Driven

---

## 🛠️ Tech Stack

### Backend
- **Java 21** + **Spring Boot 3.x** + **Gradle**
- **MySQL 8** + **Flyway** (migration)
- **RabbitMQ** (messaging) + **Redis** (cache)
- **JWT** (authentication) + **Quartz** (scheduler)

### Frontend
- **Next.js 14+** (App Router) + **TypeScript**
- **Material-UI** + **Zustand** + **Axios**
- **React Hook Form** + **Zod** (validation)

### DevOps
- **Docker Compose** + **Prometheus** + **Grafana**

---

## 📚 Documentation

- 📖 [Setup & Installation Guide](./docs/SETUP.md)
- 🏛️ [Architecture & Tech Stack](./docs/ARCHITECTURE.md)
- 🔌 [API Documentation](./docs/API.md)

---

## 🧪 Testing

```bash
# Register user
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "fullName": "testuser",
    "phoneNumber": "0812345678"
  }'

# Login
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

หรือทดสอบผ่าน Frontend: http://localhost:3001/register

---

## 📊 Service Endpoints

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3001 | Next.js Web UI |
| API Gateway | http://localhost:8080 | Main API Entry |
| RabbitMQ UI | http://localhost:15672 | Message Queue (guest/guest) |
| Grafana | http://localhost:3000 | Monitoring (admin/admin) |
| Prometheus | http://localhost:9090 | Metrics |

---

## 🤝 Contributing

This is a university project. Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👥 Team

**Friyen University Project**  
Year 4 - Software Engineering

---

## 🔗 Links

- 📦 [GitHub Repository](https://github.com/DiiwzZ/TBS_PG)
- 📖 [Full Documentation](./docs/)
- 🐛 [Report Issues](https://github.com/DiiwzZ/TBS_PG/issues)

---

<p align="center">Made with ❤️ by Friyen Team</p>
