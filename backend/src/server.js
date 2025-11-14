import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import publicRoutes from './routes/tours.js'
import adminRoutes from './routes/admin.js'

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
app.use('/api/tours', publicRoutes);
app.use('/api/admin', adminRoutes);


app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});