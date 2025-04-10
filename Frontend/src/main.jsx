import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Homepage from './Pages/Homepage'
import Menupage from './Pages/Menupage'
import Orderpage from './Pages/Orderpage'
import Tablepage from './Pages/Tablepage'
import CartPage from './Pages/CartPage'
import Signup from './Components/Register/SignUp'
import Login from './Components/Register/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children:[
      {
        path: '/',
        element: <Homepage/>
      },
      {
        path: 'menu',
        element: <Menupage />
      },
      {
        path:'order',
        element: <Orderpage />
      },
      {
        path: 'table',
        element: <Tablepage />
      },
      {
        path: 'cart',
        element: <CartPage />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'login',
        element: <Login />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
