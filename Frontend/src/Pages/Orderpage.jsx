import React, { useEffect, useCallback } from 'react';
import { useOrder } from '../Context/OrderContext';
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import { debounce } from '../utils/debounce';

const OrderPage = () => {
    const { orders, loading, error, fetchOrders } = useOrder();
    const { isAuthenticated } = useAuth();

    // Debounce the fetchOrders function to prevent multiple calls
    const debouncedFetchOrders = useCallback(
        debounce(() => {
            if (isAuthenticated) {
                fetchOrders();
            }
        }, 300),
        [isAuthenticated, fetchOrders]
    );

    useEffect(() => {
        debouncedFetchOrders();

        // Cleanup function
        return () => {
            // Cancel any pending debounced calls
        };
    }, [debouncedFetchOrders]);

    return (
        <>
            <div className='flex items-center flex-col'>
                <h1 className='menu-title flex justify-center text-3xl'>Orders</h1>
                <h1 className='flex justify-center text-4xl font-bold mb-5'>Your Flavor Journey Continues!</h1>
            </div>
            <div className='flex flex-col min-h-[70vh] py-10 px-20'>
                <div className="min-h-[50vh]">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-pulse flex flex-col items-center">
                                <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
                                <div className="h-4 w-48 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center py-20">
                            <p className="text-xl text-red-500">Error loading orders: {error}</p>
                        </div>
                    ) : !isAuthenticated ? (
                        <div className="text-center py-10">
                            <p className="text-xl mb-4">Please log in to view your orders</p>
                            <Link to="/login" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
                                Log In
                            </Link>
                        </div>
                    ) : orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div key={index} className='mb-10 border-2 border-gray-200 rounded-2xl p-6 hover:shadow-md'>
                            <div className='flex justify-between items-center mb-4'>
                                <h2 className='text-xl font-semibold'>Order ID : #{order.id}</h2>
                                <span className={`text-sm px-3 py-1 rounded-full ${
                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                    'bg-green-100 text-green-800'
                                }`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                            </div>
                            <p className='text-sm text-gray-600 mb-4'>Placed on: {new Date(order.order_date).toLocaleString()}</p>

                            {/* Order Items */}
                            {order.items && order.items.length > 0 && (
                                <div className='mb-6'>
                                    <h3 className='text-md font-semibold mb-3'>Order Items:</h3>
                                    {order.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className='flex items-center gap-6 py-3 border-b border-gray-100'>
                                            <img src={item.image} className='w-16 h-16 rounded-full object-cover' alt={item.name} />
                                            <div className='flex-1'>
                                                <p className='text-sm font-semibold'>{item.name}</p>
                                                <p className='text-xs text-gray-500'>{item.description?.substring(0, 50)}...</p>
                                                <p className='text-xs text-gray-500'>Quantity: {item.quantity}</p>
                                            </div>
                                            <p className='text-sm font-medium'>${parseFloat(item.subtotal).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Order Summary */}
                            <div className='bg-gray-50 p-4 rounded-lg'>
                                <div className='flex justify-between text-md font-bold'>
                                    <span>Total:</span>
                                    <span>
                                        ${order.total ?
                                            parseFloat(order.total).toFixed(2) :
                                            (order.items && order.items.length > 0 ?
                                                order.items.reduce((sum, item) => sum + parseFloat(item.subtotal || 0), 0).toFixed(2) :
                                                '0.00')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-center'>
                        <h2 className='text-2xl mt-10'>No Orders Yet</h2>
                        <Link to='/menu' className='text-lg mt-2 underline hover:cursor-pointer inline-block'>
                            Start Shopping
                        </Link>
                    </div>
                )}
                </div>
            </div>
        </>
    );
};

export default OrderPage;