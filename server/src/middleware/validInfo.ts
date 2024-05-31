import { Request, Response, NextFunction } from 'express';

const validInfo = (req: Request, res: Response, next: NextFunction): void => {
  const { email, name, password } = req.body;

  function validEmail(userEmail: string): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === '/register') {
    if (![email, name, password].every(Boolean)) {
      res.status(401).json('Missing Credentials');
      return;
    } else if (!validEmail(email)) {
      res.status(401).json('Invalid Email');
      return;
    }
  } else if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      res.status(401).json('Missing Credentials');
      return;
    } else if (!validEmail(email)) {
      res.status(401).json('Invalid Email');
      return;
    }
  }

  next();
};

export default validInfo;
