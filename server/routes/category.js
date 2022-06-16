import express from 'express';

const router = express.Router();

// middlewares
import { isAdmin, requireSignin } from '../middlewares';

// controllers
import { create, readAll, remove, update } from '../controllers/category';

router.post('/category', requireSignin, isAdmin, create);
router.get('/categories', readAll);
router.delete('/category/:slug', requireSignin, remove);
router.put('/category/:slug', requireSignin, update);

export default router;
