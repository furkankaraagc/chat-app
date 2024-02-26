import { Request, Response } from 'express';
import pool from '../db';

export const getChatLog = async (req: Request, res: Response) => {
  const { room_id } = req.body;

  try {
    const chatLog = await pool.query(
      'SELECT * FROM messages WHERE receiver_id=($1)',
      [room_id],
    );
    if (chatLog.rowCount && chatLog.rowCount > 0) {
      return res.status(200).json({ chatLog: chatLog.rows });
    } else {
      res.status(200).json({ chatLog: chatLog.rows });
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
