import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated, token } = useAuth();

    const BACKEND_URL = 'http://localhost:5001';

    // Fetch orders from the database when the component mounts or auth state changes
    useEffect(() => {
        let isMounted = true;

        const loadOrders = async () => {
            if (isAuthenticated && token) {
                setLoading(true);
                try {
                    await fetchOrders();
                } finally {
                    if (isMounted) {
                        setLoading(false);
                    }
                }
            } else {
                setOrders([]);
            }
        };

        loadOrders();

        // Cleanup function to prevent state updates if component unmounts
        return () => {
            isMounted = false;
        };
    }, [isAuthenticated, token]);

    // Function to fetch orders from the backend
    const fetchOrders = async () => {
        if (!isAuthenticated || !token) return;

        setError(null);

        try {
            const response = await fetch(`${BACKEND_URL}/api/orders/myorders`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await response.json();
            setOrders(data);
            return data;
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError(err.message);
            throw err;
        }
    };

    const addOrder = useCallback(async (cartItems) => {
        // Validate input
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            console.warn('No valid items provided for order');
            return null;
        }

        if (!isAuthenticated || !token) {
            console.error('User must be authenticated to create an order');
            return null;
        }

        setLoading(true);
        setError(null);

        try {
            // Format cart items for the API
            const items = cartItems.map(item => ({
                menu_id: item.menu_id || item.id,
                quantity: item.quantity
            }));

            // Send order to backend
            const response = await fetch(`${BACKEND_URL}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ items })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create order');
            }

            // Refresh orders from the database instead of creating a local object
            await fetchOrders();
            return data.orderId;
        } catch (err) {
            console.error('Error creating order:', err);
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, token]);

    const updateOrderStatus = useCallback(async (orderId, newStatus) => {
        if (!isAuthenticated || !token) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BACKEND_URL}/api/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            // Refresh orders from the database
            await fetchOrders();
        } catch (err) {
            console.error('Error updating order status:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, token]);

    const getOrderById = useCallback(async (orderId) => {
        if (!isAuthenticated || !token) return null;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BACKEND_URL}/api/orders/${orderId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch order details');
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Error fetching order details:', err);
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, token]);

    return (
        <OrderContext.Provider value={{
            orders,
            loading,
            error,
            addOrder,
            updateOrderStatus,
            getOrderById,
            fetchOrders
        }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrder() {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
}