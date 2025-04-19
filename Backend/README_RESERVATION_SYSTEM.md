# Reservation System Implementation

This document provides instructions on how to set up and use the reservation system.

## Backend Setup

1. **Create the Reservations Table**

   Run the SQL script in `db/reservations_table.sql` to create the reservations table:

   ```bash
   mysql -u your_username -p your_database_name < db/reservations_table.sql
   ```

2. **Start the Backend Server**

   Make sure your backend server is running:

   ```bash
   cd backend
   npm start
   ```

## API Endpoints

### Public Endpoints

- `GET /api/reservations/tables` - Get all available tables
  - Query parameters:
    - `date` (optional) - Date in YYYY-MM-DD format
    - `time` (optional) - Time in HH:MM format

### Protected Endpoints (Require Authentication)

- `GET /api/reservations` - Get all reservations for the current user
- `GET /api/reservations/:id` - Get a specific reservation by ID
- `POST /api/reservations` - Create a new reservation
  - Required fields: `table_number`, `capacity`, `date`, `time`
- `PUT /api/reservations/:id` - Update a reservation
  - Required fields: `table_number`, `capacity`, `date`, `time`
  - Optional fields: `status`
- `DELETE /api/reservations/:id` - Cancel a reservation

## Frontend Integration

To connect your existing frontend to the new reservation system, follow these steps:

### 1. Create a Reservation Context

Create a new context file at `Frontend/src/Context/ReservationContext.jsx`:

```jsx
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ReservationContext = createContext();

export function ReservationProvider({ children }) {
    const [tables, setTables] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated, token } = useAuth();

    const BACKEND_URL = 'http://localhost:5001';

    // Fetch tables
    const fetchTables = useCallback(async (date, time) => {
        setLoading(true);
        setError(null);
        try {
            let url = `${BACKEND_URL}/api/reservations/tables`;
            if (date && time) {
                url += `?date=${date}&time=${time}`;
            }
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch tables');
            }
            
            const data = await response.json();
            setTables(data);
            return data;
        } catch (err) {
            console.error('Error fetching tables:', err);
            setError(err.message);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch user reservations
    const fetchReservations = useCallback(async () => {
        if (!isAuthenticated || !token) return;
        
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BACKEND_URL}/api/reservations`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch reservations');
            }
            
            const data = await response.json();
            setReservations(data);
            return data;
        } catch (err) {
            console.error('Error fetching reservations:', err);
            setError(err.message);
            return [];
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, token]);

    // Create a reservation
    const createReservation = useCallback(async (reservationData) => {
        if (!isAuthenticated || !token) return null;
        
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BACKEND_URL}/api/reservations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(reservationData)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to create reservation');
            }
            
            // Refresh reservations
            await fetchReservations();
            return data.reservationId;
        } catch (err) {
            console.error('Error creating reservation:', err);
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, token, fetchReservations]);

    // Update a reservation
    const updateReservation = useCallback(async (reservationId, reservationData) => {
        if (!isAuthenticated || !token) return false;
        
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BACKEND_URL}/api/reservations/${reservationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(reservationData)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update reservation');
            }
            
            // Refresh reservations
            await fetchReservations();
            return true;
        } catch (err) {
            console.error('Error updating reservation:', err);
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, token, fetchReservations]);

    // Cancel a reservation
    const cancelReservation = useCallback(async (reservationId) => {
        if (!isAuthenticated || !token) return false;
        
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BACKEND_URL}/api/reservations/${reservationId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to cancel reservation');
            }
            
            // Refresh reservations
            await fetchReservations();
            return true;
        } catch (err) {
            console.error('Error cancelling reservation:', err);
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, token, fetchReservations]);

    // Load reservations when auth state changes
    useEffect(() => {
        if (isAuthenticated && token) {
            fetchReservations();
        } else {
            setReservations([]);
        }
    }, [isAuthenticated, token, fetchReservations]);

    return (
        <ReservationContext.Provider value={{
            tables,
            reservations,
            loading,
            error,
            fetchTables,
            fetchReservations,
            createReservation,
            updateReservation,
            cancelReservation
        }}>
            {children}
        </ReservationContext.Provider>
    );
}

