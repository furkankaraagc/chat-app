import redisClient from '../redis/redis';

export const joinAfterFriendAdd = async (friendName: any, socket: any) => {
  const roomList = await redisClient.smembers(`rooms:${friendName}`);

  roomList.forEach((roomid) => {
    socket.join(roomid);
  });
};
