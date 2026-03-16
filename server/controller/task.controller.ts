import { Request, Response } from 'express';
import { Task } from '../models/Task';


// Create Task
export const createTask = async (req: any, res: Response) => {
  try {
    console.log("Data arriving at backend:", req.body);

    const { title, description, status, taskDate } = req.body;
    
    // Validation
    if (!title || typeof title !== 'string') {
       return res.status(400).json({ message: "Task title is required and must be a string." });
    }

    // Creation
    const task = await Task.create({
      user: req.user, 
      title: title,
      description: description,
      status: status || 'todo',
      taskDate: taskDate ? new Date(taskDate) : undefined
    });

    // Response - FIXED: changed 'newTask' to 'task'
    res.status(201).json(task); 
    
  } catch (error: any) {
    console.error("Mongoose Error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// Get Tasks for logged-in user
export const getMyTasks = async (req: any, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


// Update Task
export const updateTask = async (req: any, res: Response) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
      runValidators: true
    });

    res.json(updatedTask);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Task
export const deleteTask = async (req: any, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.json({ message: 'Task removed successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};