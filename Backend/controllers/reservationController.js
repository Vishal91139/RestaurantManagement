// controllers/reservationController.js
const pool = require('../config/db');

// @desc    Get all available tables
// @route   GET /api/reservations/tables
// @access  Public
exports.getAvailableTables = async (req, res) => {
    try {
        // Get date and time from query params or use current date/time
        const requestedDate = req.query.date || new Date().toISOString().split('T')[0];
        const requestedTime = req.query.time || new Date().toTimeString().split(' ')[0].substring(0, 5);

        // Define the available tables (could be moved to a configuration file)
        const availableTables = [
            { table_number: 1, capacity: 2 },
            { table_number: 2, capacity: 2 },
            { table_number: 3, capacity: 4 },
            { table_number: 4, capacity: 4 },
            { table_number: 5, capacity: 6 },
            { table_number: 6, capacity: 6 },
            { table_number: 7, capacity: 8 },
            { table_number: 8, capacity: 8 }
        ];

        let reservedTables = {};

        try {
            // Check if the reservations table exists
            const [tables] = await pool.query(
                `SELECT TABLE_NAME
                 FROM information_schema.TABLES
                 WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'reservations'`
            );

            // If the reservations table exists, query it
            if (tables.length > 0) {
                // Get reservations for the requested date and time
                const [reservations] = await pool.query(
                    `SELECT table_number, status FROM reservations
                     WHERE date = ? AND time = ?`,
                    [requestedDate, requestedTime]
                );

                // Map reservations to table numbers
                reservedTables = reservations.reduce((acc, reservation) => {
                    acc[reservation.table_number] = reservation.status;
                    return acc;
                }, {});
            } else {
                console.log('Reservations table does not exist yet. Returning all tables as available.');
            }
        } catch (err) {
            console.error('Error checking reservations:', err);
            // Continue with empty reservedTables if there's an error
        }

        // Combine available tables with reservation status
        const tables = availableTables.map(table => ({
            ...table,
            status: reservedTables[table.table_number] || 'available'
        }));

        res.json(tables);
    } catch (err) {
        console.error('Get Available Tables Error:', err);
        res.status(500).json({ message: 'Server error fetching available tables', error: err.message });
    }
};

// @desc    Get user's reservations
// @route   GET /api/reservations
// @access  Private
exports.getUserReservations = async (req, res) => {
    try {
        const userId = req.user.id;

        try {
            // Check if the reservations table exists
            const [tables] = await pool.query(
                `SELECT TABLE_NAME
                 FROM information_schema.TABLES
                 WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'reservations'`
            );

            // If the reservations table exists, query it
            if (tables.length > 0) {
                const [reservations] = await pool.query(
                    `SELECT id, table_number, capacity, date, time, status, created_at
                     FROM reservations
                     WHERE user_id = ?
                     ORDER BY date ASC, time ASC`,
                    [userId]
                );

                res.json(reservations);
            } else {
                console.log('Reservations table does not exist yet. Returning empty array.');
                res.json([]);
            }
        } catch (err) {
            console.error('Error checking reservations table:', err);
            res.json([]);
        }
    } catch (err) {
        console.error('Get User Reservations Error:', err);
        res.status(500).json({ message: 'Server error fetching reservations', error: err.message });
    }
};

// @desc    Get reservation by ID
// @route   GET /api/reservations/:id
// @access  Private
exports.getReservationById = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const userId = req.user.id;

        const [reservations] = await pool.query(
            `SELECT id, user_id, table_number, capacity, date, time, status, created_at
             FROM reservations
             WHERE id = ?`,
            [reservationId]
        );

        if (reservations.length === 0) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        const reservation = reservations[0];

        // Check if the reservation belongs to the user
        if (reservation.user_id !== userId) {
            return res.status(403).json({ message: 'Unauthorized: This reservation does not belong to you' });
        }

        res.json(reservation);
    } catch (err) {
        console.error('Get Reservation By ID Error:', err);
        res.status(500).json({ message: 'Server error fetching reservation', error: err.message });
    }
};

