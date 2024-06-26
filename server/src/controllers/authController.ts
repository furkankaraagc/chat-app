import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import pool from '../db';

import { getJwt, jwtSign, jwtVerify } from '../jwt/jwtAuth';
dotenv.config();

export const sessionHandler = async (req: Request, res: Response) => {
  const token = getJwt(req);
  if (!token) {
    return res.json({ loggedIn: false, error: 'no token' });
  }
  try {
    const tokenInfo = await jwtVerify(token, 'secret_key');
    return res.json({ loggedIn: true, token });
  } catch (error) {
    return res.json({ loggedIn: false });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  const client = await pool.connect();

  try {
    const existingUser = await client.query(
      'SELECT id, username, passhash, userid FROM users  WHERE username=$1',
      [req.body.username],
    );
    if (existingUser.rowCount && existingUser.rowCount > 0) {
      const isSamePass = await bcrypt.compare(
        req.body.password,
        existingUser.rows[0].passhash,
      );
      if (isSamePass) {
        jwtSign(
          {
            username: req.body.username,
            id: existingUser.rows[0].id,
            userid: existingUser.rows[0].userid,
          },
          'secret_key',
          { expiresIn: '60min' },
        )
          .then((token) => {
            res.status(200).json({ loggedIn: true, token });
          })
          .catch((err) => {
            console.log(err);
            res
              .status(400)
              .json({ loggedIn: false, error: 'Something went wrong' });
          });
      } else {
        res
          .status(400)
          .json({ loggedIn: false, error: 'Invalid username or password!' });
      }
    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to connect to database', error2: error });
  } finally {
    client.release();
  }
};

export const registerHandler = async (req: Request, res: Response) => {
  const client = await pool.connect();
  try {
    const existingUser = await client.query(
      'SELECT id, username, passhash FROM users WHERE username=$1',
      [req.body.username],
    );
    const userid = uuidv4();
    if (existingUser.rowCount === 0) {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const newUserQuery = await pool.query(
        'INSERT INTO users(username, passhash,userid) values($1,$2,$3) RETURNING id , username, userid',
        [req.body.username, hashedPass, userid],
      );

      jwtSign(
        {
          username: req.body.username,
          id: newUserQuery.rows[0].id,
          userid: newUserQuery.rows[0].userid,
        },
        'secret_key',
        { expiresIn: '60min' },
      )
        .then((token) => {
          res.status(200).json({ loggedIn: true, token });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(400)
            .json({ loggedIn: false, error: 'something went wrong' });
        });
    } else {
      res
        .status(409)
        .json({ loggedIn: false, error: 'Username already taken' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to connect to database', error2: error });
  } finally {
    client.release();
  }
};
export const userInfoHandler = async () => {};
