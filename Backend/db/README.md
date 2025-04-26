# Restaurant Management System - Database

This directory contains SQL scripts and database-related files for the Restaurant Management System.

## Database Schema

The database consists of the following tables:

### Users Table
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Menu Table
```sql
CREATE TABLE menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Cart Table
```sql
CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    menu_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_id) REFERENCES menu(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_menu (user_id, menu_id)
);
```

### Orders Table
```sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    status ENUM('pending', 'paid', 'preparing', 'ready', 'delivered', 'cancelled') DEFAULT 'pending',
    total DECIMAL(10, 2) DEFAULT 0.00,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_id) REFERENCES menu(id) ON DELETE CASCADE
);
```

### Payments Table
```sql
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    user_id INT NOT NULL,
    cardholder_name VARCHAR(100) NOT NULL,
    card_number VARCHAR(255) NOT NULL,
    expiry_date VARCHAR(10) NOT NULL,
    cvv VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_order_payment (order_id)
);
```

### Reservations Table
```sql
CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    table_number INT NOT NULL,
    capacity INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status ENUM('available', 'reserved', 'occupied') DEFAULT 'reserved',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_reservations_date_time (date, time)
);
```

## Files in this Directory

### SQL Scripts

- **cart_table.sql**: Creates the cart table with foreign key constraints
- **reservations_table.sql**: Creates the reservations table with indexes
- **insert_menu_items.sql**: Populates the menu table with sample data

### JavaScript Utilities

- **check_menu_table.js**: Utility script to check if the menu table exists and create it if needed

## Database Setup Instructions

1. Create the database:
   ```sql
   CREATE DATABASE restaurant_db;
   USE restaurant_db;
   ```

2. Create the users table:
   ```sql
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(50) NOT NULL UNIQUE,
       email VARCHAR(100) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   ```

3. Run the SQL scripts in this order:
   ```bash
   mysql -u your_username -p restaurant_db < menu_table.sql
   mysql -u your_username -p restaurant_db < cart_table.sql
   mysql -u your_username -p restaurant_db < orders_table.sql
   mysql -u your_username -p restaurant_db < order_items_table.sql
   mysql -u your_username -p restaurant_db < payments_table.sql
   mysql -u your_username -p restaurant_db < reservations_table.sql
   ```

4. Populate the menu with sample data:
   ```bash
   mysql -u your_username -p restaurant_db < insert_menu_items.sql
   ```

## Entity-Relationship Diagram

The database follows this entity-relationship model:

- **Users** have many **Orders**, **Cart** items, **Payments**, and **Reservations**
- **Menu** items can be in many **Cart** items and **Order Items**
- **Orders** have many **Order Items** and one **Payment**
- **Order Items** belong to one **Order** and one **Menu** item
- **Payments** belong to one **Order** and one **User**
- **Reservations** belong to one **User**

## Indexes and Performance

The database includes several indexes for performance optimization:

- Primary keys on all tables
- Foreign key indexes for faster joins
- Composite index on reservations.date and reservations.time for faster reservation lookups
- Index on orders.status for filtering orders by status

## Security Considerations

- Passwords are stored as hashed values (using bcrypt in the application layer)
- Foreign key constraints ensure data integrity
- Timestamps track creation and modification times
- Unique constraints prevent duplicate entries where appropriate

## Backup and Restore

To backup the database:
```bash
mysqldump -u your_username -p restaurant_db > restaurant_backup.sql
```

To restore from backup:
```bash
mysql -u your_username -p restaurant_db < restaurant_backup.sql
```
