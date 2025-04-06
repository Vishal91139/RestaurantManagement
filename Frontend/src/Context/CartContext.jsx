import React, { createContext, useState, useContext, useCallback } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = useCallback((item) => {
        setCartItems(prev => {
            const existingItem = prev.find(i => i.name === item.name);
            if (existingItem) {
                return prev.map(i =>
                    i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((item) => {
        setCartItems(prev => prev.filter(i => i.name !== item.name));
    }, []);

    const updateQuantity = useCallback((itemName, change) => {
        setCartItems(prev => {
            return prev.map(item => {
                if (item.name === itemName) {
                    const newQuantity = Math.max(1, item.quantity + change);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}