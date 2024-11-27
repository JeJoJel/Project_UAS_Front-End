const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Admin route (contoh)
router.get('/admin', verifyToken, verifyAdmin, (req, res) => {
    res.json({ message: 'Welcome, Admin!' });
});

module.exports = router;