const express = require('express');
const router = express.Router();

router.post('/add', (req, res) => {
  const items = req.body;
  console.log("Received items:", items);
  res.json({ message: 'Items received', items });
});

module.exports = router;