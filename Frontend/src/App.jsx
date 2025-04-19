// src/App.js
import './App.css';
import NavBar from './Components/Header/NavBar';
import Footer from './Components/Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';
import { OrderProvider } from './Context/OrderContext';
import { AuthProvider } from './Context/AuthContext';
import { ReservationProvider } from './Context/ReservationContext';
import ScrollToTop from './Components/ScrollToTop';

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
            <ScrollToTop /> {/* Add ScrollToTop component */}
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