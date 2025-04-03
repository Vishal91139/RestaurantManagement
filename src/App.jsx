import './App.css'
import NavBar from './Components/Header/NavBar'
import Footer from './Components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { CartProvider } from './Context/CartContext'
import { OrderProvider } from './Context/OrderContext'

function App() {
  
  return (
    <CartProvider>
      <OrderProvider>
        <NavBar />
        <Outlet />
        <Footer />
      </OrderProvider>
    </CartProvider>
  )
}

export default App
