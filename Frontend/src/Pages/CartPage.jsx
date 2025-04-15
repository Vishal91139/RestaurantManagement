import React, { useEffect, useState } from 'react';
import { useCart } from '../Context/CartContext';
import { useOrder } from '../Context/OrderContext';
import { useAuth } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './CartPage.css'
import PaymentModal from '../Components/Payment/PaymentModal';

const CartPage = () => {
    const { cartItems, loading, error, removeFromCart, updateQuantity, clearCart, refreshCart } = useCart();
    const { addOrder, loading: orderLoading, error: orderError } = useOrder();
    const { isAuthenticated } = useAuth();
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    // We don't need paymentSuccess state anymore as we're using orderSuccess
    const navigate = useNavigate();

    // Fetch cart items when the component mounts or when auth state changes
    useEffect(() => {
        if (isAuthenticated) {
            refreshCart();
        }
    }, [isAuthenticated, refreshCart]);

    const handleAddToOrder = async () => {
        if (cartItems.length > 0) {
            try {
                // Create order in backend
                const newOrderId = await addOrder(cartItems);

                if (newOrderId) {
                    setOrderId(newOrderId);
                    // Show payment modal instead of clearing cart immediately
                    setShowPaymentModal(true);
                }
            } catch (err) {
                console.error('Error during checkout:', err);
            }
        }
    };

    const handlePaymentSuccess = async () => {
        try {
            // Close payment modal
            setShowPaymentModal(false);

            // Clear cart after successful payment
            await clearCart();

            // Show success message
            setPaymentSuccess(true);
            setOrderSuccess(true);

            // Show success message for 2 seconds then redirect
            setTimeout(() => {
                navigate('/order');
            }, 2000);
        } catch (err) {
            console.error('Error after payment:', err);
        }
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Calculate additional charges
    const taxRate = 0.08; // 8% tax rate
    const tax = subtotal * taxRate;
    const deliveryFee = subtotal > 0 ? 2.99 : 0; // $2.99 delivery fee if cart is not empty
    const serviceFee = subtotal > 0 ? 1.50 : 0; // $1.50 service fee if cart is not empty

    // Calculate total price with all charges
    const totalPrice = subtotal + tax + deliveryFee + serviceFee;

    return (
        <>
            <div className="cart-page-container">
                <div className="cart-header">
                    <h1 className="cart-title fade-in">Your Cart</h1>
                    <h2 className="cart-subtitle slide-up">Your Journey to Flavor Begins Here!</h2>
                </div>

                {orderSuccess ? (
                    <div className="cart-success scale-in">
                        <div className="loading-spinner"></div>
                        <p className="cart-success-text">Payment successful!</p>
                        <p className="cart-success-order-id">Order ID: {orderId}</p>
                        <p className="cart-success-redirect">Redirecting to orders page...</p>
                    </div>
                ) : loading || orderLoading ? (
                    <div className="cart-loading fade-in">
                        <div className="loading-spinner"></div>
                        <p className="cart-loading-text">{orderLoading ? 'Processing your order...' : 'Loading your cart...'}</p>
                    </div>
                ) : error || orderError ? (
                    <div className="cart-error slide-up">
                        <p className="cart-error-text">Error: {orderError || error}</p>
                    </div>
                ) : (
                <div className="cart-content">
                    <div className="cart-items-section">
                        {!isAuthenticated ? (
                            <div className="auth-prompt slide-up">
                                <p className="auth-prompt-text">Please log in to view your cart</p>
                                <Link to="/login" className="auth-prompt-btn">
                                    Log In
                                </Link>
                            </div>
                        ) : cartItems.length ? (
                            <div className="cart-items-container">
                                {cartItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="cart-item slide-in-right"
                                        style={{animationDelay: `${index * 0.1}s`}}
                                    >
                                        <img src={item.image} className="cart-item-image" alt={item.name} />
                                        <div className="cart-item-details">
                                            <h3 className="cart-item-name">{item.name}</h3>
                                            <p className="cart-item-description">{item.description?.substring(0, 50)}...</p>
                                            <p className="cart-item-category">Category: {item.category}</p>
                                        </div>
                                        <div className="cart-quantity-controls">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="cart-quantity-btn"
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="cart-quantity">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="cart-quantity-btn"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="cart-item-price">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item)}
                                            className="cart-remove-btn"
                                            aria-label="Remove item"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-cart fade-in">
                                <h2 className="empty-cart-title">No Items in Cart</h2>
                                <Link to='/menu' className="empty-cart-link">
                                    Go to Menu
                                </Link>
                            </div>
                        )}
                    </div>
                    {/* Cart Summary Section */}
                    {cartItems.length > 0 && (
                        <div className="cart-summary-section">
                            <div className="cart-summary slide-in-left">
                                <h2 className="cart-summary-title">{totalItems} Item{totalItems !== 1 ? 's' : ''}</h2>

                                <div className="cart-summary-row">
                                    <span className="cart-summary-label">Subtotal</span>
                                    <span className="cart-summary-value">${parseFloat(subtotal || 0).toFixed(2)}</span>
                                </div>

                                <div className="cart-summary-row">
                                    <span className="cart-summary-label">Tax (8%)</span>
                                    <span className="cart-summary-value">${parseFloat(tax || 0).toFixed(2)}</span>
                                </div>

                                <div className="cart-summary-row">
                                    <span className="cart-summary-label">Delivery Fee</span>
                                    <span className="cart-summary-value">${parseFloat(deliveryFee || 0).toFixed(2)}</span>
                                </div>

                                <div className="cart-summary-row">
                                    <span className="cart-summary-label">Service Fee</span>
                                    <span className="cart-summary-value">${parseFloat(serviceFee || 0).toFixed(2)}</span>
                                </div>

                                <div className="cart-summary-divider"></div>

                                <div className="cart-summary-total">
                                    <span className="cart-summary-total-label">Total</span>
                                    <span className="cart-summary-total-value">${parseFloat(totalPrice || 0).toFixed(2)}</span>
                                </div>

                                <button
                                    onClick={handleAddToOrder}
                                    className="checkout-btn"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            </div>

            {/* Payment Modal */}
            <PaymentModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                orderId={orderId}
                amount={totalPrice}
                onPaymentSuccess={handlePaymentSuccess}
            />
        </>
    );
};

export default CartPage;