import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartContext";
import "./Menu.css";
import "./MenuItemFix.css";

const BACKEND_URL = 'http://localhost:5001';

const MenuItem = ({ items }) => {
    const [isActive, setIsActive] = useState(false);
    const [rating, setRating] = useState(items?.rating || 4);
    const { isAuthenticated, token, user } = useAuth();
    const { addToCart: addToLocalCart, cartItems: cart, updateQuantity: updateCartQuantity } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [isInCart, setIsInCart] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(0);

    useEffect(() => {
        if (cart && cart.length > 0 && items) {
            const cartItem = cart.find(item =>
                (item.id === items.id) || (item.menu_id === items.id)
            );

            if (cartItem) {
                setIsInCart(true);
                setCartQuantity(cartItem.quantity || 1);
                setQuantity(cartItem.quantity || 1);
            } else {
                setIsInCart(false);
                setCartQuantity(0);
                setQuantity(1);
            }
        }
    }, [cart, items]);

    const handleAddToCart = async (e) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }

        if (isAdding) return;

        setError(null);
        setSuccessMessage('');

        if (!isAuthenticated || !user || !user.id) {
            alert("Please log in to add items to your cart.");
            console.error("Add to Cart Error: User not authenticated or user data missing.");
            return;
        }

        if (!items || items.id == null) {
            console.error("MenuItem Error: Invalid item data received (missing 'id'). Data:", items);
            setError("Item data error.");
            return;
        }

        const userIdToSend = user.id;
        const menuItemIdToSend = items.id;
        const quantityToSend = quantity;

        setIsAdding(true);

        const dataToSend = {
            userId: userIdToSend,
            menuItemId: menuItemIdToSend,
            quantity: quantityToSend
        };

        console.log("--- Frontend: Sending this data to /api/cart/add ---");
        console.log("Data object being sent:", dataToSend);
        console.log("Using token:", token ? `Bearer ${token.substring(0, 10)}...` : "No Token!");
        console.log("--------------------------------------------------");

        try {
            const response = await fetch(`${BACKEND_URL}/api/cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dataToSend),
            });
            console.log("Frontend: Received Raw Response:", response);

            const data = await response.json();
            console.log("Frontend: Parsed Response Data:", data);

            if (!response.ok) {
                throw new Error(data.message || `Error: ${response.status}`);
            }

            const itemWithQuantity = { ...items, quantity: quantityToSend };
            addToLocalCart(itemWithQuantity);

            setIsInCart(true);
            setCartQuantity(prev => prev + quantityToSend);

            setSuccessMessage(data.message || `Added ${items.name} to cart!`);

            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

        } catch (err) {
            console.error("Frontend: Add to Cart API Error:", err);
            setError(err.message || "Could not add item.");
        } finally {
            setTimeout(() => {
                setIsAdding(false);
            }, 300);
        }
    };

    const handleUpdateCart = async (e) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }

        if (isAdding) return;

        setError(null);
        setSuccessMessage('');

        if (!isAuthenticated || !user || !user.id) {
            alert("Please log in to update your cart.");
            console.error("Update Cart Error: User not authenticated or user data missing.");
            return;
        }

        if (!items || items.id == null) {
            console.error("MenuItem Error: Invalid item data received (missing 'id'). Data:", items);
            setError("Item data error.");
            return;
        }

        const cartItem = cart.find(item =>
            (item.id === items.id) || (item.menu_id === items.id)
        );

        if (!cartItem) {
            console.error("Update Cart Error: Item not found in cart");
            setError("Item not found in cart.");
            return;
        }

        const itemIdToUpdate = cartItem.id || cartItem.menu_id;

        setIsAdding(true);

        try {
            const quantityChange = quantity - cartItem.quantity;

            await updateCartQuantity(itemIdToUpdate, quantityChange);

            setCartQuantity(quantity);

            setSuccessMessage(`Updated ${items.name} quantity to ${quantity}!`);

            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

        } catch (err) {
            console.error("Frontend: Update Cart API Error:", err);
            setError(err.message || "Could not update item.");
        } finally {
            setTimeout(() => {
                setIsAdding(false);
            }, 300);
        }
    };

    const toggleActive = (e) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        if (!e.target.closest('button') &&
            !e.target.closest('.menu-item-quantity-controls') &&
            !e.target.closest('.menu-item-cart')) {
            setIsActive(prev => !prev);
        }
    };

    const increaseQuantity = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const renderStars = () => {
        const stars = [];
        const baseId = items?.id || `fallback-${Math.random().toString(36).substring(7)}`;
        for (let i = 5; i >= 1; i--) {
            const starId = `star${i}-${baseId}`;
            const starName = `rate-${baseId}`;
            stars.push(
                <React.Fragment key={starId}>
                    <input value={i} name={starName} id={starId} type="radio" checked={rating === i} readOnly disabled className="sr-only" />
                    <label htmlFor={starId} title={`${i} stars`} className={`cursor-default ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</label>
                </React.Fragment>
            );
        }
        return <div className="flex flex-row-reverse justify-center">{stars}</div>;
    };

    const imageUrl = items?.image || '/images/placeholder-food.png';

    return (
        <div
            className={`menu-item ${isActive ? 'active' : ''}`}
        >
            <div className="menu-item-price">
                <span>${items?.price ? parseFloat(items.price).toFixed(2) : '?.??'}</span>
            </div>

            <div className="menu-item-image-container">
                <div className="menu-item-image-wrapper">
                    <img
                        className="menu-item-image"
                        src={imageUrl}
                        alt={items?.name || 'Menu item'}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/images/placeholder-food.png'; }}
                    />
                </div>
            </div>

            <div className="menu-item-content">
                <h3 className="menu-item-title">{items?.name || 'Unnamed Item'}</h3>
                <div className="menu-item-rating">{renderStars()}</div>

                <div className="menu-item-description-container">
                    <p className="menu-item-description">{items?.description || 'No description.'}</p>
                </div>

                <div className="menu-item-status">
                    {error && <p className="menu-item-error">{error}</p>}
                    {successMessage && <p className="menu-item-success">{successMessage}</p>}
                </div>

                <div className="menu-item-cart">
                    {isInCart ? (
                        <div className="menu-item-cart-row">
                            <div className="menu-item-cart-controls">
                                <button
                                    className="menu-item-quantity-btn decrease"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.nativeEvent.stopImmediatePropagation();
                                        decreaseQuantity(e);
                                    }}
                                    disabled={quantity <= 1}
                                >
                                    <span>-</span>
                                </button>

                                <span className="menu-item-quantity">{quantity}</span>

                                <button
                                    className="menu-item-quantity-btn increase"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.nativeEvent.stopImmediatePropagation();
                                        increaseQuantity(e);
                                    }}
                                >
                                    <span>+</span>
                                </button>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.nativeEvent.stopImmediatePropagation();
                                    handleUpdateCart(e);
                                }}
                                className={`menu-item-update-btn ${isAdding ? 'disabled' : ''}`}
                                disabled={isAdding || items?.id == null}
                            >
                                {isAdding ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                e.nativeEvent.stopImmediatePropagation();
                                handleAddToCart(e);
                            }}
                            className={`menu-item-add-btn ${isAdding ? 'disabled' : ''}`}
                            disabled={isAdding || items?.id == null}
                        >
                            {isAdding ? 'Adding...' : 'Add to Cart'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuItem;