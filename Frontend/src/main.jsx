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
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
