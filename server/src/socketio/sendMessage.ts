import pool from '../db';
import redisClient from '../redis/redis';

export const sendMessage = async (socket: any, io: any, messageInfo: any) => {
  const { receiver_id, message_content, sender_id, sender_username } =
    messageInfo;

  const last_message_timestamp = new Date().getTime() / 1000;
  console.log(last_message_timestamp);
  io.to(receiver_id).emit('onMessage', {
    message_content,
    receiver_id,
    sender_id,
    sender_username,
    last_message_timestamp,
  });
  await redisClient.hset(
    `room_id:${receiver_id}`,
    'last_message',
    message_content,
    'last_message_by',
    sender_username,
    'last_message_timestamp',
    last_message_timestamp,
  );
  await pool.query(
    'INSERT INTO messages(sender_id, receiver_id,message_content) values($1,$2,$3) ',
    [sender_id, receiver_id, message_content],
  );
  const offlineUsersInTheRoom = await redisClient.smembers(
    `offlineUsersInTheRoom:${receiver_id}`,
  );

  for (const userid of offlineUsersInTheRoom) {
    await redisClient.hincrby(`userid:${userid}`, receiver_id, 1);
  }
  if (offlineUsersInTheRoom.length > 0) {
    socket.to(receiver_id).emit('incrNotify', receiver_id, 1);
  }
  io.to(receiver_id).emit(
    'updateLastMessage',
    receiver_id,
    message_content,
    sender_username,
    last_message_timestamp,
  );

  // socket
  //   .to(receiver_id)
  //   .emit('onMessage', { message_content, receiver_id, sender_id });
};
