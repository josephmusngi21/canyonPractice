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

async function createDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const database = mongoose.connection.db;
    const schema = {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name', 'longitude', 'latitude'],
          properties: {
            name: {
              bsonType: 'string',
              description: 'must be a string and is required',
              maxLength: 18,
            },
            longitude: {
              bsonType: 'double',
              description: 'must be a double and is required',
            },
            latitude: {
              bsonType: 'double',
              description: 'must be a double and is required',
            },
          },
        },
      },
    };

    await database.createCollection('canyons', schema);
    console.log('Database and collection created with schema:', database.databaseName);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
}

// Call createDatabase function during server initialization
createDatabase()
  .then(() => {
    console.log('Database creation process completed.');
  })
  .catch((err) => {
    console.error('Error during database creation:', err);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});