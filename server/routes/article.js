const express = require('express');
const Article = require('../models/Articles');  
const router = express.Router();

// POST request to save an article
router.post('/', async (req, res) => {
    try {
        const { title, author, category, date, content } = req.body;
        // Create a new article object using the data from the request body
        const newArticle = new Article({ title, author, category, date, content });
        
        // Save the article to the database
        await newArticle.save();

        // Respond with a success message
        res.status(200).json({ message: 'Article added successfully!' });
    } catch (error) {
        // Log the error and respond with an error message if something goes wrong
        console.error('Error saving article:', error);
        res.status(500).json({ message: 'Error saving article', error: error.message });
    }
});

// GET request to retrieve all articles
router.get('/', async (req, res) => {
    try {
        // Fetch all articles from the database
        const articles = await Article.find();
        // Respond with the articles data
        res.status(200).json(articles);
    } catch (error) {
        // Log the error and respond with an error message if something goes wrong
        console.error('Error fetching articles:', error);
        res.status(500).json({ message: 'Error fetching articles', error: error.message });
    }
});

module.exports = router;
