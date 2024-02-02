//@ts-nocheck
import pg from 'pg';

import dotenv from 'dotenv';
const { Pool } = pg;
dotenv.config();

const pool = new Pool({
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  user: process.env.DATABASE_USER,
  port: process.env.DATABASE_PORT,
});

export default pool;
