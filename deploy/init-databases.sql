-- Create separate databases for each microservice

CREATE DATABASE IF NOT EXISTS user_db;
CREATE DATABASE IF NOT EXISTS table_db;
CREATE DATABASE IF NOT EXISTS booking_db;
CREATE DATABASE IF NOT EXISTS checkin_db;
CREATE DATABASE IF NOT EXISTS payment_db;

-- Grant privileges (optional, root already has all privileges)
GRANT ALL PRIVILEGES ON user_db.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON table_db.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON booking_db.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON checkin_db.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON payment_db.* TO 'root'@'%';

FLUSH PRIVILEGES;

