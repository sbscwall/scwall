import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';

const app = express();
const port = 5000;

// Middleware
app.use(cors({ 
  origin: '*', // Allow all origins (for debugging)
  methods: ['GET', 'POST'], // Allow all methods
  allowedHeaders: ['Content-Type'] // Allow headers
}));
app.use(express.json()); // Use express's built-in json middleware

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';  // MongoDB URI
const client = new MongoClient(uri);

// MongoDB Database and Collection
const dbName = 'email'; // Database name
const collectionName = 'emaildb'; // Collection name

// Connect to MongoDB
async function connectToDatabase() {
  await client.connect();
  console.log('Connected to MongoDB');
  return client.db(dbName).collection(collectionName);
}

// POST route to handle email submissions
app.post('/api/submit-email', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ error: 'Email is required' });
  }

  try {
    const collection = await connectToDatabase();
    
    // Check if the email already exists in the database
    const existingEmail = await collection.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({ error: 'This email has already been submitted' });
    }

    const result = await collection.insertOne({ email });
    res.status(200).send({ message: 'Email submitted successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to submit email' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
