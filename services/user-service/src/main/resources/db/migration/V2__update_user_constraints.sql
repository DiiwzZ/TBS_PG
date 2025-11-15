-- Update user table constraints to match validation rules
-- V2__update_user_constraints.sql

-- Modify username column: max 14 characters
ALTER TABLE users MODIFY COLUMN username VARCHAR(14) NOT NULL;

-- Modify phone_number column: exactly 10 characters
ALTER TABLE users MODIFY COLUMN phone_number VARCHAR(10) NOT NULL;

-- Modify full_name column: max 14 characters
ALTER TABLE users MODIFY COLUMN full_name VARCHAR(14) NOT NULL;

-- Add check constraints for data validation (MySQL 8.0.16+)
-- Check username only contains alphanumeric and underscore
ALTER TABLE users ADD CONSTRAINT chk_username_format 
    CHECK (username REGEXP '^[a-zA-Z0-9_]+$');

-- Check phone_number is exactly 10 digits
ALTER TABLE users ADD CONSTRAINT chk_phone_format 
    CHECK (phone_number REGEXP '^[0-9]{10}$');

