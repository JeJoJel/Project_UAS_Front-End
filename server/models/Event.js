const mongoose = require('mongoose');

// Define the schema for an event
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Event model based on the schema
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
