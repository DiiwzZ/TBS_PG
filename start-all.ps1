# Bar Table Booking System - Start All Services (PowerShell)
# This script starts all backend services and frontend

Write-Host "============================================" -ForegroundColor Cyan
Write-Host " Bar Table Booking System - Start All" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
try {
    docker ps 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        throw "Docker not running"
    }
} catch {
    Write-Host "[ERROR] Docker is not running! Please start Docker Desktop first." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[1/7] Starting Infrastructure (MySQL, RabbitMQ, Redis)..." -ForegroundColor Yellow
docker-compose -f deploy/docker-compose.yaml up -d mysql rabbitmq redis
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Failed to start infrastructure!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[2/7] Waiting for infrastructure to be ready (15 seconds)..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

Write-Host ""
Write-Host "[3/7] Starting User Service (Port 8081)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; .\gradlew.bat :services:user-service:bootRun" -WindowStyle Normal
Start-Sleep -Seconds 5

Write-Host "[4/7] Starting Table Service (Port 8082)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; .\gradlew.bat :services:table-service:bootRun" -WindowStyle Normal
Start-Sleep -Seconds 5

Write-Host "[5/7] Starting Booking Service (Port 8083)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; .\gradlew.bat :services:booking-service:bootRun" -WindowStyle Normal
Start-Sleep -Seconds 5

Write-Host "[6/7] Starting Check-in Service (Port 8084)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; .\gradlew.bat :services:checkin-service:bootRun" -WindowStyle Normal
Start-Sleep -Seconds 5

Write-Host "[7/7] Starting Payment Service (Port 8085)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; .\gradlew.bat :services:payment-service:bootRun" -WindowStyle Normal
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "[8/9] Starting API Gateway (Port 8080)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; .\gradlew.bat :services:api-gateway:bootRun" -WindowStyle Normal
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "[9/9] Starting Frontend (Port 3001)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD/frontend'; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host " All services are starting!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host " Frontend:     http://localhost:3001" -ForegroundColor White
Write-Host " API Gateway:  http://localhost:8080" -ForegroundColor White
Write-Host " RabbitMQ UI:  http://localhost:15672 (guest/guest)" -ForegroundColor White
Write-Host " Grafana:      http://localhost:3000 (admin/admin)" -ForegroundColor White
Write-Host ""
Write-Host " Note: Services need 30-60 seconds to fully start" -ForegroundColor Gray
Write-Host " Check individual console windows for status" -ForegroundColor Gray
Write-Host "============================================" -ForegroundColor Green
Write-Host ""

Read-Host "Press Enter to exit"

