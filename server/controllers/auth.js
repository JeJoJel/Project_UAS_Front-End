const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validasi input
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required' });
        }

        // Validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Periksa apakah username atau email sudah ada
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ error: 'Username already exists' });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ error: 'Email already exists' });
            }
        }

        // Membuat instance user dan menyimpannya
        const newUser = new User({ username, email, password });
        await newUser.save(); // Password otomatis di-hash oleh model

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Tangani error duplikasi dari MongoDB
        if (error.code === 11000) {
            const duplicatedField = Object.keys(error.keyValue)[0];
            return res.status(400).json({ error: `${duplicatedField} already exists` });
        }

        // Tangani error lainnya
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


// Login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validasi input
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Cari user berdasarkan username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verifikasi password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Buat token JWT
        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role }, // Tambahkan role ke token
            'secret', // Ganti dengan secret key Anda
            { expiresIn: '1h' }
        );


        // Kirim token dan role dalam respons
        res.status(200).json({
            message: 'Login successful',
            token,
            role: user.role
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Endpoint untuk mendapatkan data pengguna
exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Mengambil user berdasarkan ID
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user); // Mengirimkan data user dalam format JSON
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Endpoint untuk memperbarui data pengguna
exports.updateUserDetails = async (req, res) => {
    try {
        const userId = req.body._id;  // Dapatkan userId dari body
        const updatedData = req.body;

        // Jangan izinkan perubahan pada 'role' di sini
        if(updatedData.role) {
            delete updatedData.role;
        }

        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user); // Kirimkan data pengguna yang telah diperbarui
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Endpoint untuk menghapus data pengguna
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};