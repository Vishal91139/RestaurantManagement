import './App.css'
import NavBar from './Components/Header/NavBar'
import Footer from './Components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  
  return (
    <>
    <NavBar />
    <Outlet />
    <Footer />
    </>
  )
}

export default App
