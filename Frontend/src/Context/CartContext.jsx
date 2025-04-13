import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated, token } = useAuth();

    const BACKEND_URL = 'http://localhost:5001';

    // Fetch cart items from the backend when the component mounts or auth state changes
    useEffect(() => {
        let isMounted = true;

        const loadCartItems = async () => {
            if (isAuthenticated && token) {
                setLoading(true);
                try {
                    await fetchCartItems();
                } finally {
                    if (isMounted) {
                        setLoading(false);
                    }
                }
            } else {
                setCartItems([]);
            }
        };

        loadCartItems();

        // Cleanup function to prevent state updates if component unmounts
        return () => {
            isMounted = false;
        };
    }, [isAuthenticated, token]);

    // Function to fetch cart items from the backend
    const fetchCartItems = async () => {
        if (!isAuthenticated || !token) return;

        setError(null);

        try {
            const response = await fetch(`${BACKEND_URL}/api/cart`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }

            const data = await response.json();
            setCartItems(data.cartItems || []);
            return data;
        } catch (err) {
            console.error('Error fetching cart items:', err);
            setError(err.message);
            throw err;
        }
    };

    // Add item to cart (local state update after API call)
    const addToCart = useCallback((item) => {
        // This function is now called after a successful API call in MenuItem.jsx
        setCartItems(prev => {
            const existingItem = prev.find(i => i.menu_id === item.id);
            if (existingItem) {
                return prev.map(i =>
                    i.menu_id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, {
                menu_id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                description: item.description,
                category: item.category,
                quantity: 1
            }];
        });
    }, []);

    const removeFromCart = useCallback(async (item) => {
        if (!isAuthenticated || !token) return;

        try {
            const response = await fetch(`${BACKEND_URL}/api/cart/item/${item.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to remove item from cart');
            }

            // Update local state after successful API call
            setCartItems(prev => prev.filter(i => i.id !== item.id));
        } catch (err) {
            console.error('Error removing item from cart:', err);
            setError(err.message);
        }
    }, [isAuthenticated, token]);

    const updateQuantity = useCallback(async (itemId, change) => {
        if (!isAuthenticated || !token) return;

        // Find the item and calculate new quantity
        const item = cartItems.find(i => i.id === itemId);
        if (!item) return;

        const newQuantity = Math.max(1, item.quantity + change);

        try {
            const response = await fetch(`${BACKEND_URL}/api/cart/item/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ quantity: newQuantity })
            });

            if (!response.ok) {
                throw new Error('Failed to update item quantity');
            }

            // Update local state after successful API call
            setCartItems(prev => {
                return prev.map(item => {
                    if (item.id === itemId) {
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                });
            });
        } catch (err) {
            console.error('Error updating item quantity:', err);
            setError(err.message);
        }
    }, [cartItems, isAuthenticated, token]);

    const clearCart = useCallback(async () => {
        if (!isAuthenticated || !token) return;

        try {
            const response = await fetch(`${BACKEND_URL}/api/cart`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to clear cart');
            }

            // Update local state after successful API call
            setCartItems([]);
        } catch (err) {
            console.error('Error clearing cart:', err);
            setError(err.message);
        }
    }, [isAuthenticated, token]);

    return (
        <CartContext.Provider value={{
            cartItems,
            loading,
            error,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            refreshCart: fetchCartItems
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}