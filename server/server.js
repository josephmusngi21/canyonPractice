const express = require('express'); 
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser'); 

const app = express(); // Creating an express application
const port = process.env.PORT || 5000; // Setting the port for the server

app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Connecting to MongoDB with mongoose
mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Defining a schema for location data
const locationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    speed: Number,
    timestamp: String,
});

// Creating a model for location data
const Location = mongoose.model('Location', locationSchema);

// Endpoint to save location data
app.post('/locations', async (req, res) => {
    const locationData = req.body; // Getting location data from request body
    try {
        await Location.insertMany(locationData); // Inserting location data into the database
        res.status(201).send('Location data saved successfully'); // Sending success response
    } catch (error) {
        res.status(500).send('Error saving location data'); // Sending error response
    }
});

// Endpoint to retrieve location data
app.get('/locations', async (req, res) => {
    try {
        const locations = await Location.find(); // Retrieving location data from the database
        res.status(200).json(locations); // Sending retrieved data as JSON response
    } catch (error) {
        res.status(500).send('Error retrieving location data'); // Sending error response
    }
});

// Starting the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`); // Logging the server start message
});