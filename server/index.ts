import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Connect to Database
connectDB();

app.use(express.json());

const PORT = process.env['PORT'] || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});