// import { CookieOptions, SessionOptions } from 'express-session';
// import RedisStore from 'connect-redis';
// import redisClient from '../redis/redis';
// import session from 'express-session';
// import dotenv from 'dotenv';
// dotenv.config();

// declare module 'express-session' {
//   export interface SessionData {
//     user: { [key: string]: any };
//   }
// }

// const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
// const cookie: CookieOptions = {
//   secure: process.env.ENVIRONMENT === 'production' ? true : 'auto',
//   httpOnly: true,
//   expires,
//   sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'lax',
// };

// export const sessionConfig: any = {
//   secret: process.env.COOKIE_SECRET,
//   credentials: true,
//   name: 'sid',
//   store: new RedisStore({ client: redisClient }),
//   resave: false,
//   saveUninitialized: false,
//   cookie,
// };
