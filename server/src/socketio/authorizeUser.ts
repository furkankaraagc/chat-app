import { jwtVerify } from '../jwt/jwtAuth';
import redisClient from '../redis/redis';
import { createFriendList } from './createFriendList';

export const authorizeUser = async (socket: any, next: any) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('no token'));
  }
  try {
    const decoded: any = await jwtVerify(token, 'secret_key');
    socket.user = { ...decoded };

    const roomList = await redisClient.smembers(
      `rooms:${socket.user.username}`,
    );
    // const friendsRoom = await redisClient.smembers(
    //   `friendsroom:${socket.user.username}`,
    // );

    roomList.forEach((roomid) => {
      socket.join(roomid);
    });

    await redisClient.hset(
      `userid:${socket.user.username}`,
      'userid',
      socket.user.userid,
      'connected',
      'true',
      'socketid',
      socket.id,
    );
    createFriendList(socket);
    // let friendListArray = [];
    // for (let friend of friendsRoom) {
    //   const splitted = friend.split('.');
    //   const room_id = splitted[1];

    //   const userInfo = await redisClient.hgetall(`userid:${splitted[0]}`);
    //   const roomInfo = await redisClient.hgetall(`room_id:${room_id}`);
    //   const notification = await redisClient.hget(
    //     `userid:${socket.user.username}`,
    //     room_id,
    //   );
    //   friendListArray.push({
    //     username: splitted[0],
    //     userid: userInfo.userid,
    //     connected: userInfo.connected,
    //     room_id: splitted[1],
    //     notification,
    //     last_message: roomInfo.last_message,
    //     last_message_by: roomInfo.last_message_by,
    //     last_message_timestamp: roomInfo.last_message_timestamp,
    //   });
    // }

    if (roomList.length > 0) {
      socket.to(roomList).emit('connected', 'true', socket.user.username);
    }
    // socket.emit('friends', friendListArray);
    socket.emit('userInfo', socket.user.userid, socket.user.username);

    next();
  } catch (error) {
    console.log(error);
    next(new Error('not authorized'));
  }
};
