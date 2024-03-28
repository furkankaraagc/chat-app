import express from 'express';
import { getChatLog } from '../controllers/messageController';

const chatRouter = express.Router();

chatRouter.post('/getChatLog', getChatLog);

export default chatRouter;
