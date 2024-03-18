import redisClient from '../redis/redis';

export const createFriendList = async (socket: any) => {
  const friendsRoom = await redisClient.smembers(
    `friendsroom:${socket.user.username}`,
  );
  let friendListArray = [];
  for (let friend of friendsRoom) {
    const splitted = friend.split('.');
    const room_id = splitted[1];

    const userInfo = await redisClient.hgetall(`userid:${splitted[0]}`);
    const roomInfo = await redisClient.hgetall(`room_id:${room_id}`);
    const notification = await redisClient.hget(
      `userid:${socket.user.username}`,
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

  socket.emit('friends', friendListArray);
};
