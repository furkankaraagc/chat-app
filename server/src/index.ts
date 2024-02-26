import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { corsConfig } from './config/corsConfig';
import router from './routes/authRouter';
import chatRouter from './routes/chatRouter';
import { addFriend } from './socketio/addFriend';
import { authorizeUser } from './socketio/authorizeUser';
import notificationHandler from './socketio/notificationHandler';
import { onDisconnect } from './socketio/onDisconnect';
import { sendMessage } from './socketio/sendMessage';

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

  socket.on('add_friend', (friendName: string, callback: any) => {
    addFriend(socket, friendName, callback);
  });
  socket.on('onMessage', (messageInfo: any) => {
    sendMessage(socket, io, messageInfo);
  });
  socket.on('onChat', (userid: string, room_id: string, status: string) => {
    console.log(userid, room_id, status);
    notificationHandler(socket, io, userid, room_id, status);
  });

  socket.on('disconnecting', () => onDisconnect(socket));
  socket.on('disconnect', () => onDisconnect(socket));
});

httpServer.listen(4000, () => {
  console.log('server listening on port 4000');
});
