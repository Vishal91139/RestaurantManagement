// src/Components/Menu/MenuItem.jsx
import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext"; // Import useAuth hook
import { useCart } from "../../Context/CartContext"; // Import useCart hook

// Optional: Import CSS if needed
// import "./Menu.css";

// Assuming backend URL is needed if not using proxy
const BACKEND_URL = 'http://localhost:5001'; // Use this if you are NOT using a proxy

const MenuItem = ({ items }) => {
    const [rating, setRating] = useState(items?.rating || 4);
    // --- Get user object (which contains id) and token from context ---
    const { isAuthenticated, token, user } = useAuth(); // Add 'user' here
    // --- Get cart context for local state management ---
    const { addToCart: addToLocalCart } = useCart();
    // --- End change ---

    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleAddToCart = async () => {
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

        // --- Explicitly gather all data on frontend ---
        const userIdToSend = user.id; // Get userId from the authenticated user context
        const menuItemIdToSend = items.id; // Get menuItemId from the item prop
        const quantityToSend = 1; // Set quantity explicitly to 1
        // --- End gathering data ---

        setIsAdding(true); // Set loading state

        // --- Prepare the data object for the request body ---
        const dataToSend = {
            userId: userIdToSend,         // Include userId
            menuItemId: menuItemIdToSend, // Include menuItemId
            quantity: quantityToSend      // Include quantity
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
            addToLocalCart(items);

            // Show success message
            setSuccessMessage(data.message || `Added ${items.name} to cart!`);

            // Use a single timeout for the success message
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

            // Clean up the timeout if component unmounts
            return () => clearTimeout(timer);

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

    // Helper function to render stars (keep as before)
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

    // Image URL (keep as before)
    const imageUrl = items?.image || '/images/placeholder-food.png';
    console.log("Frontend: Image URL:", imageUrl);

    // Render JSX (keep as before)
    return (
        <div className="border rounded-lg shadow p-4 pt-6 flex flex-col items-center text-center transition duration-300 hover:shadow-lg relative overflow-hidden h-full min-h-[380px]">
            <p className="absolute top-2 right-2 bg-red-600 text-white font-bold px-2 py-1 rounded text-sm shadow z-10">
                ${items?.price ? parseFloat(items.price).toFixed(2) : '?.??'}
            </p>
            <div className="w-36 h-36 mb-3 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-full border bg-gray-100">
                <img className="w-full h-full object-cover" src={imageUrl} alt={items?.name || 'Menu item'}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/images/placeholder-food.png'; }}
                />
            </div>
            <h3 className="font-semibold mt-2 text-lg mb-1 flex-shrink-0">{items?.name || 'Unnamed Item'}</h3>
            <div className="mb-2 flex-shrink-0">{renderStars()}</div>
            <p className="text-sm text-gray-600 mb-3 flex-grow overflow-y-auto max-h-16">{items?.description || 'No description.'}</p>
            <div className="h-5 mb-1 flex-shrink-0 text-xs">
                {error && <p className="text-red-600">{error}</p>}
                {successMessage && <p className="text-green-600">{successMessage}</p>}
            </div>
            <button
                onClick={handleAddToCart}
                className={`w-full mt-auto px-4 py-2 rounded text-white font-semibold text-sm transition duration-200 flex-shrink-0 ${isAdding ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                disabled={isAdding || items?.id == null}
            >
                {isAdding ? "Adding..." : "Add to cart"}
            </button>
        </div>
    );
};

export default MenuItem;