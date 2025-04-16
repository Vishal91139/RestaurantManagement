// src/Components/Menu/MenuItem.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartContext";
import "./Menu.css";
import "./MenuItemFix.css"; // Import the fix CSS

// Assuming backend URL is needed if not using proxy
const BACKEND_URL = 'http://localhost:5001';

const MenuItem = ({ items }) => {
    // Local state for active status - completely independent
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

    // Check if item is already in cart
    useEffect(() => {
        if (cart && cart.length > 0 && items) {
            // Check for both id and menu_id to handle different formats
            const cartItem = cart.find(item =>
                (item.id === items.id) || (item.menu_id === items.id)
            );

            if (cartItem) {
                setIsInCart(true);
                setCartQuantity(cartItem.quantity || 1);
                // Initialize quantity state with cart quantity
                setQuantity(cartItem.quantity || 1);
            } else {
                setIsInCart(false);
                setCartQuantity(0);
                // Reset quantity to 1 when item is not in cart
                setQuantity(1);
            }
        }
    }, [cart, items]);

    // No longer syncing with parent's isActive prop - each card is independent

    const handleAddToCart = async (e) => {
        // Prevent event propagation
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }

        // Prevent multiple clicks while processing
        if (isAdding) return;

        setError(null);
        setSuccessMessage('');

        // Check 1: User must be logged in AND user object available
        if (!isAuthenticated || !user || !user.id) { // Also check for user and user.id
            alert("Please log in to add items to your cart.");
            console.error("Add to Cart Error: User not authenticated or user data missing.");
            return;
        }

        // Check 2: Item prop must exist and have an ID
        if (!items || items.id == null) {
            console.error("MenuItem Error: Invalid item data received (missing 'id'). Data:", items);
            setError("Item data error.");
            return;
        }

        // Gather data for API request
        const userIdToSend = user.id;
        const menuItemIdToSend = items.id;
        const quantityToSend = quantity;

        setIsAdding(true);

        // Prepare the data object for the request body
        const dataToSend = {
            userId: userIdToSend,
            menuItemId: menuItemIdToSend,
            quantity: quantityToSend
        };

        // --- CONSOLE LOG DATA BEFORE SENDING ---
        console.log("--- Frontend: Sending this data to /api/cart/add ---");
        console.log("Data object being sent:", dataToSend); // Log the full object
        console.log("Using token:", token ? `Bearer ${token.substring(0, 10)}...` : "No Token!");
        console.log("--------------------------------------------------");
        // --- END CONSOLE LOG ---

        try {
            // Make the API call
            // Choose ONE fetch line (Proxy or Full URL)
             const response = await fetch(`${BACKEND_URL}/api/cart/add`, { // Using Full URL
            // const response = await fetch("/api/cart/add", { // Using Proxy

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization header is STILL required for the backend middleware
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dataToSend), // Send the object with userId, menuItemId, quantity
            });
            console.log("Frontend: Received Raw Response:", response);


            const data = await response.json();
            console.log("Frontend: Parsed Response Data:", data);


            if (!response.ok) {
                throw new Error(data.message || `Error: ${response.status}`);
            }

            // Add to local cart state for immediate UI update
            const itemWithQuantity = { ...items, quantity: quantityToSend };
            addToLocalCart(itemWithQuantity);

            // Update local state
            setIsInCart(true);
            setCartQuantity(prev => prev + quantityToSend);

            // Show success message
            setSuccessMessage(data.message || `Added ${items.name} to cart!`);

            // Clear success message after delay
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

        } catch (err) {
            console.error("Frontend: Add to Cart API Error:", err);
            setError(err.message || "Could not add item.");
        } finally {
            // Small delay before allowing another click to prevent double-clicks
            setTimeout(() => {
                setIsAdding(false);
            }, 300);
        }
    };

    // Handle updating cart item quantity
    const handleUpdateCart = async (e) => {
        // Prevent event propagation
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }

        // Prevent multiple clicks while processing
        if (isAdding) return;

        setError(null);
        setSuccessMessage('');

        // Check 1: User must be logged in AND user object available
        if (!isAuthenticated || !user || !user.id) {
            alert("Please log in to update your cart.");
            console.error("Update Cart Error: User not authenticated or user data missing.");
            return;
        }

        // Check 2: Item prop must exist and have an ID
        if (!items || items.id == null) {
            console.error("MenuItem Error: Invalid item data received (missing 'id'). Data:", items);
            setError("Item data error.");
            return;
        }

        // Find the item in the cart (check both id and menu_id)
        const cartItem = cart.find(item =>
            (item.id === items.id) || (item.menu_id === items.id)
        );

        if (!cartItem) {
            console.error("Update Cart Error: Item not found in cart");
            setError("Item not found in cart.");
            return;
        }

        // Get the actual ID to use for the update (could be either id or menu_id)
        const itemIdToUpdate = cartItem.id || cartItem.menu_id;

        setIsAdding(true);

        try {
            // Calculate the change in quantity
            const quantityChange = quantity - cartItem.quantity;

            // Update the cart item quantity using the correct ID
            await updateCartQuantity(itemIdToUpdate, quantityChange);

            // Update local state
            setCartQuantity(quantity);

            // Show success message
            setSuccessMessage(`Updated ${items.name} quantity to ${quantity}!`);

            // Clear success message after delay
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

        } catch (err) {
            console.error("Frontend: Update Cart API Error:", err);
            setError(err.message || "Could not update item.");
        } finally {
            // Small delay before allowing another click to prevent double-clicks
            setTimeout(() => {
                setIsAdding(false);
            }, 300);
        }
    };

    // Toggle active state locally
    const toggleActive = (e) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        // Only toggle if not clicking on a button or control
        if (!e.target.closest('button') &&
            !e.target.closest('.menu-item-quantity-controls') &&
            !e.target.closest('.menu-item-cart')) {
            setIsActive(prev => !prev);
        }
    };

    // Quantity adjustment functions
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

    // Helper function to render stars
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

    // Image URL
    const imageUrl = items?.image || '/images/placeholder-food.png';

    return (
        <div
            className={`menu-item ${isActive ? 'active' : ''}`}
            // onClick={toggleActive}
        >
            {/* Price tag */}
            <div className="menu-item-price">
                <span>${items?.price ? parseFloat(items.price).toFixed(2) : '?.??'}</span>
            </div>

            {/* Image container with animation */}
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

            {/* Content section */}
            <div className="menu-item-content">
                <h3 className="menu-item-title">{items?.name || 'Unnamed Item'}</h3>
                <div className="menu-item-rating">{renderStars()}</div>

                {/* Description - shows more when active */}
                <div className="menu-item-description-container">
                    <p className="menu-item-description">{items?.description || 'No description.'}</p>
                </div>

                {/* Status messages */}
                <div className="menu-item-status">
                    {error && <p className="menu-item-error">{error}</p>}
                    {successMessage && <p className="menu-item-success">{successMessage}</p>}
                </div>

                {/* Cart section with quantity controls */}
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