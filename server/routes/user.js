const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth.js');
// Login route
router.get('/get', userController.getUserFromToken);
router.put('/ganti-password', authMiddleware, userController.updatePassword);

module.exports = router;