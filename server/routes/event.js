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
        const EventSchema = new mongoose.Schema({
            name: { type: String, required: true },
            date: { type: Date, required: true },
            time: { type: String, required: true },
            location: { type: String, required: true }
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

// Get a specific event by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching event', error: err });
    }
});

// Update an event by ID
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const { name, date, time, location } = req.body;

        // Update the event with the provided data
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { name, date, time, location },
            { new: true } // Return the updated event
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({
            message: 'Event updated successfully',
            event: updatedEvent
        });
    } catch (err) {
        res.status(500).json({ message: 'Error updating event', error: err });
    }
});

// DELETE: Delete an event by ID
router.delete('/:id', async (req, res) => {
    const eventId = req.params.id;
    if (!eventId) {
        return res.status(400).json({ message: 'Invalid event ID' });
    }

    try {
        const deletedEvent = await Article.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully!' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
});


module.exports = router;
