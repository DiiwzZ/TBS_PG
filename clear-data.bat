@echo off
echo ============================================
echo Clear Database Data (Keep Admin Only)
echo ============================================
echo.
echo This will delete ALL data except admin user.
echo Press Ctrl+C to cancel, or
pause

echo.
echo Connecting to MySQL and clearing data...
echo.

mysql -h localhost -P 3307 -u root -proot < clear-data.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================
    echo SUCCESS: Data cleared successfully!
    echo Only admin user remains.
    echo ============================================
) else (
    echo.
    echo ============================================
    echo ERROR: Failed to clear data
    echo Please check MySQL connection
    echo ============================================
)

echo.
pause

