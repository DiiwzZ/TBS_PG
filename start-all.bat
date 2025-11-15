@echo off
REM Bar Table Booking System - Start All Services (Windows)
REM This script starts all backend services and frontend

echo ============================================
echo  Bar Table Booking System - Start All
echo ============================================
echo.

REM Check if Docker is running
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not running! Please start Docker Desktop first.
    pause
    exit /b 1
)

echo [1/7] Starting Infrastructure (MySQL, RabbitMQ, Redis)...
docker-compose -f deploy/docker-compose.yaml up -d mysql rabbitmq redis
if %errorlevel% neq 0 (
    echo [ERROR] Failed to start infrastructure!
    pause
    exit /b 1
)

echo.
echo [2/7] Waiting for infrastructure to be ready (15 seconds)...
timeout /t 15 /nobreak >nul

echo.
echo [3/7] Starting User Service (Port 8081)...
start "User Service" cmd /k "gradlew.bat :services:user-service:bootRun"
timeout /t 5 /nobreak >nul

echo [4/7] Starting Table Service (Port 8082)...
start "Table Service" cmd /k "gradlew.bat :services:table-service:bootRun"
timeout /t 5 /nobreak >nul

echo [5/7] Starting Booking Service (Port 8083)...
start "Booking Service" cmd /k "gradlew.bat :services:booking-service:bootRun"
timeout /t 5 /nobreak >nul

echo [6/7] Starting Check-in Service (Port 8084)...
start "Check-in Service" cmd /k "gradlew.bat :services:checkin-service:bootRun"
timeout /t 5 /nobreak >nul

echo [7/7] Starting Payment Service (Port 8085)...
start "Payment Service" cmd /k "gradlew.bat :services:payment-service:bootRun"
timeout /t 5 /nobreak >nul

echo.
echo [8/9] Starting API Gateway (Port 8080)...
start "API Gateway" cmd /k "gradlew.bat :services:api-gateway:bootRun"
timeout /t 5 /nobreak >nul

echo.
echo [9/9] Starting Frontend (Port 3001)...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ============================================
echo  All services are starting!
echo ============================================
echo.
echo  Frontend:     http://localhost:3001
echo  API Gateway:  http://localhost:8080
echo  RabbitMQ UI:  http://localhost:15672 (guest/guest)
echo  Grafana:      http://localhost:3000 (admin/admin)
echo.
echo  Note: Services need 30-60 seconds to fully start
echo  Check individual console windows for status
echo ============================================
echo.

pause

