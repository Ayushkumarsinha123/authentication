import express from 'express';
import { handleHome } from '../controllers/user.js';
import { restrictTo } from '../middlewares/auth.js';

const router = express.Router();

router.get('/',restrictTo(['NORMAL']),handleHome);

export default router;