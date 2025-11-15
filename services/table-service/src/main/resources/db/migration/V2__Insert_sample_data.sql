-- Insert sample zones
INSERT INTO zones (name, description, active) VALUES
('VIP Zone', 'Premium area with best view', TRUE),
('Garden Zone', 'Outdoor seating area', TRUE),
('Bar Zone', 'Near the bar counter', TRUE),
('General Zone', 'Standard seating area', TRUE);

-- Insert sample tables for VIP Zone (zone_id = 1)
INSERT INTO tables (table_number, zone_id, capacity, available, active) VALUES
('V1', 1, 4, TRUE, TRUE),
('V2', 1, 4, TRUE, TRUE),
('V3', 1, 6, TRUE, TRUE),
('V4', 1, 8, TRUE, TRUE);

-- Insert sample tables for Garden Zone (zone_id = 2)
INSERT INTO tables (table_number, zone_id, capacity, available, active) VALUES
('G1', 2, 4, TRUE, TRUE),
('G2', 2, 4, TRUE, TRUE),
('G3', 2, 6, TRUE, TRUE),
('G4', 2, 6, TRUE, TRUE),
('G5', 2, 8, TRUE, TRUE);

-- Insert sample tables for Bar Zone (zone_id = 3)
INSERT INTO tables (table_number, zone_id, capacity, available, active) VALUES
('B1', 3, 2, TRUE, TRUE),
('B2', 3, 2, TRUE, TRUE),
('B3', 3, 4, TRUE, TRUE),
('B4', 3, 4, TRUE, TRUE);

-- Insert sample tables for General Zone (zone_id = 4)
INSERT INTO tables (table_number, zone_id, capacity, available, active) VALUES
('T1', 4, 4, TRUE, TRUE),
('T2', 4, 4, TRUE, TRUE),
('T3', 4, 4, TRUE, TRUE),
('T4', 4, 6, TRUE, TRUE),
('T5', 4, 6, TRUE, TRUE),
('T6', 4, 8, TRUE, TRUE);

