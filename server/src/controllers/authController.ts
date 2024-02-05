import { Request, Response } from 'express';
import pool from '../db';
import bcrypt from 'bcrypt';

export const sessionHandler = async (req: Request, res: Response) => {
  console.log('reqqq', req.session);
  if (req.session.user && req.session.user.username) {
    console.log('111');
    res.json({ loggedIn: true, username: req.session.user.username });
  } else {
    res.json({ loggedIn: false });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  const client = await pool.connect();
  console.log('222');

  try {
    const existingUser = await client.query(
      'SELECT id, username, passhash FROM users  WHERE username=$1',
      [req.body.username],
    );
    if (existingUser.rowCount && existingUser.rowCount > 0) {
      const isSamePass = await bcrypt.compare(
        req.body.password,
        existingUser.rows[0].passhash,
      );
      if (isSamePass) {
        console.log({
          username: req.body.username,
          id: existingUser.rows[0].id,
        });
        try {
          req.session.user = {
            username: req.body.username,
            id: existingUser.rows[0].id,
          };
        } catch (error) {
          console.log(error);
        }
        res.json({ loggedIn: true, username: req.body.username });
      } else {
        res.json({ loggedIn: false, error: 'Wrong username or password!' });
        console.log('not good');
      }
    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to connect to database' });
  } finally {
    client.release();
  }
};

export const registerHandler = async (req: Request, res: Response) => {
  const client = await pool.connect();
  try {
    const existingUser = await client.query(
      'SELECT id, username, passhash FROM users  WHERE username=$1',
      [req.body.username],
    );
    if (existingUser.rowCount === 0) {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const newUserQuery = await pool.query(
        'INSERT INTO users(username, passhash) values($1,$2) RETURNING username',
        [req.body.username, hashedPass],
      );
      console.log(newUserQuery);
      req.session.user = {
        username: req.body.username,
        id: newUserQuery.rows[0].id,
      };
      res.json({ loggedIn: true, username: req.body.username });
    } else {
      res
        .status(409)
        .json({ loggedIn: false, error: 'Username already taken' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to connect to database' });
  } finally {
    client.release();
  }
};
