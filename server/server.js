const { MongoClient } = require('mongodb');
require('dotenv').config();

// Connection URL
const url = process.env.CONNECTION_STRING;
const client = new MongoClient(url);

// Database Name
const dbName = 'runs';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);

    // Perform operations on the database here

    // Close the connection
    await client.close();
}

main().catch(console.error);