// src/Context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // Assuming you use axios for API calls

const AuthContext = createContext(null);

// Helper function to get token from localStorage
const getToken = () => localStorage.getItem('token');
// Helper function to get user data from localStorage (parse JSON)
const getUserData = () => {
    const user = localStorage.getItem('user');
    try {
        return user ? JSON.parse(user) : null;
    } catch (e) {
        console.error("Error parsing user data from localStorage", e);
        return null;
    }
};


export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUserData());
    const [isAuthenticated, setIsAuthenticated] = useState(!!getToken()); // Initial check based on token presence
    const [isLoading, setIsLoading] = useState(true); // To handle initial auth check loading state

    // Function to handle login
    const login = (userData, authToken) => {
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData)); // Store user data
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; // Set default header for axios
        setToken(authToken);
        setUser(userData);
        setIsAuthenticated(true);
    };

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization']; // Remove default header
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        // Optional: redirect to login page or home page might happen in the component calling logout
    };

    // Effect to check authentication status on initial load or token change
    useEffect(() => {
        const currentToken = getToken();
        const currentUser = getUserData();

        if (currentToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
            setIsAuthenticated(true);
            setToken(currentToken);
            setUser(currentUser); // Assume stored user data is fine initially
            // Optional but recommended: Verify token with backend here
            // e.g., axios.get('/api/auth/verify').then(...).catch(logout);
        } else {
            // Ensure clean state if no token
             logout(); // Call logout to ensure everything is cleared
        }
        setIsLoading(false); // Finished initial check
    }, []); // Run only once on mount

    // The value provided to consuming components
    const value = {
        token,
        user,
        isAuthenticated,
        isLoading, // Provide loading state
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};