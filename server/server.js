import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config({ path: './assets.env' });

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const locationSchema = new mongoose.Schema({
  place: String,
  startLongitude: Number,
  startLatitude: Number,
  endLongitude: Number,
  endLatitude: Number,
  timestamp: String,
});

const Location = mongoose.model('Location', locationSchema);

app.post('/locations', async (req, res) => {
  const locationData = req.body;
  try {
    await Location.insertMany(locationData);
    res.status(201).send('Location data saved successfully');
  } catch (error) {
    res.status(500).send('Error saving location data');
  }
});

app.get('/locations', async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).send('Error retrieving location data');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});