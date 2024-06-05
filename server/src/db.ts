//@ts-nocheck
import pg from 'pg';

import dotenv from 'dotenv';
const {Pool} = pg;
dotenv.config();

const pool = new Pool({
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

export default pool;
