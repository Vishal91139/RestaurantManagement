# Restaurant Management System - Frontend

This directory contains the React frontend for the Restaurant Management System, built with Vite for fast development and optimized production builds.

## Directory Structure

```
Frontend/
├── public/              # Static files
│   ├── index.html       # HTML template
│   └── favicon.ico      # Site favicon
├── src/                 # Source files
│   ├── assets/          # Static assets
│   │   ├── Icons/       # SVG icons
│   │   ├── Menu/        # Menu item images
│   │   └── ...          # Other images and assets
│   ├── Components/      # Reusable UI components
│   │   ├── Cart/        # Cart-related components
│   │   ├── Footer/      # Footer component
│   │   ├── Header/      # Header and navigation components
│   │   ├── Menu/        # Menu-related components
│   │   ├── Payment/     # Payment form components
│   │   └── TableLayout/ # Table reservation components
│   ├── Context/         # React Context providers
│   │   ├── AuthContext.jsx      # Authentication state management
│   │   ├── CartContext.jsx      # Shopping cart state management
│   │   ├── OrderContext.jsx     # Order state management
│   │   └── ReservationContext.jsx # Reservation state management
│   ├── DB/              # Frontend database mock files
│   │   └── MenuDB.js    # Menu data for development
│   ├── Pages/           # Page components
│   │   ├── CartPage.jsx         # Shopping cart page
│   │   ├── Homepage.jsx         # Landing page
│   │   ├── LoginPage.jsx        # User login page
│   │   ├── MenuPage.jsx         # Menu browsing page
│   │   ├── OrderPage.jsx        # Order history page
│   │   ├── SignupPage.jsx       # User registration page
│   │   └── TablePage.jsx        # Table reservation page
│   ├── App.css          # Global styles
│   ├── App.jsx          # Main application component
│   ├── index.css        # Base styles
│   └── index.js         # Application entry point
└── package.json         # Project dependencies
```

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   The application will open in your browser at http://localhost:5173.

3. Build for production:
   ```bash
   npm run build
   ```
   This creates an optimized production build in the `dist` folder.

## Features

### User Authentication
- User registration and login
- Protected routes for authenticated users
- User profile management

### Menu Browsing
- View menu items by category
- Search functionality
- Detailed item view with description and price

### Shopping Cart
- Add items to cart
- Adjust quantities
- Remove items
- Calculate subtotal, tax, and total

### Order Management
- Place new orders
- View order history
- Track order status
- Reorder functionality

### Table Reservations
- View available tables
- Book tables for specific dates and times
- Manage existing reservations
- Cancel reservations

### Payment Processing
- Secure credit card form
- Order confirmation
- Payment receipt

## State Management

The application uses React Context API for state management:

- **AuthContext**: Manages user authentication state
- **CartContext**: Manages shopping cart state
- **OrderContext**: Manages order state
- **ReservationContext**: Manages table reservation state

## API Integration

The frontend communicates with the backend API using fetch or axios. API calls are organized by feature:

- **Auth API**: User registration, login, and profile management
- **Menu API**: Fetching menu items and categories
- **Cart API**: Managing cart items
- **Order API**: Creating and retrieving orders
- **Reservation API**: Managing table reservations
- **Payment API**: Processing payments

## Styling

The application uses CSS for styling with the following approach:

- Component-specific CSS files
- Responsive design for mobile, tablet, and desktop
- Custom animations for enhanced user experience
- Consistent color scheme and typography

## Vite Advantages

This project uses Vite for several benefits:
- Extremely fast hot module replacement (HMR)
- Optimized builds with rollup
- Native ES modules during development
- Built-in support for various file types
- Simplified configuration

## Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Ensure the backend server is running
   - Check that the API URL is correctly configured
   - Verify network connectivity

2. **Authentication Problems**
   - Clear browser cookies and local storage
   - Ensure you're using the correct credentials
   - Check that the JWT token is being properly stored and sent

3. **Styling Inconsistencies**
   - Clear browser cache
   - Ensure CSS files are being properly imported
   - Check for conflicting styles

### Development Tools

- Use React Developer Tools browser extension for component debugging
- Use Network tab in browser DevTools to inspect API calls
- Use console.log for debugging (remember to remove before production)
