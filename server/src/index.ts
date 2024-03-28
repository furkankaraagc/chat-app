import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { corsConfig } from './config/corsConfig';
import pool from './db';
import router from './routes/authRouter';
import chatRouter from './routes/chatRouter';
import { addFriend } from './socketio/addFriend';
import { authorizeUser } from './socketio/authorizeUser';
import { joinAfterFriendAdd } from './socketio/joinAfterFriendAdd';
import notificationHandler from './socketio/notificationHandler';
import { onDisconnect } from './socketio/onDisconnect';
import { MessageInfo, sendMessage } from './socketio/sendMessage';
const app = express();
const httpServer = createServer(app);

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());

app.use('/auth', router);
app.use('/', chatRouter);
const io = new Server(httpServer, { cors: corsConfig });
io.use(authorizeUser);
io.on('connection', (socket: any) => {
  console.log(`a user connected ${socket.id}`);

  socket.on('add_friend', (friendName: string, callback: () => void) => {
    addFriend(socket, friendName, callback, io);
  });
  socket.on('onMessage', (messageInfo: MessageInfo) => {
    sendMessage(socket, io, messageInfo);
  });
  socket.on('onChat', (userid: string, room_id: string, status: string) => {
    notificationHandler(socket, io, userid, room_id, status);
  });
  socket.on('joinAfterFriendAdd', (friendName: string) => {
    joinAfterFriendAdd(friendName, socket);
  });
  socket.on('disconnecting', () => onDisconnect(socket));
  socket.on('disconnect', () => onDisconnect(socket));
});

const dbStart = async () => {
  let retires = 5;
  while (retires) {
    try {
      const db = await pool.connect();
      console.log('postgres running');
      break;
    } catch (err) {
      console.log(err);
      retires -= 1;
      console.log(`retires left ${retires}`);
      await new Promise((res) => setTimeout(res, 3000));
    }
  }
};

dbStart();

httpServer.listen(4000, () => {
  console.log('server listening on port 4000');
});
