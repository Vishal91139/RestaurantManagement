# Database Setup

This directory contains SQL scripts for setting up the database tables required for the restaurant management system.

## Cart Table

The `cart_table.sql` script creates the cart table with the following structure:

- `id`: Auto-incrementing primary key
- `user_id`: Foreign key referencing the users table
- `menu_id`: Foreign key referencing the menu table
- `quantity`: Number of items in the cart
- `created_at`: Timestamp when the cart item was created
- `updated_at`: Timestamp when the cart item was last updated

### How to Run

You can run this script using the MySQL command line client:

```bash
mysql -u your_username -p your_database_name < cart_table.sql
```

Or you can copy and paste the SQL commands into your MySQL client or management tool.

### Foreign Key Constraints

The cart table has foreign key constraints to ensure data integrity:

- `user_id` references the `id` column in the `users` table
- `menu_id` references the `id` column in the `menu` table

Both foreign keys have `ON DELETE CASCADE` which means if a user or menu item is deleted, all related cart items will be automatically deleted as well.

### Unique Constraint

The table has a unique constraint on the combination of `user_id` and `menu_id` to prevent duplicate entries. This ensures that a user can only have one cart entry per menu item, with the quantity field indicating how many of that item they want.
