import { Router, Request, Response } from 'express';
import pool from '../db';
import bcrypt from 'bcrypt';
import jwtGenerator from '../utils/jwtGenerator';

const router = Router();

// Registering
router.post('/register', async (req: Request, res: Response) => {
  try {
    // Destructure the req.body
    const { name, lastName, email, password } = req.body;

    // Check if user exists (if exists then throw error)
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send('User already exist!');
    }

    // Bcrypt the user password

    const saltRound: number = 10;
    const bcryptPassword = await bcrypt.hash(password, saltRound);

    // Enter the new user inside our database

    const newUser = await pool.query(
      'INSERT INTO users(user_name, user_last_name, user_email,user_password) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, lastName, email, bcryptPassword]
    );

    // Generate jwt token

    const token: string = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    // Ensure err is of type Error
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).send('Server Error');
    } else {
      console.error('Unexpected error', err);
      res.status(500).send('Unexpected Error');
    }
  }
});

export default router;
