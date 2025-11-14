import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001; // 5001 so it won't clash with your React app

// Middleware
app.use(cors()); // Allows your frontend to talk to this
app.use(express.json()); // Allows server to accept JSON in body

// Basic test route
app.get('/', (req, res) => {
  res.send('Wow, booboo, the API is running! 🎉');
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});