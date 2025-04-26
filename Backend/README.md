# Restaurant Management System - Backend

This directory contains the Node.js/Express backend for the Restaurant Management System.

## Directory Structure

```
backend/
├── config/              # Configuration files
│   └── db.js            # Database connection setup
├── controllers/         # Request handlers
│   ├── authController.js       # Authentication logic
│   ├── cartController.js       # Cart management
│   ├── menuController.js       # Menu items retrieval
│   ├── orderController.js      # Order processing
│   ├── paymentController.js    # Payment handling
│   └── reservationController.js # Table reservations
├── db/                  # Database scripts
│   ├── cart_table.sql           # Cart table creation script
│   ├── check_menu_table.js      # Menu table verification script
│   ├── insert_menu_items.sql    # Sample menu data
│   └── reservations_table.sql   # Reservations table creation script
├── middleware/          # Express middleware
│   └── authMiddleware.js        # JWT authentication middleware
├── routes/              # API route definitions
│   ├── authRoutes.js            # Authentication routes
│   ├── cartRoutes.js            # Cart routes
│   ├── menuRoutes.js            # Menu routes
│   ├── orderRoutes.js           # Order routes
│   ├── paymentRoutes.js         # Payment routes
│   └── reservationRoutes.js     # Reservation routes
├── .env                 # Environment variables (create this file)
├── package.json         # Project dependencies
└── server.js            # Express application entry point
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
   cd db
   mysql -u your_username -p restaurant_db < cart_table.sql
   mysql -u your_username -p restaurant_db < reservations_table.sql
   ```

3. Populate the menu with sample data:
   ```bash
   mysql -u your_username -p restaurant_db < insert_menu_items.sql
   ```

### Backend Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=restaurant_db
   DB_PORT=3306
   JWT_SECRET=your_jwt_secret_key
   ```

3. Start the server:
   ```bash
   npm start
   ```
   The server will run on http://localhost:5001 by default.

## API Documentation

### Authentication Endpoints

#### Register a new user
- **URL**: `/api/auth/signup`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**: 
  ```json
  {
    "message": "User registered successfully",
    "userId": 1
  }
  ```

#### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**: 
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john@example.com"
    }
  }
  ```

### Menu Endpoints

#### Get all menu items
- **URL**: `/api/menu`
- **Method**: `GET`
- **Response**: Array of menu items

#### Get menu items by category
- **URL**: `/api/menu/category/:category`
- **Method**: `GET`
- **Response**: Array of menu items in the specified category

### Cart Endpoints

#### Get user's cart
- **URL**: `/api/cart`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer jwt_token_here`
- **Response**: Array of cart items with menu details

#### Add item to cart
- **URL**: `/api/cart`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer jwt_token_here`
- **Body**:
  ```json
  {
    "menu_id": 101,
    "quantity": 2
  }
  ```
- **Response**: Success message and updated cart

### Orders Endpoints

#### Get user's orders
- **URL**: `/api/orders/myorders`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer jwt_token_here`
- **Response**: Array of user's orders with items

#### Create a new order
- **URL**: `/api/orders`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer jwt_token_here`
- **Body**:
  ```json
  {
    "items": [
      {
        "menu_id": 101,
        "quantity": 2
      },
      {
        "menu_id": 203,
        "quantity": 1
      }
    ]
  }
  ```
- **Response**: Order ID and total amount

### Reservations Endpoints

#### Get available tables
- **URL**: `/api/reservations/tables`
- **Method**: `GET`
- **Query Parameters**: 
  - `date`: Date in YYYY-MM-DD format
  - `time`: Time in HH:MM format
- **Response**: Array of available tables

#### Create a new reservation
- **URL**: `/api/reservations`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer jwt_token_here`
- **Body**:
  ```json
  {
    "table_number": 5,
    "capacity": 4,
    "date": "2023-12-25",
    "time": "19:00"
  }
  ```
- **Response**: Reservation ID and confirmation message

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

Error responses include a message explaining the error.

## Security

- Passwords are hashed using bcrypt
- Authentication is handled with JWT tokens
- API endpoints that require authentication are protected with middleware
- Database queries use parameterized statements to prevent SQL injection

## Development

To run the server in development mode with automatic restart:
```bash
npm run dev
```
