import redisClient from '../redis/redis';

const notificationHandler = async (
  socket: any,
  io: any,
  userid: string,
  room_id: string,
  status: string,
) => {
  if (status === 'connected') {
    await redisClient.srem(
      `offlineUsersInTheRoom:${room_id}`,
      socket.user.username,
    );
    await redisClient.hset(`userid:${socket.user.username}`, room_id, 0);
    socket.emit('clearNotify', room_id);
  } else if (status === 'disconnected') {
    await redisClient.sadd(
      `offlineUsersInTheRoom:${room_id}`,
      socket.user.username,
    );
  }
};
export default notificationHandler;
