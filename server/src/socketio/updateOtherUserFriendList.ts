import { Socket } from 'socket.io';
import redisClient from '../redis/redis';

export const updateOtherUserFriendList = async (
  socket: Socket & { user: { username: string } },
  room_id: string,
  friendName: string,
) => {
  const friendsRoom = await redisClient.smembers(`friendsroom:${friendName}`);
  let friendListArray = [];
  for (let friend of friendsRoom) {
    const splitted = friend.split('.');
    const room_id = splitted[1];

    const userInfo = await redisClient.hgetall(`userid:${splitted[0]}`);
    const roomInfo = await redisClient.hgetall(`room_id:${room_id}`);
    const notification = await redisClient.hget(
      `userid:${friendName}`,
      room_id,
    );
    friendListArray.push({
      username: splitted[0],
      userid: userInfo.userid,
      connected: userInfo.connected,
      room_id: splitted[1],
      notification,
      last_message: roomInfo.last_message,
      last_message_by: roomInfo.last_message_by,
      last_message_timestamp: roomInfo.last_message_timestamp,
    });
  }

  const socketid = await redisClient.hget(`userid:${friendName}`, 'socketid');

  const roomList = await redisClient.smembers(`rooms:${socket.user.username}`);

  roomList.forEach((roomid) => {
    socket.join(roomid);
  });
  if (socketid) {
    socket.to(socketid).emit('friends', friendListArray);
    socket.to(socketid).emit('joinAfterFriendAdd', friendName);
  }
};
