const express = require('express');
const multer = require('multer');
const path = require('path');
const Article = require('../models/Articles');  
const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // The directory where images will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
    }
});

const upload = multer({ storage: storage });

// API route for uploading images
// app.post('/api/upload-image', upload.single('image'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded');
//     }

//     // Assuming you save the file URL in your database
//     const imageUrl = `/uploads/${req.file.filename}`;
//     res.json({ imageUrl: imageUrl });
// });

// POST: Save a new article
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { title, author, category, date, content } = req.body;
        const image = req.file ? '/uploads/' + req.file.filename : null; // If image is uploaded, store the path

        const newArticle = new Article({ title, author, category, date, content, image });
        await newArticle.save();

        res.status(200).json({ message: 'Article added successfully!' });
    } catch (error) {
        console.error('Error saving article:', error);
        res.status(500).json({ message: 'Error saving article', error: error.message });
    }
});

// GET: Retrieve all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ message: 'Error fetching articles', error: error.message });
    }
});

module.exports = router;
