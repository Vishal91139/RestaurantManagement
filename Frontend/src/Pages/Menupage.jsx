// src/Pages/Menupage.jsx
import React, { useState, useEffect } from 'react';
// --- IMPORT the 'Menu' array from your local file ---
import { Menu as MenuDataFromDB } from '../DB/menuDB'; // ** ADJUST PATH TO menuDB.js FILE **
                                                       // Renamed import variable slightly to avoid confusion
import MenuItem from '../Components/Menu/MenuItem';    // ** Adjust path if needed **

function Menupage() {
    // State to hold all valid items after processing menuDB.js
    const [allItems, setAllItems] = useState([]);
    // State for items filtered by category
    const [filteredItems, setFilteredItems] = useState([]);
    // State for category filter buttons
    const [categories, setCategories] = useState([]);
    // State for the currently selected category filter
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Process the imported data ONCE when the component mounts
    useEffect(() => {
        console.log("--- Menupage: Processing data from menuDB.js ---");
        try {
            // Validate top-level structure
            if (!Array.isArray(MenuDataFromDB)) {
                console.error("Menupage Error: Imported data from menuDB.js is not an array.");
                throw new Error("Menu data is not structured correctly.");
            }

            const processedItems = [];
            const categoriesFound = new Set();

            // Loop through each section in the imported data
            MenuDataFromDB.forEach((section, sectionIndex) => {
                // Check if the section object and its 'items' array are valid
                if (section && Array.isArray(section.items)) {
                    // Loop through each item within the section
                    section.items.forEach((item, itemIndex) => {
                        // **CRITICAL VALIDATION: Check if item exists and has an ID**
                        if (item && item.id != null) {
                            // Assign category, defaulting to section_name if item.category missing
                            const category = item.category || section.section_name || 'Uncategorized';
                             if (category && category !== 'All') {
                                categoriesFound.add(category);
                            }
                            // Add the valid item (including its ID and category) to our list
                            processedItems.push({ ...item, category: category });
                        } else {
                            // Log items that are skipped due to missing ID
                            console.warn(`Menupage: Skipping item at section index ${sectionIndex}, item index ${itemIndex} due to missing 'id'. Item:`, item);
                        }
                    });
                } else {
                     console.warn(`Menupage: Skipping section index ${sectionIndex} ('${section?.section_name}') because 'items' is not a valid array.`);
                }
            });

            console.log("Menupage: Finished processing. Valid items found:", processedItems);

            // Update state with the processed data
            setAllItems(processedItems);
            setFilteredItems(processedItems); // Show all valid items initially
            setCategories(['All', ...Array.from(categoriesFound).sort()]); // Set categories for filters

        } catch (error) {
            console.error("Menupage Error: Failed processing menuDB.js data", error);
            // Reset state in case of error
            setAllItems([]);
            setFilteredItems([]);
            setCategories(['All']);
            // You could add a user-facing error message here if needed
            // setError("Failed to load menu data.");
        }
    }, []); // Empty dependency array means run only once on mount

    // Handler for category filter button clicks
    const handleFilterChange = (category) => {
        setSelectedCategory(category);
        if (category === 'All') {
            setFilteredItems(allItems); // Show all valid items
        } else {
            // Filter the processed items based on the selected category
            setFilteredItems(allItems.filter(item => item.category === category));
        }
    };

    // --- Render component UI ---
    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">Our Menu</h1>

            {/* Filter Buttons */}
            <div className="flex justify-center flex-wrap gap-2 mb-10">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => handleFilterChange(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 ease-in-out shadow-sm hover:shadow-md ${selectedCategory === category ? 'bg-indigo-600 text-white ring-2 ring-indigo-300 ring-offset-1' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        {category || 'Uncategorized'}
                    </button>
                ))}
            </div>

            {/* Menu Item Grid */}
            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Map over the filteredItems state */}
                    {filteredItems.map((item) => (
                        // Pass the unique ID (from modified menuDB.js) as key
                        // Pass the full item object (now including ID) as the 'items' prop
                        <MenuItem key={item.id} items={item} />
                    ))}
                </div>
            ) : (
                // Message if no items are available after filtering or processing
                 <p className="text-center text-gray-500 mt-10">
                    No menu items available {selectedCategory !== 'All' ? `for the category "${selectedCategory}"` : ''}. Check data source.
                </p>
            )}
        </div>
    );
}

export default Menupage;