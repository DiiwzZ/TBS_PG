# Setup Guide

## 📋 Prerequisites

- **Java Development Kit (JDK) 21**
- **Docker Desktop** (for MySQL, RabbitMQ, Redis)
- **Node.js 18+** (for Frontend)
- **Git**

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/bar-booking.git
cd bar-booking
```

### 2. Start Infrastructure (Docker)
Start the database and message broker containers:
```bash
cd deploy
docker-compose up -d
```

### 3. Configure Frontend Environment
Create a `.env.local` file in the `frontend` directory:
```env
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_APP_NAME="Bar Table Booking System"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

### 4. Build and Run Backend Services
You can run services individually or use the provided scripts.

**Option A: Using Scripts (Recommended)**
- **Windows:** `.\start-all.bat`
- **Linux/Mac:** `./start-all.sh`

**Option B: Manual Start**
Navigate to each service directory and run:
```bash
./gradlew bootRun
```
Order of startup:
1. Infrastructure (MySQL, RabbitMQ, Redis) - via Docker
2. `user-service` (Port 8081)
3. `table-service` (Port 8082)
4. `booking-service` (Port 8083)
5. `checkin-service` (Port 8084)
6. `payment-service` (Port 8085)
7. `api-gateway` (Port 8080)
8. Frontend (Port 3001)

### 5. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Access at: `http://localhost:3001`

## 💻 VS Code Development

See [VSCODE-SETUP.md](../VSCODE-SETUP.md) for detailed VS Code configuration, including tasks and launch configurations.

## 🗄️ Database Management

### Clear All Data (Keep Admin Only)
To reset the database while keeping the admin user:
```cmd
.\clear-data.bat
```

This script will:
- Delete all bookings
- Delete all payments
- Delete all users (except admin)
- Clear outbox events
- Useful for testing or starting fresh

### Database Ports
- **MySQL:** `localhost:3307`
- **Databases:**
  - `user_db` - User service data
  - `table_db` - Table and zone data
  - `booking_db` - Booking data
  - `checkin_db` - Check-in data
  - `payment_db` - Payment data

## 🔍 Troubleshooting

### Frontend
- **Dependency Error (`@mui/lab`):** Run `npm install @mui/lab` in `frontend/` directory.
- **Hydration Error:** Ensure you use the provided `useAuthStore` hook which handles client-side hydration safely.
- **Payment Error 500:** Ensure all services are running and payment service can reach booking service on port 8083.

### Backend
- **Port Conflicts:** Ensure ports 8080-8085, 3001 (Frontend), and 3307 (MySQL) are free.
- **Database Connection:** Check if Docker containers are running (`docker ps`).
- **Payment Webhook Not Working:** Verify `booking-service.url` in `payment-service/src/main/resources/application.yml` points to `http://localhost:8083`.
- **Services Not Starting:** Check Java version (must be JDK 21) and ensure Docker Desktop is running.

## 📚 API Documentation
Once services are running, you can access Swagger UI (if enabled) or use Postman collection provided in `docs/`.
