const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.js');
const cors = require('cors');

// Inisialisasi Aplikasi
const app = express();
const PORT = 3000;

// MongoDB URI
const MONGO_URI = 'mongodb://jejojel:jejojel12345@clusteruas-shard-00-00.e0bga.mongodb.net:27017,clusteruas-shard-00-01.e0bga.mongodb.net:27017,clusteruas-shard-00-02.e0bga.mongodb.net:27017/ChicSimple?ssl=true&replicaSet=atlas-nf5n95-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ClusterUAS';

// Middleware
app.use(cors()); // Mengaktifkan CORS untuk semua origin
app.use(bodyParser.json()); // Parsing request body dengan format JSON

// Routes
app.use('/api/auth', authRoutes);

// Koneksi ke MongoDB
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Menjalankan Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