// @desc    Create a new reservation
// @route   POST /api/reservations
// @access  Private
exports.createReservation = async (req, res) => {
    try {
        const userId = req.user.id;
        const { table_number, capacity, date, time } = req.body;

        // Validate input
        if (!table_number || !capacity || !date || !time) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            // Check if the reservations table exists
            const [tables] = await pool.query(
                `SELECT TABLE_NAME
                 FROM information_schema.TABLES
                 WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'reservations'`
            );

            // If the reservations table doesn't exist, create it
            if (tables.length === 0) {
                console.log('Reservations table does not exist. Creating it...');
                await pool.query(`
                    CREATE TABLE IF NOT EXISTS reservations (
                      id INT NOT NULL AUTO_INCREMENT,
                      user_id INT NOT NULL,
                      table_number INT NOT NULL,
                      capacity INT NOT NULL,
                      date DATE NOT NULL,
                      time TIME NOT NULL,
                      status ENUM('available', 'reserved', 'occupied') DEFAULT 'available',
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      PRIMARY KEY (id),
                      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
                `);
                console.log('Reservations table created successfully.');
            }

            // Check if the table is already reserved for the given date and time
            const [existingReservations] = await pool.query(
                `SELECT id FROM reservations
                 WHERE table_number = ? AND date = ? AND time = ? AND status IN ('reserved', 'occupied')`,
                [table_number, date, time]
            );

            if (existingReservations.length > 0) {
                return res.status(400).json({ message: 'This table is already reserved for the selected date and time' });
            }

            // Create the reservation
            const [result] = await pool.query(
                `INSERT INTO reservations (user_id, table_number, capacity, date, time, status)
                 VALUES (?, ?, ?, ?, ?, 'reserved')`,
                [userId, table_number, capacity, date, time]
            );

            res.status(201).json({
                message: 'Reservation created successfully',
                reservationId: result.insertId
            });
        } catch (err) {
            console.error('Error with reservations table:', err);
            res.status(500).json({ message: 'Error with reservations table', error: err.message });
        }
    } catch (err) {
        console.error('Create Reservation Error:', err);
        res.status(500).json({ message: 'Server error creating reservation', error: err.message });
    }
};

// @desc    Update a reservation
// @route   PUT /api/reservations/:id
// @access  Private
exports.updateReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const userId = req.user.id;
        const { table_number, capacity, date, time, status } = req.body;

        // Validate input
        if (!table_number || !capacity || !date || !time) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the reservation exists and belongs to the user
        const [reservations] = await pool.query(
            `SELECT id, user_id FROM reservations WHERE id = ?`,
            [reservationId]
        );

        if (reservations.length === 0) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        if (reservations[0].user_id !== userId) {
            return res.status(403).json({ message: 'Unauthorized: This reservation does not belong to you' });
        }

        // If changing date/time/table, check if the new table is available
        if (table_number || date || time) {
            const newTableNumber = table_number;
            const newDate = date;
            const newTime = time;

            const [existingReservations] = await pool.query(
                `SELECT id FROM reservations
                 WHERE table_number = ? AND date = ? AND time = ? AND status IN ('reserved', 'occupied') AND id != ?`,
                [newTableNumber, newDate, newTime, reservationId]
            );

            if (existingReservations.length > 0) {
                return res.status(400).json({ message: 'This table is already reserved for the selected date and time' });
            }
        }

        // Update the reservation
        await pool.query(
            `UPDATE reservations
             SET table_number = ?, capacity = ?, date = ?, time = ?, status = ?
             WHERE id = ?`,
            [table_number, capacity, date, time, status || 'reserved', reservationId]
        );

        res.json({ message: 'Reservation updated successfully' });
    } catch (err) {
        console.error('Update Reservation Error:', err);
        res.status(500).json({ message: 'Server error updating reservation', error: err.message });
    }
};

// @desc    Cancel a reservation
// @route   DELETE /api/reservations/:id
// @access  Private
exports.cancelReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const userId = req.user.id;

        // Check if the reservation exists and belongs to the user
        const [reservations] = await pool.query(
            `SELECT id, user_id FROM reservations WHERE id = ?`,
            [reservationId]
        );

        if (reservations.length === 0) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        if (reservations[0].user_id !== userId) {
            return res.status(403).json({ message: 'Unauthorized: This reservation does not belong to you' });
        }

        // Delete the reservation
        await pool.query(
            `DELETE FROM reservations WHERE id = ?`,
            [reservationId]
        );

        res.json({ message: 'Reservation cancelled successfully' });
    } catch (err) {
        console.error('Cancel Reservation Error:', err);
        res.status(500).json({ message: 'Server error cancelling reservation', error: err.message });
    }
};
