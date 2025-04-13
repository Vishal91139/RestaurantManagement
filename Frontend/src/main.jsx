// src/main.jsx (or index.jsx) - MODIFIED
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layout Component
import App from "./App"; // App still contains AuthProvider internally

// Page Components (adjust paths as needed)
import Homepage from "./Pages/Homepage";
import Menupage from "./Pages/Menupage";
import Orderpage from "./Pages/Orderpage";
import Tablepage from "./Pages/Tablepage";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import NotFoundPage from "./Pages/NotFoundPage"; // <-- Make sure this line exists and the path is correct

// --- REMOVE ProtectedRoute import ---
// import ProtectedRoute from "./Components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App has NavBar, Footer, Outlet, AuthProvider
    errorElement: <NotFoundPage />,
    children: [
      // --- Public Routes ---
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "menu",
        element: <Menupage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />, // Or a dedicated SignupPage component
      },

      // --- Routes that ARE NO LONGER PROTECTED by the router ---
      // Authentication checks MUST happen INSIDE these components now
      {
        path: "order",
        element: <Orderpage />, // Directly render Orderpage
      },
      {
        path: "table",
        element: <Tablepage />, // Directly render Tablepage
      },
      // Add other previously protected routes here (e.g., profile, dashboard)
      // Example:
      // {
      //   path: "profile",
      //   element: <ProfilePage />
      // }

      // --- Catch-all 404 within the App layout ---
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* AuthProvider is inside App.js */}
  </StrictMode>
);