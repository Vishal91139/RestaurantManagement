// routes/reservationRoutes.js
const express = require('express');
const {
    getAvailableTables,
    getUserReservations,
    getReservationById,
    createReservation,
    updateReservation,
    cancelReservation
} = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/tables', getAvailableTables);

// Protected routes
router.use(authMiddleware);
router.get('/', getUserReservations);
router.get('/:id', getReservationById);
router.post('/', createReservation);
router.put('/:id', updateReservation);
router.delete('/:id', cancelReservation);

module.exports = router;
