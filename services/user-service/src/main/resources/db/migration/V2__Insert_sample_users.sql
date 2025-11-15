-- Insert sample admin user (password: admin123)
INSERT INTO users (username, password, email, full_name, phone_number, role, active)
VALUES (
    'admin',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'admin@barbooking.com',
    'System Admin',
    '0801234567',
    'ADMIN',
    TRUE
);

-- Insert sample staff user (password: staff123)
INSERT INTO users (username, password, email, full_name, phone_number, role, active)
VALUES (
    'staff01',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'staff@barbooking.com',
    'Staff Member',
    '0809876543',
    'STAFF',
    TRUE
);

-- Insert sample customer user (password: customer123)
INSERT INTO users (username, password, email, full_name, phone_number, role, active)
VALUES (
    'customer01',
    '$2a$10$Z5k8qwX4b6E2n9UOOg9hk.MFW6.VqL8h4zk8gV8h8h8h8h8h8h8h8h',
    'customer@example.com',
    'John Doe',
    '0812345678',
    'CUSTOMER',
    TRUE
);

