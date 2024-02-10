import { jwtVerify } from '../jwt/jwtAuth';
import redisClient from '../redis/redis';

export const authorizeUser = async (socket: any, next: any) => {
  const token = socket.handshake.auth.token;
  try {
    const decoded: any = await jwtVerify(token, 'secret_key');
    console.log('decodedded', decoded);
    socket.user = { ...decoded };
    console.log('redis icin', socket.user.username);
    await redisClient.hset(
      `userid:${socket.user.username}`,
      'userid',
      socket.user.userid,
    );
    next();
  } catch (error) {
    console.log(error);
    next(new Error('not authorized'));
  }
};
export const addFriend = async (socket: any, friendName: any, cb: any) => {
  if (friendName === socket.user.username) {
    return cb({ done: false, error: 'cannot add yourself' });
  }
  const friendUserId = await redisClient.hget(`userid:${friendName}`, 'userid');
  if (!friendUserId) {
    return cb({ done: false, error: "User doesn't exist!" });
  }

  const currentFriendList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1,
  );

  if (currentFriendList && currentFriendList.indexOf(friendName) !== -1) {
    return cb({ done: false, error: 'Friend already added!' });
  }
  await redisClient.lpush(`friends:${socket.user.username}`, friendName);
  cb({ done: true });
};
