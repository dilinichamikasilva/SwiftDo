import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { Task } from './models/Task';

const app = express();
app.use(cors()); 
app.use(express.json());

// Connect to MongoDB (Local or Atlas)
mongoose.connect('mongodb://localhost:27017/swiftdo');

// Quick Route
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.listen(3000, () => console.log('Server running on port 3000'));