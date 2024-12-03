const express = require('express');
const Article = require('../models/Articles');
const router = express.Router();

// GET: Retrieve all unique categories
router.get('/', async (req, res) => {
    try {
        const categories = await Article.distinct('category');
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
});

// GET: Retrieve articles filtered by category
router.get('/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const articles = await Article.find({ category });
        res.status(200).json(articles);
    } catch (error) {
        console.error('Error fetching category articles:', error);
        res.status(500).json({ message: 'Error fetching category articles', error: error.message });
    }
});

module.exports = router;
