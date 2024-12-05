const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth.js');
const articleRouter = require('./routes/article.js');
const userRouter = require('./routes/user.js');
const eventRouter = require('./routes/event.js');
const categoryRoutes = require('./routes/category.js');


// Initialize the app
const app = express();
const PORT = 3000;

// MongoDB URI
const MONGO_URI = 'mongodb://jejojel:jejojel12345@clusteruas-shard-00-00.e0bga.mongodb.net:27017,clusteruas-shard-00-01.e0bga.mongodb.net:27017,clusteruas-shard-00-02.e0bga.mongodb.net:27017/ChicSimple?ssl=true&replicaSet=atlas-nf5n95-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ClusterUAS';

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON payloads

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRouter);
app.use('/api/articles', articleRouter);
app.use('/api/events', eventRouter);
app.use('/api/categories', categoryRoutes);

// Serve static files from the 'client' folder
app.use(express.static(path.join(__dirname, '../client')));  // Pastikan 'client' folder dapat diakses

// Fallback ke index.html untuk request selain API
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));  // Mengarahkan semua request ke index.html
  });

  // Handle 404 error for static files
app.use((req, res, next) => {
    res.status(404).send('File not found');
  });
  

// MongoDB connection
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});