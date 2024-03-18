import express from 'express';
import { getChatLog } from '../controllers/messageController';

const chatRouter = express.Router();
chatRouter.get('/hello', (req, res) => {
  res.send('hello world');
});

chatRouter.post('/getChatLog', getChatLog);

export default chatRouter;
