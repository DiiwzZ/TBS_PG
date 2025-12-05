-- Add QR token column to bookings table
ALTER TABLE bookings
ADD COLUMN qr_token VARCHAR(255) UNIQUE COMMENT 'Unique QR token for check-in, generated when booking is confirmed';

-- Create index for faster lookups
CREATE INDEX idx_bookings_qr_token ON bookings(qr_token);

