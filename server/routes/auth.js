import express from 'express';

const router = express.Router();

// middlewares
import { isAdmin, requireSignin } from '../middlewares';

// controllers
import {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  currentUser,
} from '../controllers/auth';

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/current-admin', requireSignin, isAdmin, currentUser);

export default router;
