// src/App.js (RECAP - Make sure it looks like this)
import './App.css';
import NavBar from './Components/Header/NavBar'; // Adjust path if needed
import Footer from './Components/Footer/Footer'; // Adjust path if needed
import { Outlet } from 'react-router-dom';
import { CartProvider } from './Context/CartContext'; // Adjust path if needed
import { OrderProvider } from './Context/OrderContext'; // Adjust path if needed
import { AuthProvider } from './Context/AuthContext'; // Import AuthProvider

function App() {
  return (
    // AuthProvider wraps everything that needs the auth context
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <NavBar />
          <main className="main-content"> {/* Optional: semantic main tag */}
            <Outlet />
          </main>
          <Footer />  
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;