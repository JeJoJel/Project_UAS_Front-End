const express = require('express');
const Event = require('../models/Event'); 
const router = express.Router();

// Get events with pagination and search functionality
router.get('/', async (req, res) => {
    const { page = 1, search = '' } = req.query; 
    const limit = 10;
    const skip = (page - 1) * limit;

    try {
        // Search query if provided
        const query = search ? { name: { $regex: search, $options: 'i' } } : {};
        const events = await Event.find(query).skip(skip).limit(limit);
        const totalEvents = await Event.countDocuments(query);
        const totalPages = Math.ceil(totalEvents / limit);

        res.json({
            events,
            totalPages,
        });
    } catch (err) {
        res.status(500).send({ message: 'Error fetching events' });
    }
});

// Create a new event
router.post('/', async (req, res) => {
    const { name, date, time, location } = req.body;

    try {
        const newEvent = new Event({
            name,
            date,
            time,
            location
        });

        await newEvent.save();

        res.status(200).json({
            message: 'Event created successfully',
            event: newEvent
        });
    } catch (err) {
        res.status(500).json({ message: 'Error saving event', error: err });
    }
});

module.exports = router;
