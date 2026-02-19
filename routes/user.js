import express from 'express';
import { handleCreateNewUser,handleLoginUser } from '../controllers/user.js';
const router = express.Router();

router.post('/signup', handleCreateNewUser);
router.post('/login', handleLoginUser);


export default router;