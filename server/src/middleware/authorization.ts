import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  user: string;
}

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const jwrToken = req.header('token');

    if (!jwrToken) {
      res.status(403).send('Not authorized');
      return;
    }

    const payload = jwt.verify(
      jwrToken,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = payload.user;
    next();
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(403).send('Not authorized');
    } else {
      console.error('Unexpected error', err);
      res.status(500).send('Unexpected Error');
    }
  }
};

export default authorization;
