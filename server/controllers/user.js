const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Pastikan path model sudah benar

// Fungsi untuk mendapatkan data user berdasarkan token JWT
exports.getUserFromToken = async (req, res) => {
    try {
        // Ambil token dari header Authorization
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        // Verifikasi token
        const decoded = jwt.verify(token, 'secret'); // Ganti dengan secret key Anda

        // Cari user berdasarkan id yang ada di dalam token
        const user = await User.findById(decoded.id).select('username email');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Kirim data user tanpa password dan data sensitif lainnya
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email, // Sesuaikan dengan data yang ingin dikirimkan
            role: user.role
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id; // Mendapatkan user id dari middleware

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ error: 'Both old and new passwords are required' });
        }

        // Cari user berdasarkan ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verifikasi password lama
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            return res.status(401).json({ error: 'Old password is incorrect' });
        }

        // Update password, tidak perlu hash manual karena pre('save') yang akan menangani hashing
        user.password = newPassword; // langsung masukkan password baru

        // Simpan perubahan
        await user.save(); 

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
