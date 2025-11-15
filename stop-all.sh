#!/bin/bash
# Bar Table Booking System - Stop All Services (Linux/Mac)
# This script stops all backend services, frontend, and infrastructure

echo "============================================"
echo " Bar Table Booking System - Stop All"
echo "============================================"
echo ""

echo "[1/3] Stopping Java processes (Backend Services)..."
pkill -f "user-service:bootRun" 2>/dev/null || true
pkill -f "table-service:bootRun" 2>/dev/null || true
pkill -f "booking-service:bootRun" 2>/dev/null || true
pkill -f "checkin-service:bootRun" 2>/dev/null || true
pkill -f "payment-service:bootRun" 2>/dev/null || true
pkill -f "api-gateway:bootRun" 2>/dev/null || true
echo "Backend services stopped."

echo ""
echo "[2/3] Stopping Node.js processes (Frontend)..."
lsof -ti:3001 | xargs kill -9 2>/dev/null || true
echo "Frontend stopped."

echo ""
echo "[3/3] Stopping Infrastructure (MySQL, RabbitMQ, Redis)..."
docker-compose -f deploy/docker-compose.yaml down
echo "Infrastructure stopped."

echo ""
echo "============================================"
echo " All services stopped successfully!"
echo "============================================"
echo ""

