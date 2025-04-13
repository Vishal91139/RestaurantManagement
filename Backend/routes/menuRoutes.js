// routes/menuRoutes.js
const express = require('express');
const { getAllMenuItems, getMenuItemById, addMenuItem /*, updateMenuItem, deleteMenuItem */ } = require('../controllers/menuController');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const router = express.Router();

router.get('/', getAllMenuItems);
router.get('/:id', getMenuItemById);

// Example Protected Route - apply authMiddleware
router.post('/', /* authMiddleware, */ addMenuItem); // Uncomment authMiddleware when ready
// router.put('/:id', authMiddleware, updateMenuItem);
// router.delete('/:id', authMiddleware, deleteMenuItem);

module.exports = router;