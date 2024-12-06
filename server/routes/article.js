const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Article = require('../models/Articles'); 
const router = express.Router();


// POST: Create a new article
router.post('/', async (req, res) => {
    try {
        const { title, author, category, content, image } = req.body; 
        const newArticle = new Article({ title, author, category, content, image });
        await newArticle.save();

        res.status(200).json({ message: 'Article added successfully!', article: newArticle });
    } catch (error) {
        console.error('Error saving article:', error);
        res.status(500).json({ message: 'Error saving article', error: error.message });
    }
});

router.get('/search', async (req, res) => {
    const { title } = req.query; // Mengambil parameter title dari query string

    // Validasi apakah parameter title ada
    if (!title) {
        return res.status(400).json({ message: 'Title query parameter is required' });
    }

    try {
        // Mencari artikel yang judulnya mengandung keyword title (case-insensitive)
        const articles = await Article.find({ title: { $regex: title, $options: 'i' } });

        // Mengecek apakah ada artikel yang ditemukan
        if (articles.length === 0) {
            return res.status(404).json({ message: 'No articles found with the given title' });
        }

        // Mengirimkan data artikel yang ditemukan
        res.status(200).json(articles);
    } catch (error) {
        console.error('Error searching articles by title:', error);
        res.status(500).json({ message: 'Error searching articles', error: error.message });
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

// GET: Retrieve a single article by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.status(200).json(article);
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ message: 'Error fetching article', error: error.message });
    }
});

// PUT: Update an article by ID
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const { title, author, category, date, content, image } = req.body;

        const updatedData = { title, author, category, date, content, image };

        const updatedArticle = await Article.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.status(200).json({ message: 'Article updated successfully!', article: updatedArticle });
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).json({ message: 'Error updating article', error: error.message });
    }
});



// DELETE: Delete an article by ID
router.delete('/:id', async (req, res) => {
    const articleId = req.params.id;
    if (!articleId) {
        return res.status(400).json({ message: 'Invalid article ID' });
    }

    try {
        const deletedArticle = await Article.findByIdAndDelete(articleId);
        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({ message: 'Article deleted successfully!' });
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({ message: 'Error deleting article', error: error.message });
    }
});




module.exports = router;
