const express = require('express');
const router = express.Router();
const { signupUser, findUserByEmail } = require('../models/userModel');

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  signupUser(username, email, password, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  findUserByEmail(email, async (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(401).json({ error: 'User not found' });

    const user = result[0];
    const match = password === user.password;

    if (!match) return res.status(401).json({ error: 'Invalid password' });
    res.status(200).json({
      success: true,
      message: 'Login successful',
      isLoggedIn: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  });
});

module.exports = router;