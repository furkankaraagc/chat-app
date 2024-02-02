import express from 'express';
import pool from '../db';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/login', async (req, res) => {
  const client = await pool.connect();
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
        res.json({ loggedIn: false, status: 'Wrong username or password!' });
        console.log('not good');
      }
    } else {
      return res.status(401).json('Invalid username or password');
    }
  } catch (error) {
    res.status(500).json('Failed to connect to database');
  } finally {
    client.release();
  }
});
router.post('/register', async (req, res) => {
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
      res.json({ loggedIn: false, status: 'Username. already taken' });
    }
  } catch (error) {
    res.status(500).json('Failed to connect to database');
  } finally {
    client.release();
  }
});

export default router;
