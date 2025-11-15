CREATE TABLE IF NOT EXISTS bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    table_id BIGINT,
    zone_id BIGINT,
    booking_type VARCHAR(20) NOT NULL,
    time_slot VARCHAR(20) NOT NULL,
    booking_date TIMESTAMP NOT NULL,
    guest_count INT NOT NULL,
    fee DOUBLE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    payment_id BIGINT,
    checked_in_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_table_id (table_id),
    INDEX idx_zone_id (zone_id),
    INDEX idx_status (status),
    INDEX idx_booking_date (booking_date),
    INDEX idx_time_slot (time_slot)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

