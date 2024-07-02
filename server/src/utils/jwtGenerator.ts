import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JwtPayload } from 'jsonwebtoken';

dotenv.config();

export function accessJwtGenerator(user_id: string | number): string {
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: '30s',
  });
}

export function refreshJwtGenerator(user_id: string | number): string {
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: '1m',
  });
}

interface DecodedToken extends JwtPayload {
  exp: number;
}

// Function to check if the token is expired
export function isTokenExpired(token: string | undefined): boolean {
  if (!token) return true;

  try {
    const decoded = jwt.decode(token) as DecodedToken | null;

    if (!decoded || typeof decoded === 'string') {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Consider the token expired if decoding fails
  }
}
