// check_menu_table.js
// Script to check if the menu table exists and has the correct structure

const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkMenuTable() {
  try {
    // Create a connection to the database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('Connected to the database successfully.');

    // Check if menu table exists
    const [tables] = await connection.query(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'menu'
    `, [process.env.DB_NAME]);

    if (tables.length === 0) {
      console.log('The menu table does not exist. Creating it...');
      
      // Create menu table
      await connection.query(`
        CREATE TABLE menu (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          price DECIMAL(10, 2) NOT NULL,
          category VARCHAR(100),
          image VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      
      console.log('Menu table created successfully.');
    } else {
      console.log('Menu table exists. Checking structure...');
      
      // Get table columns
      const [columns] = await connection.query(`
        SHOW COLUMNS FROM menu
      `);
      
      console.log('Menu table structure:');
      columns.forEach(column => {
        console.log(`- ${column.Field}: ${column.Type} ${column.Null === 'NO' ? 'NOT NULL' : ''} ${column.Key === 'PRI' ? 'PRIMARY KEY' : ''}`);
      });
    }

    // Check if there are any menu items
    const [menuItems] = await connection.query('SELECT COUNT(*) as count FROM menu');
    console.log(`Number of menu items in the database: ${menuItems[0].count}`);

    // Close the connection
    await connection.end();
    console.log('Database connection closed.');

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the function
checkMenuTable();
