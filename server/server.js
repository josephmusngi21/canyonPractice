const { MongoCLient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: "./assets.env" });
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to the server");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
} run().catch(console.dir);