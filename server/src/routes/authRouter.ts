import express from 'express';

import {
  loginHandler,
  registerHandler,
  sessionHandler,
} from '../controllers/authController';
import { validation } from '../controllers/validation';
import rateLimiter from '../redis/rateLimiter';

const router = express.Router();

router
  .route('/login')
  .get(rateLimiter(60, 4000), sessionHandler)
  .post(validation, loginHandler);

router.post('/register', rateLimiter(4000, 1000), validation, registerHandler);

export default router;
