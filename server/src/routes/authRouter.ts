import express from 'express';

import {
  loginHandler,
  registerHandler,
  sessionHandler,
} from '@/controllers/authController';

const router = express.Router();

router.route('/login').get(sessionHandler).post(loginHandler);

router.post('/register', registerHandler);

export default router;
