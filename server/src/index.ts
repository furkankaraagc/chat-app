import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/authRouter';
import session from 'express-session';
const app = express();
dotenv.config();

app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === 'production' ? 'true' : 'auto',
      httpOnly: true,
      // expires: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'lax',
    },
  }),
);

app.use('/auth', router);

app.listen(4000, () => {
  console.log('server listening on port 4000');
});
