// src/Pages/Menupage.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Menupage.css'
import { Menu as MenuDataFromDB } from '../DB/menuDB';
import MenuItem from '../Components/Menu/MenuItem';
import wavy from '../assets/Icons/wavy.png';
// Note: We're now using the enhanced Menu.css.new and MenuItemFix.css.new files imported in MenuItem component

function Menupage() {
    // State to hold all valid items after processing menuDB.js
    const [allItems, setAllItems] = useState([]);
    // State for items filtered by category
    const [filteredItems, setFilteredItems] = useState([]);
    // State for category filter buttons
    const [categories, setCategories] = useState([]);
    // State for the currently selected category filter
    const [selectedCategory, setSelectedCategory] = useState('All');
    // State for loading animation
    const [isLoading, setIsLoading] = useState(true);
    // No longer managing active state at the parent level - each card is independent

    // Refs for animations
    const menuRef = useRef(null);
    const headerRef = useRef(null);
    const filtersRef = useRef(null);

    // Process the imported data ONCE when the component mounts
    useEffect(() => {
        // Simulate loading for smooth transition
        setTimeout(() => {
            setIsLoading(false);
        }, 800);

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

            // Add scroll animation observer
            setTimeout(() => {
                setupAnimations();
            }, 100);

        } catch (error) {
            console.error("Menupage Error: Failed processing menuDB.js data", error);
            // Reset state in case of error
            setAllItems([]);
            setFilteredItems([]);
            setCategories(['All']);
            setIsLoading(false);
        }
    }, []); // Empty dependency array means run only once on mount

    // Helper function to setup animations - can be called after filtering too
    const setupAnimations = () => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            },
            { threshold: 0.1 }
        );

        // Observe elements for animation
        if (headerRef.current) observer.observe(headerRef.current);
        if (filtersRef.current) observer.observe(filtersRef.current);
        if (menuRef.current) {
            const menuItems = menuRef.current.querySelectorAll('.menu-item-container');
            menuItems.forEach((item, index) => {
                // Add delay based on index for staggered animation
                item.style.transitionDelay = `${index * 0.05}s`;
                observer.observe(item);
            });
        }

        return observer;
    };

    // Handler for category filter button clicks
    const handleFilterChange = (category) => {
        setSelectedCategory(category);

        // Add animation class for transition
        if (menuRef.current) {
            menuRef.current.classList.add('fade-out');

            setTimeout(() => {
                // Always make a fresh copy of the array to ensure React detects the change
                if (category === 'All') {
                    setFilteredItems([...allItems]); // Show all valid items with a new array reference
                } else {
                    // Filter the processed items based on the selected category
                    setFilteredItems(allItems.filter(item => item.category === category));
                }

                menuRef.current.classList.remove('fade-out');
                menuRef.current.classList.add('fade-in');

                // Setup animations again after filtering
                setTimeout(() => {
                    setupAnimations();
                    menuRef.current.classList.remove('fade-in');
                }, 500);
            }, 300);
        } else {
            if (category === 'All') {
                setFilteredItems([...allItems]); // Show all valid items with a new array reference
            } else {
                // Filter the processed items based on the selected category
                setFilteredItems(allItems.filter(item => item.category === category));
            }
        }
    };

    // No longer handling item clicks at the parent level - each card is independent

    return (
        <div className="menu-page-container">
            {/* Loading overlay */}
            <div className={`loading-overlay ${isLoading ? 'active' : ''}`}>
                <div className="spinner">
                    <img src={wavy} alt="Loading" className="spinner-image" />
                </div>
            </div>

            {/* Menu content */}
            <div className={`menu-content ${isLoading ? '' : 'loaded'}`}>
                {/* Header section with parallax effect */}
                <div className="menu-header-container" ref={headerRef}>
                    <div className="menu-header-parallax">
                        <div className="menu-header-content">
                            <h1 className="menu-title">Our Menu</h1>
                        </div>
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="filter-container" ref={filtersRef}>
                    <div className="filter-wrapper">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => handleFilterChange(category)}
                                className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
                            >
                                <span>{category || 'Uncategorized'}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Item Grid */}
                <div className="menu-grid-container" ref={menuRef}>
                    {filteredItems.length > 0 ? (
                        <div className="menu-grid">
                            {filteredItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="menu-item-container"
                                >
                                    <MenuItem
                                        items={item}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-items-message">
                            <p>No menu items available {selectedCategory !== 'All' ? `for the category "${selectedCategory}"` : ''}.</p>
                            <button
                                onClick={() => handleFilterChange('All')}
                                className="back-button"
                            >
                                View All Menu
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Menupage;