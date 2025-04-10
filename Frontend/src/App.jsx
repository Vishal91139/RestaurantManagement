import './App.css'
import NavBar from './Components/Header/NavBar'
import Footer from './Components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { CartProvider } from './Context/CartContext'
import { OrderProvider } from './Context/OrderContext'
import { useEffect } from 'react'
import axios from 'axios'
import { AuthProvider } from './Context/AuthContext'

function App() {
  
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <NavBar />
          <Outlet />
          <Footer />
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
