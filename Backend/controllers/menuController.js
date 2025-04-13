// controllers/menuController.js
const pool = require('../config/db');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
exports.getAllMenuItems = async (req, res) => {
    try {
        const [items] = await pool.query('SELECT id, name, description, price, image, category FROM menu ORDER BY category, name');
        res.json(items);
    } catch (err) {
        console.error('Get Menu Error:', err);
        res.status(500).json({ message: 'Server error fetching menu', error: err.message });
    }
};

// @desc    Get single menu item by ID
// @route   GET /api/menu/:id
// @access  Public
exports.getMenuItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const [items] = await pool.query('SELECT * FROM menu WHERE id = ?', [id]);
        if (items.length === 0) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(items[0]);
    } catch (err) {
        console.error('Get Menu Item Error:', err);
        res.status(500).json({ message: 'Server error fetching menu item', error: err.message });
    }
};

// --- Add more functions for POST, PUT, DELETE (likely protected) ---
// Example: Add Item (Needs Admin Role check in real app)
// @desc    Add a new menu item
// @route   POST /api/menu
// @access  Private (Admin Only - requires authMiddleware + role check)
exports.addMenuItem = async (req, res) => {
    // Add role checking logic here if implementing roles
    // if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

    const { name, description, price, image, category } = req.body;
    if (!name || !price) {
        return res.status(400).json({ message: 'Name and price are required' });
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO menu (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)',
            [name, description, price, image, category]
        );
        res.status(201).json({ message: 'Menu item added', id: result.insertId });
    } catch (err) {
        console.error('Add Menu Item Error:', err);
        res.status(500).json({ message: 'Server error adding menu item', error: err.message });
    }
};

// Add PUT (update) and DELETE functions similarly...