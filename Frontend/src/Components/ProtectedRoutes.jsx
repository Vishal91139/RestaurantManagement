// src/Components/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Adjust path

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation(); // Get current location

    if (isLoading) {
        // Show a loading indicator while checking auth status
        return <div>Loading authentication status...</div>; // Or a spinner component
    }

    if (!isAuthenticated) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to. This allows us to send them along to that page after they
        // login, which is a nicer user experience than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If authenticated, render the children components (the actual protected route's content)
    return children;
};

export default ProtectedRoute;