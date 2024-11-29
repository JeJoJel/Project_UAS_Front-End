const mongoose = require('mongoose');

// Define the schema for an article
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Article model based on the schema
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;