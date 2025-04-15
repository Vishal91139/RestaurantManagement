import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useOrder } from '../Context/OrderContext';
import { useAuth } from '../Context/AuthContext';
import { useCart } from '../Context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { debounce } from '../utils/debounce';
import { gsap } from 'gsap';
import './OrderPage.css';

const OrderPage = () => {
    const { orders, loading, error, fetchOrders } = useOrder();
    const { isAuthenticated, user, token } = useAuth();
    const { addToCart, clearCart, refreshCart } = useCart();
    const navigate = useNavigate();

    // State for reorder feedback
    const [reorderStatus, setReorderStatus] = useState({});
    const [reorderLoading, setReorderLoading] = useState({});

    // Create refs for GSAP animations
    const containerRef = useRef(null);
    const headerRef = useRef(null);
    const contentRef = useRef(null);
    const orderRefs = useRef([]);

    // State to track expanded orders
    const [expandedOrders, setExpandedOrders] = useState({});

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

    // Initialize GSAP animations when component mounts
    useEffect(() => {
        if (containerRef.current && headerRef.current && contentRef.current) {
            // Animate container
            gsap.fromTo(containerRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5 }
            );

            // Animate header
            gsap.fromTo(headerRef.current,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, delay: 0.2 }
            );

            // Animate content
            gsap.fromTo(contentRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, delay: 0.4 }
            );
        }

        // Animate order items if they exist
        if (orderRefs.current.length > 0) {
            gsap.fromTo(orderRefs.current,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    delay: 0.6
                }
            );
        }
    }, [loading, orders.length]);

    // Clear and reset refs when orders change
    useEffect(() => {
        orderRefs.current = [];
    }, [orders]);

    // Add items to orderRefs
    const addToRefs = (el) => {
        if (el && !orderRefs.current.includes(el)) {
            orderRefs.current.push(el);
        }
    };

    // Handle reorder functionality
    const handleReorder = async (orderId, items) => {
        if (!items || items.length === 0) return;

        // Set loading state for this specific order
        setReorderLoading(prev => ({ ...prev, [orderId]: true }));

        try {
            // Clear the current cart first
            await clearCart();

            const BACKEND_URL = 'http://localhost:5001';

            // Add each item from the order to the cart using direct API calls
            for (const item of items) {
                // Prepare the data for the API request
                const dataToSend = {
                    userId: user?.id,
                    menuItemId: item.menu_id || item.id,
                    quantity: item.quantity
                };

                // Make the API call to add item to cart
                const response = await fetch(`${BACKEND_URL}/api/cart/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(dataToSend),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Error: ${response.status}`);
                }

                // Also update local cart state
                addToCart({
                    id: item.menu_id || item.id,
                    name: item.name,
                    price: item.price || (item.subtotal / item.quantity),
                    image: item.image,
                    quantity: item.quantity
                });
            }

            // Refresh the cart to ensure it's up to date
            await refreshCart();

            // Show success message
            setReorderStatus(prev => ({ ...prev, [orderId]: 'success' }));

            // Navigate to cart page after a short delay
            setTimeout(() => {
                navigate('/cart');
            }, 1000);
        } catch (error) {
            console.error('Error reordering items:', error);
            setReorderStatus(prev => ({ ...prev, [orderId]: 'error' }));
        } finally {
            setReorderLoading(prev => ({ ...prev, [orderId]: false }));
        }
    };

    return (
        <div className="order-page-container" ref={containerRef}>
            {/* Header Section */}
            <div className="order-header" ref={headerRef}>
                <h1 className="order-title fade-in">Your Orders</h1>
                <h2 className="order-subtitle slide-up">Your Flavor Journey Continues!</h2>
            </div>

            {/* Main Content */}
            <div className="order-content" ref={contentRef}>
                {loading ? (
                    <div className="order-loading fade-in">
                        <div className="loading-spinner"></div>
                        <p className="order-loading-text">Loading your orders...</p>
                    </div>
                ) : error ? (
                    <div className="order-error slide-up">
                        <p className="order-error-text">Error loading orders: {error}</p>
                    </div>
                ) : !isAuthenticated ? (
                    <div className="auth-prompt slide-up">
                        <p className="auth-prompt-text">Please log in to view your orders</p>
                        <Link to="/login" className="auth-prompt-btn">
                            Log In
                        </Link>
                    </div>
                ) : orders.length > 0 ? (
                    <div className="order-list">
                        {orders.map((order, index) => (
                            <div
                                key={index}
                                className="order-card slide-in-right"
                                ref={addToRefs}
                                style={{animationDelay: `${index * 0.1}s`}}
                            >
                                <div className="order-card-header">
                                    <h3 className="order-id">Order #{order.id}</h3>
                                    <span className={`order-status order-status-${order.status}`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </div>

                                <div className="order-meta">
                                    <div className="order-meta-item order-date">
                                        <p className="order-date-value">{new Date(order.order_date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                    </div>
                                    <div className="order-meta-item">
                                        <p className="order-meta-label">Items</p>
                                        <p className="order-meta-value">{order.items?.length || 0}</p>
                                    </div>
                                    <div className="order-meta-item">
                                        <p className="order-meta-label">Status</p>
                                        <p className={`order-meta-value order-payment-status ${order.payment_status === 'paid' ? 'payment-paid' : ''}`}>
                                            {order.payment_status ? order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1) : 'Pending'}
                                        </p>
                                    </div>
                                </div>

                                {order.items && order.items.length > 0 && (
                                    <div className="order-items">
                                        <h4 className="order-items-title">Order Items</h4>
                                        {/* Show only first 2 items by default */}
                                        {React.Children.toArray(
                                            order.items.slice(0, expandedOrders[order.id] ? order.items.length : 2).map((item, itemIndex) => (
                                                <div key={itemIndex} className="order-item">
                                                    <img src={item.image} className="order-item-image" alt={item.name} />
                                                    <div className="order-item-details">
                                                        <h5 className="order-item-name">{item.name}</h5>
                                                        <p className="order-item-description">{item.description?.substring(0, 50)}...</p>
                                                        <span className="order-item-quantity">Qty: {item.quantity}</span>
                                                    </div>
                                                    <div className="order-item-price">
                                                        ${parseFloat(item.subtotal).toFixed(2)}
                                                    </div>
                                                </div>
                                            ))
                                        )}

                                        {/* Show View More/Less button if there are more than 2 items */}
                                        {order.items.length > 2 && (
                                            <button
                                                className="view-more-btn"
                                                onClick={() => {
                                                    setExpandedOrders(prev => ({
                                                        ...prev,
                                                        [order.id]: !prev[order.id]
                                                    }));
                                                }}
                                            >
                                                {expandedOrders[order.id] ? 'View Less' : `View ${order.items.length - 2} More Items`}
                                            </button>
                                        )}
                                    </div>
                                )}

                                <div className="order-summary">
                                    <div className="order-summary-row">
                                        <span className="order-summary-label">Total</span>
                                        <span className="order-summary-value">
                                            ${order.total ?
                                                parseFloat(order.total).toFixed(2) :
                                                (order.items && order.items.length > 0 ?
                                                    order.items.reduce((sum, item) => sum + parseFloat(item.subtotal || 0), 0).toFixed(2) :
                                                    '0.00')}
                                        </span>
                                    </div>
                                </div>

                                <div className="order-actions">
                                    <button className="order-action-btn order-track-btn">
                                        Track Order
                                    </button>
                                    <button
                                        className={`order-action-btn order-reorder-btn ${reorderStatus[order.id] === 'success' ? 'reorder-success' : reorderStatus[order.id] === 'error' ? 'reorder-error' : ''}`}
                                        onClick={() => handleReorder(order.id, order.items)}
                                        disabled={reorderLoading[order.id]}
                                    >
                                        {reorderLoading[order.id] ? (
                                            <span className="reorder-loading">Adding to Cart...</span>
                                        ) : reorderStatus[order.id] === 'success' ? (
                                            <span className="reorder-success-text">Added to Cart ✓</span>
                                        ) : reorderStatus[order.id] === 'error' ? (
                                            <span className="reorder-error-text">Failed to Add</span>
                                        ) : (
                                            <span>Reorder</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-orders fade-in">
                        <h2 className="empty-orders-title">No Orders Yet</h2>
                        <p>You haven't placed any orders yet. Start exploring our delicious menu!</p>
                        <Link to='/menu' className="empty-orders-link">
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderPage;