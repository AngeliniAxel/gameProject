import { Pool } from 'pg';
require('dotenv').config();

const HOST: string = 'localhost';
const PORT: number = 5432;

const pool = new Pool({
  user: 'postgres',
  password: process.env.DB_PASSWORD,
  host: HOST,
  port: PORT,
  database: 'gameproject',
});

export default pool;
