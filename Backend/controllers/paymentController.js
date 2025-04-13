// controllers/paymentController.js
const pool = require('../config/db');
// IMPORTANT NOTE: Real encryption requires careful key management and standard libraries.
// Node's built-in crypto is powerful but needs proper implementation.
// This example is OVERLY SIMPLIFIED and NOT SECURE FOR PRODUCTION.
// const crypto = require('crypto');
// const ENCRYPTION_KEY = process.env.PAYMENT_ENCRYPTION_KEY; // Must be set in .env, 32 bytes for AES-256
// const IV_LENGTH = 16; // For AES, this is always 16

// // --- VERY BASIC Encryption Example (NOT PRODUCTION READY) ---
// function encrypt(text) {
//     if (!ENCRYPTION_KEY) {
//          console.error("FATAL: PAYMENT_ENCRYPTION_KEY is not set.");
//          throw new Error("Server configuration error for payment processing.");
//     }
//     try{
//         let iv = crypto.randomBytes(IV_LENGTH);
//         let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
//         let encrypted = cipher.update(text);
//         encrypted = Buffer.concat([encrypted, cipher.final()]);
//         return iv.toString('hex') + ':' + encrypted.toString('hex'); // Store IV with ciphertext
//     } catch (error) {
//         console.error("Encryption failed:", error);
//         throw new Error("Failed to secure payment data.");
//     }
// }

// // --- Basic Decryption Example (Needed if you ever display parts of it) ---
// function decrypt(text) {
//      if (!ENCRYPTION_KEY) {
//          console.error("FATAL: PAYMENT_ENCRYPTION_KEY is not set.");
//          throw new Error("Server configuration error for payment processing.");
//     }
//     try {
//         let textParts = text.split(':');
//         let iv = Buffer.from(textParts.shift(), 'hex');
//         let encryptedText = Buffer.from(textParts.join(':'), 'hex');
//         let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
//         let decrypted = decipher.update(encryptedText);
//         decrypted = Buffer.concat([decrypted, decipher.final()]);
//         return decrypted.toString();
//     } catch (error) {
//         console.error("Decryption failed:", error);
//         throw new Error("Failed to process secured payment data.");
//     }
// }
// // --- End Encryption/Decryption Example ---


// @desc    Record a payment attempt
// @route   POST /api/payments
// @access  Private
exports.createPayment = async (req, res) => {

    // !!!!!!!!!! SECURITY WARNING !!!!!!!!!!!!!!
    // STORING RAW OR SIMPLY ENCRYPTED CARD DATA IS EXTREMELY RISKY AND LIKELY
    // VIOLATES PCI DSS COMPLIANCE. USE A PAYMENT GATEWAY IN PRODUCTION.
    // THIS IMPLEMENTATION IS FOR DEMONSTRATION BASED ON YOUR SCHEMA ONLY.
    // The CVV should *NEVER* be stored after authorization.
    // The card number should be tokenized or heavily encrypted by a secure system.
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const { order_id, cardholder_name, card_number, expiry_date, cvv, amount } = req.body;
    const userId = req.user.id; // From authMiddleware

    // Basic Validation
    if (!order_id || !cardholder_name || !card_number || !expiry_date || !cvv || !amount) {
        return res.status(400).json({ message: 'Missing required payment fields' });
    }
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
         return res.status(400).json({ message: 'Invalid amount' });
    }
     // Add more validation: card number format (Luhn check), expiry date format/validity, CVV format

    try {
        // Optional: Verify the order exists and belongs to the user (or check status)
        const [orders] = await pool.query(
            'SELECT id, user_id, total, status FROM orders WHERE id = ?',
            [order_id]
        );
        if (orders.length === 0) {
            return res.status(404).json({ message: `Order with ID ${order_id} not found.` });
        }
        const order = orders[0];
        if (order.user_id !== userId) {
             return res.status(403).json({ message: `You do not own order ID ${order_id}.` });
        }
         // Optional: Check if order total matches the payment amount
        if (parseFloat(order.total) !== parseFloat(amount)) {
             console.warn(`Payment amount ${amount} does not match order total ${order.total} for order ${order_id}`);
             // Decide if this should be an error or just a warning
             // return res.status(400).json({ message: 'Payment amount does not match order total.' });
        }
        // Optional: Check if order status allows payment (e.g., must be 'pending')
        // if (order.status !== 'pending') {
        //     return res.status(400).json({ message: `Order status (${order.status}) does not allow payment.`});
        // }


        // *** Placeholder for Encryption (using the insecure example functions) ***
        // const encryptedCardNumber = encrypt(card_number);
        // const encryptedCvv = encrypt(cvv); // Again, CVV SHOULD NOT BE STORED!
        // *** End Placeholder ***

        // Insert into payments table (using plain text as per original schema, VERY INSECURE)
        const [result] = await pool.query(
            'INSERT INTO payments (order_id, cardholder_name, card_number, expiry_date, cvv, amount) VALUES (?, ?, ?, ?, ?, ?)',
            [
                order_id,
                cardholder_name,
                // encryptedCardNumber, // Use encrypted variable if implemented
                // encryptedCvv,        // Use encrypted variable if implemented (BUT DON'T STORE CVV)
                card_number,        // STORING PLAIN TEXT - INSECURE
                expiry_date,
                cvv,                // STORING PLAIN TEXT - INSECURE & NON-COMPLIANT
                parseFloat(amount).toFixed(2)
            ]
        );

        // Update order status to 'paid' after successful payment
        await pool.query("UPDATE orders SET status = 'paid' WHERE id = ?", [order_id]);


        res.status(201).json({
            message: 'Payment processed successfully',
            paymentId: result.insertId
        });

    } catch (err) {
        console.error('Create Payment Error:', err);
        res.status(500).json({ message: 'Failed to process payment', error: err.message });
    }
};