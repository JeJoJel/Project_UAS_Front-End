const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.js'); // Auth routes
const verifyToken = require('./middleware/auth.js'); // Middleware for token verification

// Inisialisasi Aplikasi
const app = express();
const PORT = 3000;

// MongoDB URI
const MONGO_URI = 'mongodb://jejojel:jejojel12345@clusteruas-shard-00-00.e0bga.mongodb.net:27017,clusteruas-shard-00-01.e0bga.mongodb.net:27017,clusteruas-shard-00-02.e0bga.mongodb.net:27017/ChicSimple?ssl=true&replicaSet=atlas-nf5n95-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ClusterUAS';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

// Endpoint dilindungi oleh token (contoh: /api/protected)
app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ message: 'You have access!', userId: req.userId });
});

// Koneksi ke MongoDB
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Menjalankan Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});