import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 5001;

// CORS setup - explicitly allowing your frontend origin
app.use(cors({
  origin: '*',  // Allow scwall.com as origin only
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(bodyParser.json());  // Use express's built-in json middleware

// Root route to check if the server is running
app.get('/', (req, res) => {
  console.log("GET request to root route");
  res.send('Server is working properly!');
});

// MongoDB connection URI
const uri = process.env.MONGO_URI || 'mongodb+srv://<user><pwd>@scwall-email-db.jxex7py.mongodb.net/?retryWrites=true&w=majority&appName=scwall-email-db'; // Connection string to MongoDB atlas

const client = new MongoClient(uri, {
});

// MongoDB Database and Collection
const dbName = 'email';  //  database name
const collectionName = 'emaildb';  //  collection name

// Connect to MongoDB
async function connectToDatabase() {
  await client.connect();
  console.log('Connected to MongoDB');
  return client.db(dbName).collection(collectionName);
}

// POST route to handle email submissions
app.options('/api/submit-email', cors());

app.post('/api/submit-email', async (req, res) => {
  const { email } = req.body;

  // Log the received email to check if it's being sent correctly
  console.log('Received email:', email); // Log received email

  if (!email) {
    return res.status(400).send({ error: 'Email is required' });
  }

  let collection;
  try {
    collection = await connectToDatabase();
  } catch (err) {
    console.error('❌ Failed to connect to database:', err);
    return res.status(500).send({ error: 'Server is currently down. Please try again later.' });
  }

   // Check if the email already exists in the database
   try {
    const existingEmail = await collection.findOne({ email });

    if (existingEmail) {
      console.log('📌 Duplicate email detected:', email);
      return res.status(409).send({ error: 'This email has already been submitted. You are all set!' });
    }

    // Insert the new email into the database
    const result = await collection.insertOne({ email });

    // Log the result of the insertion
    console.log('Email inserted into database:', result); // Log result

    res.status(200).send({ message: 'Email submitted successfully', result });
  } catch (error) {
    console.error('Error during email submission:', error); // Log any errors
    res.status(500).send({ error: 'Failed to submit email' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running`);
});
