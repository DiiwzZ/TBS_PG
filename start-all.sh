#!/bin/bash
# Bar Table Booking System - Start All Services (Linux/Mac)
# This script starts all backend services and frontend

set -e

echo "============================================"
echo " Bar Table Booking System - Start All"
echo "============================================"
echo ""

# Check if Docker is running
if ! docker ps &> /dev/null; then
    echo "[ERROR] Docker is not running! Please start Docker first."
    exit 1
fi

echo "[1/7] Starting Infrastructure (MySQL, RabbitMQ, Redis)..."
docker-compose -f deploy/docker-compose.yaml up -d mysql rabbitmq redis

echo ""
echo "[2/7] Waiting for infrastructure to be ready (15 seconds)..."
sleep 15

echo ""
echo "[3/7] Starting User Service (Port 8081)..."
./gradlew :services:user-service:bootRun > logs/user-service.log 2>&1 &
echo "User Service PID: $!"
sleep 5

echo "[4/7] Starting Table Service (Port 8082)..."
./gradlew :services:table-service:bootRun > logs/table-service.log 2>&1 &
echo "Table Service PID: $!"
sleep 5

echo "[5/7] Starting Booking Service (Port 8083)..."
./gradlew :services:booking-service:bootRun > logs/booking-service.log 2>&1 &
echo "Booking Service PID: $!"
sleep 5

echo "[6/7] Starting Check-in Service (Port 8084)..."
./gradlew :services:checkin-service:bootRun > logs/checkin-service.log 2>&1 &
echo "Check-in Service PID: $!"
sleep 5

echo "[7/7] Starting Payment Service (Port 8085)..."
./gradlew :services:payment-service:bootRun > logs/payment-service.log 2>&1 &
echo "Payment Service PID: $!"
sleep 5

echo ""
echo "[8/9] Starting API Gateway (Port 8080)..."
./gradlew :services:api-gateway:bootRun > logs/api-gateway.log 2>&1 &
echo "API Gateway PID: $!"
sleep 5

echo ""
echo "[9/9] Starting Frontend (Port 3001)..."
cd frontend && npm run dev > ../logs/frontend.log 2>&1 &
echo "Frontend PID: $!"
cd ..

echo ""
echo "============================================"
echo " All services are starting!"
echo "============================================"
echo ""
echo "  Frontend:     http://localhost:3001"
echo "  API Gateway:  http://localhost:8080"
echo "  RabbitMQ UI:  http://localhost:15672 (guest/guest)"
echo "  Grafana:      http://localhost:3000 (admin/admin)"
echo ""
echo "  Note: Services need 30-60 seconds to fully start"
echo "  Logs are in ./logs/ directory"
echo ""
echo "  To stop all services, run: ./stop-all.sh"
echo "============================================"
echo ""

