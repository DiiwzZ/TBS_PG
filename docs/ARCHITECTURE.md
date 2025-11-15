# Architecture & Tech Stack

## 🏛️ System Architecture

ระบบนี้ใช้สถาปัตยกรรมแบบ **Microservices (Service-Oriented Architecture)** โดยแบ่งเป็น service ต่างๆ ดังนี้:

### Core Services

| Service | Port | Description |
|---------|------|-------------|
| `api-gateway` | 8080 | API Gateway, JWT Authentication, Rate Limiting, CORS |
| `user-service` | 8081 | User Management, Authentication, No-Show Tracking |
| `table-service` | 8082 | Table & Zone Management (Inventory) |
| `booking-service` | 8083 | Booking Logic, State Machine, No-Show Timer |
| `checkin-service` | 8084 | QR Code Check-in Logic |
| `payment-service` | 8085 | Payment Processing (Mock) |

### Infrastructure Services

| Service | Port | Description |
|---------|------|-------------|
| MySQL | 3307 | Relational Database (Database per Service) |
| RabbitMQ | 5672, 15672 | Message Broker for Event-Driven Architecture |
| Redis | 6379 | Cache for Rate Limiting & QR Tokens |
| Prometheus | 9090 | Metrics Collection |
| Grafana | 3000 | Monitoring Dashboard |

---

## 💻 Tech Stack

### Backend

- **Language:** Java 21
- **Framework:** Spring Boot 3.2.5
- **Build Tool:** Gradle (Kotlin DSL) - Monorepo
- **Security:** Spring Security with JWT
- **Database:** MySQL 8.0
- **DB Migration:** Flyway
- **Messaging:** RabbitMQ
- **Cache:** Redis
- **Scheduler:** Quartz Scheduler
- **Monitoring:** Micrometer + Prometheus + Grafana
- **Testing:** JUnit 5, Testcontainers

### Frontend

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **UI Library:** Material-UI (MUI)
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Styling:** Emotion (via MUI)

### DevOps & Tools

- **Containerization:** Docker & Docker Compose
- **Version Control:** Git & GitHub
- **IDE:** IntelliJ IDEA (recommended), VSCode

---

## 🎯 Design Patterns

### Hexagonal Architecture (Ports & Adapters)

แต่ละ service ใช้ Hexagonal Architecture เพื่อแยก business logic ออกจาก infrastructure concerns:

```
service/
├── application/          # Use Cases & Business Logic
├── domain/
│   ├── model/           # Domain Entities
│   └── port/            # Repository Interfaces (Ports)
└── infrastructure/
    ├── adapter/
    │   ├── persistence/ # JPA Implementation (Adapters)
    │   └── web/         # REST Controllers (Adapters)
    └── config/          # Spring Configuration
```

### Event-Driven Architecture

- **Outbox Pattern:** สำหรับ reliable event publishing
- **RabbitMQ:** สำหรับ asynchronous communication ระหว่าง services

### Database per Service

แต่ละ service มี database เป็นของตัวเอง:
- `user_db`
- `table_db`
- `booking_db`
- `checkin_db`
- `payment_db`

---

## 🔒 Security

### Authentication Flow

1. User login ผ่าน `/api/users/login`
2. Backend validate credentials และสร้าง JWT token
3. Frontend เก็บ token ใน localStorage
4. Request ต่อไปจะส่ง token ใน `Authorization: Bearer` header
5. API Gateway validate JWT token ก่อน route ไปยัง services

### Validation Layers

1. **Frontend:** Zod schema + Real-time input filtering
2. **API Gateway:** JWT validation
3. **Backend Services:** Jakarta Validation annotations
4. **Database:** Column constraints

---

## 📊 Data Flow Example: Booking Flow

```
1. Frontend (Next.js)
   ↓ HTTP POST /api/bookings
2. API Gateway
   ↓ Validate JWT → Route
3. Booking Service
   ↓ Check availability
4. Table Service
   ↓ Reserve table
5. Booking Service
   ↓ Create booking → Publish event
6. RabbitMQ
   ↓ Event: BookingCreated
7. Payment Service
   ↓ Process payment
8. Check-in Service
   ↓ Generate QR code
9. Response ← Frontend
```

---

## 🚀 Scalability Considerations

- **Horizontal Scaling:** แต่ละ service สามารถ scale แยกกันได้
- **Caching:** Redis สำหรับลด database load
- **Async Processing:** RabbitMQ สำหรับ non-blocking operations
- **Database Optimization:** Indexes สำหรับ queries ที่ใช้บ่อย

---

## 📝 Future Enhancements

- [ ] Service Discovery (Eureka/Consul)
- [ ] Circuit Breaker (Resilience4j)
- [ ] Distributed Tracing (Zipkin/Jaeger)
- [ ] API Documentation (Swagger/OpenAPI)
- [ ] Kubernetes Deployment
- [ ] CI/CD Pipeline

