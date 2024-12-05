const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// // Route untuk mendapatkan data pengguna
// router.get('/user/:id', userController.getUserDetails);

// // Route untuk memperbarui data pengguna
// router.put('/user/:id', userController.updateUserDetails);

// // Route untuk menghapus data pengguna
// router.delete('/user/:id', userController.deleteUser);

// // Route untuk membuat pengguna baru
// router.post('/user', userController.createUser);

module.exports = router;