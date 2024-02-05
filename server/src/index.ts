import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/authRouter';
import session from 'express-session';
import { sessionConfig } from './config/sessionConfig';

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
app.use(session(sessionConfig));

app.use('/auth', router);

app.listen(4000, () => {
  console.log('server listening on port 4000');
});
