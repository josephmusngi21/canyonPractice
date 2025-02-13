const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const url = process.env.CONNECTION_STRING;
const client = new MongoClient(url);

const dbName = 'runs';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);

    // Operations on the database here

    // Example route
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    // Start the Express server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

main().catch(console.error);