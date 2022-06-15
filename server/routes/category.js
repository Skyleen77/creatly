import express from 'express';

const router = express.Router();

// middlewares
import { isAdmin, requireSignin } from '../middlewares';

// controllers
import { create } from '../controllers/category';

router.post('/category', requireSignin, isAdmin, create);

export default router;
