const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
const mongoUri = "mongodb+srv://aromal22:<kSCT4AJ2BLJxwElK>@cluster0.v85lh.mongodb.net/tourBooking?retryWrites=true&w=majority"; // Replace <db_password> with your actual password
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define schemas and models
const TourSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imageUrl: String,
    timestamp: { type: Date, default: Date.now }
});
const AdminChangeSchema = new mongoose.Schema({
    change: String,
    timestamp: { type: Date, default: Date.now }
});
const Tour = mongoose.model('Tour', TourSchema);
const AdminChange = mongoose.model('AdminChange', AdminChangeSchema);

// API endpoint to add a tour
app.post('/api/tours', async (req, res) => {
    try {
        const newTour = new Tour(req.body);
        await newTour.save();
        res.status(201).json({ message: 'Tour added successfully', tour: newTour });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API endpoint to fetch all tours
app.get('/api/tours', async (req, res) => {
    try {
        const tours = await Tour.find().sort({ timestamp: -1 });
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API endpoint to save admin changes
app.post('/api/admin-changes', async (req, res) => {
    try {
        const { change } = req.body;
        if (!change) {
            return res.status(400).json({ error: 'Change description is required.' });
        }
        const newChange = new AdminChange({ change });
        await newChange.save();
        res.status(201).json({ message: 'Change saved successfully', change: newChange });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API endpoint to fetch admin changes
app.get('/api/admin-changes', async (req, res) => {
    try {
        const changes = await AdminChange.find().sort({ timestamp: -1 });
        res.status(200).json(changes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
