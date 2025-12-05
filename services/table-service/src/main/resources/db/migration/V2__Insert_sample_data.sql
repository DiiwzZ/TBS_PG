-- Insert sample zones
INSERT INTO zones (name, description, active) VALUES
('NORMAL', 'โซนทั่วไป - เหมาะสำหรับนั่งสบายๆ บรรยากาศแบบชิลๆ', TRUE),
('VIP', 'โซนพรีเมียม - วิวดี บริการพิเศษ พื้นที่กว้างขวาง', TRUE),
('VVIP', 'โซนเอกซ์คลูซีฟ - ความเป็นส่วนตัวสูงสุด บริการระดับพรีเมียม', TRUE),
('Stage Front', 'โซนหน้าเวที - ใกล้ชิดความสนุก สัมผัสบรรยากาศสุดมันส์', TRUE),
('Bar Counter', 'โซนเคาน์เตอร์บาร์ - นั่งชมบาร์เทนเดอร์ชงเครื่องดื่ม บรรยากาศสนุกสนาน', TRUE);

-- Insert sample tables for NORMAL Zone (zone_id = 1)
INSERT INTO tables (table_number, zone_id, capacity, available, active) VALUES
('N1', 1, 4, TRUE, TRUE),
('N2', 1, 4, TRUE, TRUE),
('N3', 1, 4, TRUE, TRUE),
('N4', 1, 6, TRUE, TRUE),
('N5', 1, 6, TRUE, TRUE),
('N6', 1, 8, TRUE, TRUE);

-- Insert sample tables for VIP Zone (zone_id = 2)
INSERT INTO tables (table_number, zone_id, capacity, available, active) VALUES
('V1', 2, 4, TRUE, TRUE),
('V2', 2, 6, TRUE, TRUE),
('V3', 2, 6, TRUE, TRUE),
('V4', 2, 8, TRUE, TRUE);

-- Insert sample tables for VVIP Zone (zone_id = 3)
INSERT INTO tables (table_number, zone_id, capacity, available, active) VALUES
('VV1', 3, 6, TRUE, TRUE),
('VV2', 3, 8, TRUE, TRUE),
('VV3', 3, 10, TRUE, TRUE);

-- Insert sample tables for Stage Front Zone (zone_id = 4)
INSERT INTO tables (table_number, zone_id, capacity, available, active) VALUES
('S1', 4, 4, TRUE, TRUE),
('S2', 4, 4, TRUE, TRUE),
('S3', 4, 6, TRUE, TRUE),
('S4', 4, 6, TRUE, TRUE);

-- Insert sample tables for Bar Counter Zone (zone_id = 5)
INSERT INTO tables (table_number, zone_id, capacity, available, active) VALUES
('B1', 5, 2, TRUE, TRUE),
('B2', 5, 2, TRUE, TRUE),
('B3', 5, 4, TRUE, TRUE),
('B4', 5, 4, TRUE, TRUE);

