import React, { createContext, useState, useContext, useCallback } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);

    const addOrder = useCallback((cartItems) => {
        // Validate input
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            console.warn('No valid items provided for order');
            return null;
        }

        // Calculate totals
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1; // Example 10% tax, adjust as needed
        const total = subtotal + tax;

        const newOrder = {
            items: cartItems.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
                subtotal: item.price * item.quantity
            })),
            orderDate: new Date().toISOString(),
            orderId: Math.floor(10000 + Math.random() * 90000),
            status: 'pending',
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2)
        };

        setOrders(prev => [...prev, newOrder]);
        return newOrder.orderId;
    }, []);

    const updateOrderStatus = useCallback((orderId, newStatus) => {
        setOrders(prev => prev.map(order => 
            order.orderId === orderId ? { ...order, status: newStatus } : order
        ));
    }, []);

    const getOrderById = useCallback((orderId) => {
        return orders.find(order => order.orderId === orderId);
    }, [orders]);

    return (
        <OrderContext.Provider value={{ 
            orders, 
            addOrder, 
            updateOrderStatus, 
            getOrderById 
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