import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes/authRouter';
import { corsConfig } from './config/corsConfig';
import { Server } from 'socket.io';
import { createServer } from 'http';
import session from 'express-session';
import { sessionConfig } from './config/sessionConfig';
import { addFriend, authorizeUser } from './socketio/authorizeUser';

const app = express();
const httpServer = createServer(app);

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());

app.use('/auth', router);

const io = new Server(httpServer, { cors: corsConfig });
io.use(authorizeUser);
io.on('connection', (socket: any) => {
  console.log('uniqidd', socket.user.userid);
  console.log('id', socket.id);
  console.log('A new client connected');
  socket.on('add_friend', (friendName: string, cb: any) =>
    addFriend(socket, friendName, cb),
  );
});

httpServer.listen(4000, () => {
  console.log('server listening on port 4000');
});
