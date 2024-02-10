import { NextFunction, Request, Response } from 'express';
import redisClient from './redis';

const rateLimiter =
  (time: number, limit: number) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const ip: any = req.ip;

    const [response]: any = await redisClient
      .multi()
      .incr(ip)
      .expire(ip, time)
      .exec();

    if (response[1] >= limit) {
      res.status(429).json({
        loggedIn: false,
        error:
          'You have reached the limit for accessing this service. Please wait one minute before trying again',
      });
    } else {
      next();
    }
  };

export default rateLimiter;
