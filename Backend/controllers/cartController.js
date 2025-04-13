const pool = require('../config/db');

exports.addToCart = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Authentication error: User not identified.' });
        }
        const userId = req.user.id;
        const menuItemId = req.body.menuItemId;
        const quantity = req.body.quantity || 1;

        if (!menuItemId) {
            return res.status(400).json({ message: 'Menu item ID is required.' });
        }

        const [menuItems] = await pool.query('SELECT id FROM menu WHERE id = ?', [menuItemId]);
        if (menuItems.length === 0) {
            return res.status(404).json({ message: `Menu item with ID ${menuItemId} not found.` });
        }

        const [existingItems] = await pool.query(
            'SELECT id, quantity FROM cart WHERE user_id = ? AND menu_id = ?',
            [userId, menuItemId]
        );

        if (existingItems.length > 0) {
            const cartItemId = existingItems[0].id;
            const newQuantity = existingItems[0].quantity + quantity;

            await pool.query(
                'UPDATE cart SET quantity = ? WHERE id = ?',
                [newQuantity, cartItemId]
            );

            return res.status(200).json({
                message: 'Item quantity updated in cart',
                cartItemId,
                newQuantity
            });
        } else {
            const [result] = await pool.query(
                'INSERT INTO cart (user_id, menu_id, quantity) VALUES (?, ?, ?)',
                [userId, menuItemId, quantity]
            );

            return res.status(201).json({
                message: 'Item added to cart',
                cartItemId: result.insertId,
                quantity
            });
        }
    } catch (err) {
        console.error("Error adding to cart:", err);

        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Conflict: Item possibly added simultaneously. Please refresh.' });
        }
        if (err.code === 'ER_NO_REFERENCED_ROW' || err.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ message: 'Cannot add item: Invalid user or menu item reference.' });
        }

        return res.status(500).json({ message: 'Failed to add item to cart', error: err.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const [cartItems] = await pool.query(
            `SELECT c.id, c.menu_id, c.quantity, m.name, m.price, m.image, m.description, m.category
            FROM cart c
            JOIN menu m ON c.menu_id = m.id
            WHERE c.user_id = ?`,
            [userId]
        );

        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        res.status(200).json({
            cartItems,
            totalItems,
            totalPrice
        });
    } catch (err) {
        console.error('Get Cart Error:', err);
        res.status(500).json({ message: 'Failed to retrieve cart', error: err.message });
    }
};

exports.updateCartItemQuantity = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const { quantity } = req.body;
        const userId = req.user.id;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }

        const [cartItem] = await pool.query(
            'SELECT id FROM cart WHERE id = ? AND user_id = ?',
            [cartItemId, userId]
        );

        if (cartItem.length === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        await pool.query(
            'UPDATE cart SET quantity = ? WHERE id = ?',
            [quantity, cartItemId]
        );

        res.status(200).json({
            message: 'Cart item quantity updated',
            cartItemId,
            newQuantity: quantity
        });
    } catch (err) {
        console.error('Update Cart Item Error:', err);
        res.status(500).json({ message: 'Failed to update cart item', error: err.message });
    }
};

exports.removeCartItem = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const userId = req.user.id;

        const [cartItem] = await pool.query(
            'SELECT id FROM cart WHERE id = ? AND user_id = ?',
            [cartItemId, userId]
        );

        if (cartItem.length === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        await pool.query(
            'DELETE FROM cart WHERE id = ?',
            [cartItemId]
        );

        res.status(200).json({
            message: 'Cart item removed',
            cartItemId
        });
    } catch (err) {
        console.error('Remove Cart Item Error:', err);
        res.status(500).json({ message: 'Failed to remove cart item', error: err.message });
    }
};

exports.clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const [result] = await pool.query(
            'DELETE FROM cart WHERE user_id = ?',
            [userId]
        );

        res.status(200).json({
            message: 'Cart cleared',
            itemsRemoved: result.affectedRows
        });
    } catch (err) {
        console.error('Clear Cart Error:', err);
        res.status(500).json({ message: 'Failed to clear cart', error: err.message });
    }
};