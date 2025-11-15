-- Update user table constraints to match validation rules
-- V3__update_user_constraints.sql

-- Modify username column: max 14 characters
ALTER TABLE users MODIFY COLUMN username VARCHAR(14) NOT NULL UNIQUE;

-- Modify phone_number column: exactly 10 characters
ALTER TABLE users MODIFY COLUMN phone_number VARCHAR(10) NOT NULL;

-- Modify full_name column: max 14 characters
ALTER TABLE users MODIFY COLUMN full_name VARCHAR(14) NOT NULL;

-- Note: CHECK constraints are not needed as validation is handled by:
-- 1. Frontend (Zod validation with real-time input filtering)
-- 2. Backend (Jakarta Validation annotations with @Pattern)
-- 3. JPA Entity (@Column constraints)

