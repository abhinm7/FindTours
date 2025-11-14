import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors()); 
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
  res.send('HELLO');
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});