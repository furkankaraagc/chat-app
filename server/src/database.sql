CREATE DATABASE deneme70;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(24) NOT NULL UNIQUE,
  passhash VARCHAR NOT NULL UNIQUE,
  userid VARCHAR NOT NULL UNIQUE  
);
CREATE TABLE rooms(
  id SERIAL PRIMARY KEY,
  room_name VARCHAR(40) NOT NULL,
  room_id VARCHAR UNIQUE NOT NULL ,
  is_group BOOLEAN NOT NULL
);
CREATE TABLE user_room(
  userid VARCHAR NOT NULL  REFERENCES users(userid),
  room_id VARCHAR NOT NULL  REFERENCES rooms(room_id),
  PRIMARY KEY (userid, room_id)
);
CREATE TABLE messages(
  id SERIAL PRIMARY KEY,
  receiver_id VARCHAR NOT NULL ,
  sender_id VARCHAR NOT NULL  REFERENCES users(userid),
  message_content VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_message VARCHAR,
  last_message_by VARCHAR,
  last_message_timestamp VARCHAR
);

