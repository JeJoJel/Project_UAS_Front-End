const express = require('express');
const Article = require('../models/Articles');  
const router = express.Router();

// POST: Save a new article
router.post('/', async (req, res) => {
    try {
        const { title, author, category, date, content, image } = req.body;

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
