import dotenv from 'dotenv';
dotenv.config();
export const corsConfig = {
  origin: ['http://localhost:3000', 'https://chat-app-gamma-blush.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type, Authorization'],
};
