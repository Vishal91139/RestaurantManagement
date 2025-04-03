import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems(prev => [...prev, item]);
    };

    const removeFromCart = (itemToRemove) => {
        setCartItems(prev => prev.filter(item => item !== itemToRemove))
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}