import React from 'react';
import { useOrder } from '../Context/OrderContext';
import { Link } from 'react-router-dom';

const OrderPage = () => {
    const { orders } = useOrder();

    return (
        <>
            <div className='flex items-center flex-col'>
                <h1 className='menu-title flex justify-center text-3xl'>Orders</h1>
                <h1 className='flex justify-center text-4xl font-bold mb-5'>Your Flavor Journey Continues!</h1>
            </div>
            <div className='flex flex-col min-h-[100vh] py-10 px-20'>
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div key={index} className='mb-10 border-2 border-gray-200 rounded-2xl p-6 hover:shadow-md'>
                            <div className='flex justify-between items-center mb-4'>
                                <h2 className='text-xl font-semibold'>Order ID : #{order.orderId}</h2>
                                <span className={`text-sm px-3 py-1 rounded-full ${
                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                    'bg-green-100 text-green-800'
                                }`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                            </div>
                            <p className='text-sm text-gray-600 mb-4'>Placed on: {new Date(order.orderDate).toLocaleString()}</p>
                            
                            {/* Order Items */}
                            <div className='mb-6'>
                                {order.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className='flex items-center gap-6 py-3 border-b border-gray-100'>
                                        <img src={item.image} className='w-16 h-16 rounded-full object-cover' alt={item.name} />
                                        <div className='flex-1'>
                                            <p className='text-sm font-semibold'>{item.name}</p>
                                            <p className='text-xs text-gray-500'>Quantity: {item.quantity}</p>
                                        </div>
                                        <p className='text-sm font-medium'>${item.subtotal.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className='bg-gray-50 p-4 rounded-lg'>
                                <div className='flex justify-between text-sm mb-2'>
                                    <span>Subtotal:</span>
                                    <span>${order.subtotal}</span>
                                </div>
                                <div className='flex justify-between text-sm mb-2'>
                                    <span>Tax:</span>
                                    <span>${order.tax}</span>
                                </div>
                                <div className='flex justify-between text-sm font-bold'>
                                    <span>Total:</span>
                                    <span>${order.total}</span>
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
        </>
    );
};

export default OrderPage;