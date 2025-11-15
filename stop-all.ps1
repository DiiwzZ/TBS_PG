# Bar Table Booking System - Stop All Services (PowerShell)
# This script stops all backend services and infrastructure

Write-Host "============================================" -ForegroundColor Cyan
Write-Host " Bar Table Booking System - Stop All" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/2] Stopping Docker Infrastructure..." -ForegroundColor Yellow
docker-compose -f deploy/docker-compose.yaml down

Write-Host ""
Write-Host "[2/2] Stopping Gradle daemons..." -ForegroundColor Yellow
.\gradlew.bat --stop

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host " All services stopped!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host " Note: Console windows must be closed manually" -ForegroundColor Gray
Write-Host "============================================" -ForegroundColor Green
Write-Host ""

Read-Host "Press Enter to exit"

