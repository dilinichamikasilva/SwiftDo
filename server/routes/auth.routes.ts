import { Router } from 'express';
import { registerUser } from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerUser);
// Add login route here later

export default router;