import React, { useState, useEffect, useRef } from 'react';
import './Menupage.css'
import { Menu as MenuDataFromDB } from '../DB/menuDB';
import MenuItem from '../Components/Menu/MenuItem';
import wavy from '../assets/Icons/wavy.png';

function Menupage() {
    const [allItems, setAllItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(true);

    const menuRef = useRef(null);
    const headerRef = useRef(null);
    const filtersRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 800);

        try {
            if (!Array.isArray(MenuDataFromDB)) {
                console.error("Menupage Error: Imported data from menuDB.js is not an array.");
                throw new Error("Menu data is not structured correctly.");
            }

            const processedItems = [];
            const categoriesFound = new Set();

            MenuDataFromDB.forEach((section, sectionIndex) => {
                if (section && Array.isArray(section.items)) {
                    section.items.forEach((item, itemIndex) => {
                        if (item && item.id != null) {
                            const category = item.category || section.section_name || 'Uncategorized';
                             if (category && category !== 'All') {
                                categoriesFound.add(category);
                            }
                            processedItems.push({ ...item, category: category });
                        } else {
                            console.warn(`Menupage: Skipping item at section index ${sectionIndex}, item index ${itemIndex} due to missing 'id'. Item:`, item);
                        }
                    });
                } else {
                     console.warn(`Menupage: Skipping section index ${sectionIndex} ('${section?.section_name}') because 'items' is not a valid array.`);
                }
            });

            setAllItems(processedItems);
            setFilteredItems(processedItems);
            setCategories(['All', ...Array.from(categoriesFound).sort()]);

            setTimeout(() => {
                setupAnimations();
            }, 100);

        } catch (error) {
            console.error("Menupage Error: Failed processing menuDB.js data", error);
            setAllItems([]);
            setFilteredItems([]);
            setCategories(['All']);
            setIsLoading(false);
        }
    }, []);

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

        if (headerRef.current) observer.observe(headerRef.current);
        if (filtersRef.current) observer.observe(filtersRef.current);
        if (menuRef.current) {
            const menuItems = menuRef.current.querySelectorAll('.menu-item-container');
            menuItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.05}s`;
                observer.observe(item);
            });
        }

        return observer;
    };

    const handleFilterChange = (category) => {
        setSelectedCategory(category);

        if (menuRef.current) {
            menuRef.current.classList.add('fade-out');

            setTimeout(() => {
                if (category === 'All') {
                    setFilteredItems([...allItems]);
                } else {
                    setFilteredItems(allItems.filter(item => item.category === category));
                }

                menuRef.current.classList.remove('fade-out');
                menuRef.current.classList.add('fade-in');

                setTimeout(() => {
                    setupAnimations();
                    menuRef.current.classList.remove('fade-in');
                }, 500);
            }, 300);
        } else {
            if (category === 'All') {
                setFilteredItems([...allItems]);
            } else {
                setFilteredItems(allItems.filter(item => item.category === category));
            }
        }
    };

    return (
        <div className="menu-page-container">
            <div className={`loading-overlay ${isLoading ? 'active' : ''}`}>
                <div className="spinner">
                    <img src={wavy} alt="Loading" className="spinner-image" />
                </div>
            </div>

            <div className={`menu-content ${isLoading ? '' : 'loaded'}`}>
                <div className="menu-header-container" ref={headerRef}>
                    <div className="menu-header-parallax">
                        <div className="menu-header-content">
                            <h1 className="menu-title">Our Menu</h1>
                        </div>
                    </div>
                </div>

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