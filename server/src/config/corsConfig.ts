import dotenv from 'dotenv';
dotenv.config();
export const corsConfig = {
  origin: ['http://localhost:3000', 'https://octarine.site'],
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type, Authorization'],
};
