const express = require('express');
const {
    addToCart,
    getCart,
    updateCartItemQuantity,
    removeCartItem,
    clearCart
} = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/add', addToCart);
router.get('/', getCart);
router.put('/item/:cartItemId', updateCartItemQuantity);
router.delete('/item/:cartItemId', removeCartItem);
router.delete('/', clearCart);

module.exports = router;