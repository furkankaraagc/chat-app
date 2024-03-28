export interface ChatLog {
  sender_id: string;
  message_content: string;
}
export interface SelectedChat {
  username: string;
  room_id: string;
}
export interface FriendList {
  username: string;
  connected: string | boolean;
  last_message: string;
  notification: number | string;
  last_message_by: string;
  last_message_timestamp: string;
  room_id: string;
}
