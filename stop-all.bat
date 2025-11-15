@echo off
REM Bar Table Booking System - Stop All Services (Windows)
REM This script stops all backend services, frontend, and infrastructure

echo ============================================
echo  Bar Table Booking System - Stop All
echo ============================================
echo.

echo [1/3] Stopping Java processes (Backend Services)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8080') do taskkill /F /PID %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8081') do taskkill /F /PID %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8082') do taskkill /F /PID %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8083') do taskkill /F /PID %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8084') do taskkill /F /PID %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8085') do taskkill /F /PID %%a 2>nul
echo Backend services stopped.

echo.
echo [2/3] Stopping Node.js processes (Frontend)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3001') do taskkill /F /PID %%a 2>nul
echo Frontend stopped.

echo.
echo [3/3] Stopping Infrastructure (MySQL, RabbitMQ, Redis)...
docker-compose -f deploy/docker-compose.yaml down
echo Infrastructure stopped.

echo.
echo ============================================
echo  All services stopped successfully!
echo ============================================
echo.

pause

