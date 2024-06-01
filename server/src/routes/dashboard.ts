import { Router, Request, Response } from 'express';
import pool from '../db';
import authorization from '../middleware/authorization';

const router = Router();

router.get('/', authorization, async (req: Request, res: Response) => {
  try {
    const user = await pool.query(
      'SELECT user_name, user_last_name, user_email FROM users WHERE user_id = $1',
      [req.user]
    );

    res.json(user.rows[0]);
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
