-- reservations_table.sql
-- SQL script to create the reservations table if it doesn't exist

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  table_number INT NOT NULL,
  capacity INT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status ENUM('available', 'reserved', 'occupied') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Add indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_reservations_user_id ON reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_table_number ON reservations(table_number);
CREATE INDEX IF NOT EXISTS idx_reservations_date_time ON reservations(date, time);
