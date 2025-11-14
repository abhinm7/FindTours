import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import tourRoutes from './routes/tours.js'

// Load env vars
dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

//api test route
app.get('/', (req, res) => {
  res.send(`API is healthy on PORT:${PORT}`);
});

//routes
app.use('/api/tours', tourRoutes);


app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});