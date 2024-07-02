import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { accessJwtGenerator, isTokenExpired } from '../utils/jwtGenerator';

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
    const accessToken = req.header('accessToken');

    if (!accessToken) {
      res.status(403).send('Not authorized');
      return;
    }

    // Verify if there is a valid access token
    if (isTokenExpired(accessToken)) {
      const refreshToken = req.cookies.refreshToken;

      // If no accessToken, checks for a refreshToken
      if (isTokenExpired(refreshToken)) {
        res.status(403).send('Not authorized');
        return;
      }

      // Verify the refreshToken and create a new accessToken
      const payload = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      ) as unknown as JwtPayload;

      // Check if payload contains user
      if (!payload.user) {
        res.status(403).send('Not authorized');
        return;
      }

      const newAccessToken = accessJwtGenerator(payload.user);

      res.setHeader('accessToken', newAccessToken);

      req.user = payload.user;
      next();
    } else {
      // If there is an accessToken, verify it and extract the user from the payload
      const payload = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      ) as unknown as JwtPayload;

      // Check if payload contains user
      if (!payload.user) {
        res.status(403).send('Not authorized');
        return;
      }

      req.user = payload.user;
      next();
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error: ' + err.message);
      res.status(403).send('Not authorized');
    } else {
      console.error('Unexpected error', err);
      res.status(500).send('Unexpected Error');
    }
  }
};

export default authorization;
