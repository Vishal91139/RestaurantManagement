import React, { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);

    const addOrder = (order) => {
        const newOrder = {
            ...order,
            orderDate: new Date().toLocaleString(),
            orderId: Math.random().toString(36).substr(2, 6),
            status: 'pending'
        };
        setOrders(prev => [...prev, newOrder]);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrder() {
    return useContext(OrderContext);
}