export const useReservation = () => useContext(ReservationContext);
```

### 2. Update App.jsx to Include the Reservation Provider

Update your `Frontend/src/App.jsx` file to include the ReservationProvider:

```jsx
// src/App.js
import './App.css';
import NavBar from './Components/Header/NavBar';
import Footer from './Components/Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';
import { OrderProvider } from './Context/OrderContext';
import { AuthProvider } from './Context/AuthContext';
import { ReservationProvider } from './Context/ReservationContext';

function App() {
  // Get the current location to conditionally render the footer
  const location = useLocation();
  const hideFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    // AuthProvider wraps everything that needs the auth context
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <ReservationProvider>
            <NavBar />
            <main className="main-content"> {/* Optional: semantic main tag */}
              <Outlet />
            </main>
            {!hideFooter && <Footer />}
          </ReservationProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
```

### 3. Update TableLayout Component

Update your `Frontend/src/Components/TableLayout/TableLayout.jsx` file to use the reservation context:

```jsx
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useAuth } from '../../Context/AuthContext';
import { useReservation } from '../../Context/ReservationContext';
import { format } from 'date-fns'; // You may need to install this package

const TableLayout = () => {
  const { user } = useAuth();
  const { 
    tables, 
    reservations, 
    loading, 
    error, 
    fetchTables, 
    createReservation 
  } = useReservation();
  
  const tableRowsRef = useRef([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedTime, setSelectedTime] = useState('19:00');
  const [bookingInProgress, setBookingInProgress] = useState(false);
  
  // Clear and reset refs when tables change
  useEffect(() => {
    tableRowsRef.current = [];
  }, [tables, reservations]);
  
  // Fetch tables when component mounts or date/time changes
  useEffect(() => {
    fetchTables(selectedDate, selectedTime);
  }, [fetchTables, selectedDate, selectedTime]);
  
  // GSAP animations
  useEffect(() => {
    const timer = setTimeout(() => {
      if (tableRowsRef.current.length > 0) {
        gsap.fromTo(tableRowsRef.current,
          { x: 20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            delay: 0.2
          }
        );
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [tables, reservations]);

  const addToRefs = (el) => {
    if (el && !tableRowsRef.current.includes(el)) {
      tableRowsRef.current.push(el);
    }
  };

  const isReservedByCurrentUser = (tableNumber) => {
    return reservations.some(res => 
      res.table_number === tableNumber && 
      format(new Date(res.date), 'yyyy-MM-dd') === selectedDate && 
      res.time === selectedTime
    );
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleBookTable = async (tableNumber, capacity) => {
    setBookingInProgress(true);
    try {
      await createReservation({
        table_number: tableNumber,
        capacity,
        date: selectedDate,
        time: selectedTime
      });
      
      // Refresh tables after booking
      await fetchTables(selectedDate, selectedTime);
    } catch (err) {
      console.error('Error booking table:', err);
    } finally {
      setBookingInProgress(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  };

  // Get user's reservations
  const myReservations = reservations || [];

  return (
    <div>
      {/* Date and Time Selector */}
      <div className="date-time-selector">
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={format(new Date(), 'yyyy-MM-dd')}
            className="date-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <select
            id="time"
            value={selectedTime}
            onChange={handleTimeChange}
            className="time-input"
          >
            <option value="12:00">12:00 PM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
            <option value="17:00">5:00 PM</option>
            <option value="18:00">6:00 PM</option>
            <option value="19:00">7:00 PM</option>
            <option value="20:00">8:00 PM</option>
            <option value="21:00">9:00 PM</option>
          </select>
        </div>
        <button 
          className="refresh-btn"
          onClick={() => fetchTables(selectedDate, selectedTime)}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh Tables'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {myReservations.length > 0 && (
        <div className="my-tables-section">
          <h3 className="my-tables-title">My Reservations</h3>
          <div className="table-layout-container my-tables-container">
            <table className="table-layout">
              <thead>
                <tr className="table-header-row">
                  <th className="table-header-cell">Table No</th>
                  <th className="table-header-cell">Capacity</th>
                  <th className="table-header-cell">Date</th>
                  <th className="table-header-cell">Time</th>
                  <th className="table-header-cell">Action</th>
                </tr>
              </thead>
              <tbody>
                {myReservations.map((reservation, index) => (
                  <tr
                    key={`my-${reservation.id}`}
                    className="table-row my-table-row slide-in-right"
                    ref={addToRefs}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <td className="table-cell">{reservation.table_number}</td>
                    <td className="table-cell">{reservation.capacity}</td>
                    <td className="table-cell">{formatDate(reservation.date)}</td>
                    <td className="table-cell">{reservation.time}</td>
                    <td className="table-cell">
                      <button 
                        className="view-table-btn my-reservation-btn"
                        onClick={() => cancelReservation(reservation.id)}
                      >
                        Cancel Booking
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="all-tables-section">
        <h3 className="all-tables-title">Available Tables for {formatDate(selectedDate)} at {selectedTime}</h3>
        <div className="table-layout-container">
          <table className="table-layout">
            <thead>
              <tr className="table-header-row">
                <th className="table-header-cell">Table No</th>
                <th className="table-header-cell">Capacity</th>
                <th className="table-header-cell">Status</th>
                <th className="table-header-cell">Action</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table, index) => (
                <tr
                  key={table.table_number}
                  className={`table-row slide-in-right ${isReservedByCurrentUser(table.table_number) ? 'my-reservation' : ''}`}
                  ref={addToRefs}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <td className="table-cell">{table.table_number}</td>
                  <td className="table-cell">{table.capacity}</td>
                  <td className="table-cell">
                    <span className={`status-badge status-${table.status}`}>
                      {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                    </span>
                  </td>
                  <td className="table-cell">
                    <button
                      className={`view-table-btn ${table.status !== 'available' ? 'disabled-btn' : 'book-btn'}`}
                      disabled={table.status !== 'available' || bookingInProgress}
                      onClick={() => handleBookTable(table.table_number, table.capacity)}
                      title={table.status !== 'available' ? 'This table is not available' : 'Book this table'}
                    >
                      {table.status === 'available' ? 'Book Table' : 'Not Available'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableLayout;
```

### 4. Add CSS for Date/Time Selector

Add these styles to your `Frontend/src/Pages/TablePage.css` file:

```css
/* Date and Time Selector */
.date-time-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.date-input,
.time-input {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-width: 150px;
}

.refresh-btn {
  background-color: #ff6a00;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-end;
  margin-top: 24px;
}

.refresh-btn:hover {
  background-color: #e05e00;
  transform: translateY(-2px);
}

.refresh-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  background-color: rgba(255, 0, 0, 0.1);
  color: #d32f2f;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 500;
}
```

## What You Need to Do

1. **Create the Reservations Table**:
   - Run the SQL script to create the reservations table in your database

2. **Add the Backend Files**:
   - Add the `reservationController.js` and `reservationRoutes.js` files to your backend
   - Update your `server.js` file to include the new routes

3. **Create the Frontend Context**:
   - Create the `ReservationContext.jsx` file
   - Update your `App.jsx` to include the ReservationProvider
   - Update your `TableLayout.jsx` component to use the reservation context
   - Add the new CSS styles to your `TablePage.css` file

4. **Install Additional Packages** (if needed):
   - You may need to install the `date-fns` package for date formatting:
     ```bash
     cd Frontend
     npm install date-fns
     ```

5. **Test the System**:
   - Start your backend server
   - Start your frontend application
   - Navigate to the table page and test the reservation system
