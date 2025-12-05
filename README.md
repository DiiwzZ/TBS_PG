# Bar Booking System

A comprehensive microservices-based table booking system for bars with time-slot based reservations.

![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.5-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)

## ✨ Features

### Customer Features
- 🔐 **Authentication** - Register, Login, Dashboard with role-based access
- 🗺️ **Zones & Tables** - Browse available zones and tables with real-time status
- 📅 **Time-Based Booking System** - Reserve tables based on entry time:
  - 🆓 **Free Slot** (20:00): Free entry (no service fee)
  - 🌆 **21:00 Slot**: ฿500 service fee
  - 🌃 **22:00 Slot**: ฿1,000 service fee (prime time)
  - **Normal Booking**: Select by zone (auto-assigned table)
  - **Premium Booking**: Select specific table
- ⏰ **Grace Period** - 15-minute check-in window after entry time
- 💳 **Payment** - Multiple payment methods (Credit/Debit Card, Mobile Banking, QR Code, Cash)
- 📱 **QR Check-in** - Generate QR code for easy check-in upon arrival
- 📜 **Booking History** - View active and past bookings with filters
- ⚠️ **No-Show Management** - Track no-shows with automatic detection and free slot ban after 3 no-shows

### Technical Features
- 🏗️ **Microservices Architecture** - 6 services (User, Table, Booking, Check-in, Payment, Gateway)
- 🐳 **Dockerized** - Full infrastructure setup with Docker Compose
- 🔄 **Real-time Updates** - Auto-refresh availability every 15-30 seconds
- 🎨 **Dark Theme** - Bar-themed UI with Material-UI
- 📱 **Mobile-First Responsive** - Optimized for all devices
- 🛡️ **Resilient Frontend** - Error boundaries, loading states, and graceful error handling

## 🛠️ Tech Stack

### Backend (Microservices)
- **Language:** Java 21
- **Framework:** Spring Boot 3.2.5
- **Database:** MySQL 8.0
- **Messaging:** RabbitMQ
- **Cache:** Redis
- **Migration:** Flyway
- **Scheduling:** Quartz Scheduler

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI Library:** Material-UI (MUI)
- **State Management:** Zustand
- **Validation:** Zod + React Hook Form
- **HTTP Client:** Axios

## 🚀 Quick Start

### Prerequisites
- Java 21
- Docker & Docker Compose
- Node.js 18+ (for frontend)
- MySQL Client (optional, for database management)

### 1. Clone Repository
```bash
git clone <repository-url>
cd bar-booking
```

### 2. Start Infrastructure & Backend
You can start all services using the provided scripts:

**Windows:**
```cmd
.\start-all.bat
```

**Linux/Mac:**
```bash
./start-all.sh
```

This will:
- Start Docker containers (MySQL, RabbitMQ, Redis)
- Build and start all backend services
- Start the frontend development server

**Note:** Services need 30-60 seconds to fully start. Check individual console windows for status.

### 3. Access the Application
- **Frontend:** http://localhost:3001
- **API Gateway:** http://localhost:8080
- **RabbitMQ UI:** http://localhost:15672 (guest/guest)
- **Grafana:** http://localhost:3000 (admin/admin)

### 4. Stop All Services
**Windows:**
```cmd
.\stop-all.bat
```

**Linux/Mac:**
```bash
./stop-all.sh
```

### 5. Clear Database Data (Optional)
To reset all data except admin user:
```cmd
.\clear-data.bat
```

This is useful for testing or starting fresh.

## 📂 Project Structure

```
bar-booking/
├── services/               # Backend Microservices
│   ├── api-gateway/
│   ├── user-service/
│   ├── table-service/
│   ├── booking-service/
│   ├── checkin-service/
│   └── payment-service/
├── frontend/               # Next.js Frontend Application
├── deploy/                 # Docker Compose configuration
├── docs/                   # Documentation
└── scripts/                # Startup/Shutdown scripts
```

## 💳 Payment Flow

The system supports multiple payment methods with automatic booking status updates:

1. **Initiate Payment** - User selects payment method and confirms booking
2. **Process Payment** - Payment service processes the payment (mock implementation)
3. **Webhook Notification** - Payment service sends webhook to booking service
4. **Status Update** - Booking status automatically changes from "รอชำระเงิน" (PENDING) to "ยืนยันแล้ว" (CONFIRMED)
5. **QR Code Generation** - Confirmed bookings receive a QR code for check-in

**Supported Payment Methods:**
- 💳 Credit/Debit Card
- 📱 Mobile Banking
- 📷 QR Code (PromptPay)
- 💵 Cash

## 📖 Documentation

- [Setup Guide](docs/SETUP.md) - Detailed installation instructions
- [User Guide](docs/USAGE.md) - Complete user manual and usage instructions
- [VS Code Setup](VSCODE-SETUP.md) - Guide for VS Code users


## 👥Team
-ศุภนัฐ อับภัย 1640702013 No.01
-วุฒิภัทร ประไพ 1650702333 No.02
-ศิวพล โศจิศิริกุล 1650703489 No.05
-โพธิพงศ์ จิระจรูญเกียรติ 1660704964 No.09
