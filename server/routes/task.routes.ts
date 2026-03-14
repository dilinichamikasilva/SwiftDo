import { Router } from 'express';
import { createTask, deleteTask, getMyTasks, updateTask  } from '../controller/task.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.use(protect);

router.post('/save-tasks', createTask);
router.get('/get-tasks', getMyTasks);
router.put('/update-tasks/:id', updateTask);
router.delete('/delete-tasks/:id', deleteTask);

export default router;