const pool = require('../config/db');

exports.createOrder = async (req, res) => {
    const userId = req.user.id;
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Order items are required and must be an array.' });
    }

    let connection;

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [orderResult] = await connection.query(
            'INSERT INTO orders (user_id, status) VALUES (?, ?)',
            [userId, 'pending']
        );
        const orderId = orderResult.insertId;

        let calculatedTotal = 0;
        const itemInsertPromises = [];

        for (const item of items) {
            if (!item.menu_id || !item.quantity || item.quantity <= 0) {
                throw new Error(`Invalid item data: ${JSON.stringify(item)}`);
            }

            const [menuItems] = await connection.query(
                'SELECT price FROM menu WHERE id = ? FOR UPDATE',
                [item.menu_id]
            );

            if (menuItems.length === 0) {
                throw new Error(`Menu item with ID ${item.menu_id} not found.`);
            }

            const menuItemPrice = parseFloat(menuItems[0].price);
            if (isNaN(menuItemPrice)) {
                 throw new Error(`Invalid price for menu item ID ${item.menu_id}.`);
            }

            const itemTotal = menuItemPrice * item.quantity;
            calculatedTotal += itemTotal;

            itemInsertPromises.push(
                connection.query(
                    'INSERT INTO order_items (order_id, menu_id, quantity, price) VALUES (?, ?, ?, ?)',
                    [orderId, item.menu_id, item.quantity, itemTotal]
                )
            );
        }

        await Promise.all(itemInsertPromises);

        const formattedTotal = parseFloat(calculatedTotal.toFixed(2));
        await connection.query(
            'UPDATE orders SET total = ? WHERE id = ?',
            [formattedTotal, orderId]
        );

        await connection.commit();

        res.status(201).json({ message: 'Order created successfully', orderId: orderId, total: formattedTotal });

    } catch (err) {
        if (connection) {
            await connection.rollback();
        }
        console.error('Create Order Error:', err);
        res.status(500).json({ message: 'Failed to create order', error: err.message });
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

exports.getMyOrders = async (req, res) => {
    const userId = req.user.id;
    try {
        const [orders] = await pool.query(
            'SELECT id, order_date, status, total FROM orders WHERE user_id = ? ORDER BY order_date DESC',
            [userId]
        );

        if (orders.length === 0) {
            return res.json(orders);
        }

        const ordersWithItems = await Promise.all(orders.map(async (order) => {
            const [items] = await pool.query(
                `SELECT oi.id, oi.menu_id, oi.quantity, oi.price,
                m.name, m.description, m.image, m.category,
                (oi.quantity * oi.price) as subtotal
                FROM order_items oi
                JOIN menu m ON oi.menu_id = m.id
                WHERE oi.order_id = ?`,
                [order.id]
            );

            // Calculate total from items if needed
            const calculatedTotal = items.reduce((sum, item) => sum + parseFloat(item.subtotal || 0), 0);
            const orderTotal = parseFloat(order.total) || calculatedTotal;

            return {
                ...order,
                items: items,
                total: orderTotal
            };
        }));

        res.json(ordersWithItems);
    } catch (err) {
        console.error('Get My Orders Error:', err);
        res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    const orderId = req.params.id;
    const userId = req.user.id;

    try {
        const [orders] = await pool.query(
            'SELECT * FROM orders WHERE id = ?',
            [orderId]
        );

        if (orders.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const order = orders[0];

        if (order.user_id !== userId) {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to view this order' });
        }

        const [items] = await pool.query(
             `SELECT oi.id, oi.menu_id, oi.quantity, oi.price,
              m.name, m.description, m.image, m.category,
              (oi.quantity * oi.price) as subtotal
              FROM order_items oi
              JOIN menu m ON oi.menu_id = m.id
              WHERE oi.order_id = ?`,
            [orderId]
        );

        // Calculate total from items if needed
        const calculatedTotal = items.reduce((sum, item) => sum + parseFloat(item.subtotal || 0), 0);
        const orderTotal = parseFloat(order.total) || calculatedTotal;

        const orderDetails = {
            ...order,
            items: items,
            total: orderTotal
        };

        res.json(orderDetails);

    } catch (err) {
        console.error('Get Order By ID Error:', err);
        res.status(500).json({ message: 'Failed to fetch order details', error: err.message });
    }
};


// --- Placeholder for Admin/Staff functions (implement if needed) ---
/*
exports.getAllOrders = async (req, res) => {
    // Add authorization check for admin role
    try {
        // ... query logic ...
        res.json(allOrders);
    } catch (err) {
         // ... error handling ...
    }
};

exports.updateOrderStatus = async (req, res) => {
     // Add authorization check for admin/staff role
    const { status } = req.body;
    const orderId = req.params.id;
    // Add validation for allowed statuses ('pending', 'processing', 'completed', 'cancelled')
    try {
        // ... update logic ...
        res.json({ message: 'Order status updated' });
    } catch (err) {
        // ... error handling ...
    }
};
*/