-- Clear Data Script (Keep Admin Only)
-- Run this in MySQL to clear all data except admin user

-- Get admin user ID first
SET @admin_id = (SELECT id FROM user_db.users WHERE username = 'admin');

-- Use booking database
USE booking_db;

-- 1. Clear bookings (except admin's bookings if any)
DELETE FROM bookings WHERE user_id != @admin_id;

-- 2. Clear outbox_events if exists
DELETE FROM outbox_events WHERE TRUE;

-- Use payment database
USE payment_db;

-- 3. Clear all payments
DELETE FROM payments WHERE TRUE;

-- Use user database
USE user_db;

-- 4. Clear non-admin users
DELETE FROM users WHERE username != 'admin' AND username != 'Admin';

-- Verify admin user exists (should show 1 row)
SELECT 'Admin user(s):' AS info;
SELECT id, username, email, full_name, role FROM users WHERE username IN ('admin', 'Admin');

-- Summary counts
SELECT 'Data cleared successfully!' AS status;
SELECT 'Remaining data:' AS info;
SELECT COUNT(*) AS remaining_users FROM user_db.users;
SELECT COUNT(*) AS remaining_bookings FROM booking_db.bookings;
SELECT COUNT(*) AS remaining_payments FROM payment_db.payments;

