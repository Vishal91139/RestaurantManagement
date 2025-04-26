# Restaurant Management System

A full-stack web application for restaurant management, including menu browsing, cart functionality, order processing, payment handling, and table reservations.

## Features

- **User Authentication**: Secure signup, login, and profile management
- **Menu Management**: Browse menu items by category with images and descriptions
- **Shopping Cart**: Add items to cart, adjust quantities, and proceed to checkout
- **Order Processing**: Place orders, track order status, and view order history
- **Payment System**: Secure payment processing with credit card information
- **Table Reservations**: Book tables for specific dates and times
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

### Frontend
- React.js
- CSS3 with custom animations
- Context API for state management
- React Router for navigation

### Backend
- Node.js with Express
- MySQL database
- JWT for authentication
- RESTful API architecture

## Project Structure

```
resto/
├── Frontend/                # React frontend application
│   ├── public/              # Static files
│   └── src/                 # Source files
│       ├── assets/          # Images, icons, and other static assets
│       ├── Components/      # Reusable UI components
│       ├── Context/         # React Context providers
│       ├── DB/              # Frontend database mock files
│       └── Pages/           # Page components
├── backend/                 # Node.js backend application
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── db/                  # Database scripts and migrations
│   ├── middleware/          # Express middleware
│   └── routes/              # API route definitions
└── docs/                    # Documentation files
    └── database/            # Database schema and ER diagrams
```

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Database Setup
1. Create a MySQL database:
   ```sql
   CREATE DATABASE restaurant_db;
   ```

2. Run the database setup scripts:
   ```bash
   cd backend/db
   mysql -u your_username -p restaurant_db < users_table.sql
   mysql -u your_username -p restaurant_db < menu_table.sql
   mysql -u your_username -p restaurant_db < cart_table.sql
   mysql -u your_username -p restaurant_db < orders_table.sql
   mysql -u your_username -p restaurant_db < reservations_table.sql
   ```

3. Populate the menu with sample data:
   ```bash
   mysql -u your_username -p restaurant_db < insert_menu_items.sql
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=restaurant_db
   DB_PORT=3306
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on http://localhost:5001 by default.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The application will open in your browser at http://localhost:3000.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login a user

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get a specific menu item
- `GET /api/menu/category/:category` - Get menu items by category

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/orders/myorders` - Get user's orders
- `GET /api/orders/:id` - Get a specific order
- `POST /api/orders` - Create a new order

### Payments
- `POST /api/payments` - Process a payment

### Reservations
- `GET /api/reservations` - Get user's reservations
- `GET /api/reservations/tables` - Get available tables
- `POST /api/reservations` - Create a new reservation
- `PUT /api/reservations/:id` - Update a reservation
- `DELETE /api/reservations/:id` - Cancel a reservation

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Icons from [Material Design Icons](https://material.io/resources/icons/)
- Images from [Unsplash](https://unsplash.com/)
