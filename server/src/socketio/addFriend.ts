import { v4 as uuidv4 } from 'uuid';
import pool from '../db';
import redisClient from '../redis/redis';
import { createFriendList } from './createFriendList';
import { updateOtherUserFriendList } from './updateOtherUserFriendList';

export const addFriend = async (
  socket: any,
  friendName: string,
  callback: ({}) => void,
  io: any,
) => {
  if (friendName === socket.user.username) {
    return callback({ isDone: false, errorMessage: 'Cannot add yourself' });
  }
  const friendInfo = await redisClient.hgetall(`userid:${friendName}`);
  if (!friendInfo.userid) {
    return callback({ isDone: false, errorMessage: "User doesn't exist!" });
  }

  const isAlreadyAdded = await redisClient.sismember(
    `friends:${socket.user.username}`,
    friendName,
  );
  if (isAlreadyAdded) {
    return callback({ isDone: false, errorMessage: 'User already added!' });
  }

  const room_id = uuidv4();
  const deneme = 'bu olmayacak';

  await pool.query(
    `INSERT INTO rooms(room_id,room_name,is_group) VALUES($1,$2,$3)`,
    [room_id, deneme, false],
  );
  await pool.query(`INSERT INTO user_room(userid,room_id) VALUES($1,$2)`, [
    friendInfo.userid,
    room_id,
  ]);
  await pool.query(`INSERT INTO user_room(userid,room_id) VALUES($1,$2)`, [
    socket.user.userid,
    room_id,
  ]);

  await redisClient.sadd(`friends:${socket.user.username}`, friendName);
  await redisClient.sadd(`friends:${friendName}`, socket.user.username);

  const usernameAndRoomid1 = [socket.user.username, room_id].join('.');
  const usernameAndRoomid2 = [friendName, room_id].join('.');

  await redisClient.sadd(`friendsroom:${friendName}`, usernameAndRoomid1);

  await redisClient.sadd(
    `friendsroom:${socket.user.username}`,
    usernameAndRoomid2,
  );

  await redisClient.sadd(`rooms:${friendName}`, room_id);
  await redisClient.sadd(`rooms:${socket.user.username}`, room_id);

  await redisClient.sadd(
    `offlineUsersInTheRoom:${room_id}`,
    socket.user.username,
    friendName,
  );

  await redisClient.hset(`userid:${socket.user.username}`, `${room_id}`, 0);
  await redisClient.hset(`userid:${friendName}`, `${room_id}`, 0);

  createFriendList(socket);
  updateOtherUserFriendList(socket, room_id, friendName);
  return callback({ isDone: false, errorMessage: `${friendName} added!` });
};
