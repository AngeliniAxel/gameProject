import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function jwtGenerator(user_id: string | number): string {
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
}

export default jwtGenerator;
