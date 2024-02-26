import { NextFunction, Request, Response } from 'express';

export const validation = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (username.length < 3 || username.length > 20) {
    return res.status(403).json({
      error: 'Username length must be between 3 and 20 characters',
    });
  } else if (password.length < 3 || password.length > 20) {
    return res.status(403).json({
      error: 'Password length must be between 6 and 20 characters',
    });
  } else {
    next();
  }
};
