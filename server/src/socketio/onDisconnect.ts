import { Socket } from 'socket.io';
import redisClient from '../redis/redis';

export const onDisconnect = async (
  socket: Socket & { user: { username: string } },
) => {
  console.log(`User has left ${socket.user.username}`);
  await redisClient.hset(
    `userid:${socket.user.username}`,
    'connected',
    'false',
  );

  const friendList = await redisClient.smembers(
    `friends:${socket.user.username}`,
  );
  const roomList = await redisClient.smembers(`rooms:${socket.user.username}`);

  let friendListArray = [];

  for (let friend of friendList) {
    const { userid, connected } = await redisClient.hgetall(`userid:${friend}`);
    friendListArray.push({
      username: friend,
      userid,
      connected,
    });
  }

  for (let room_id of roomList) {
    await redisClient.sadd(
      `offlineUsersInTheRoom:${room_id}`,
      socket.user.username,
    );
  }

  if (roomList.length > 0) {
    socket.to(roomList).emit('connected', 'false', socket.user.username);
  }
  socket.emit('friends', friendListArray);
};
