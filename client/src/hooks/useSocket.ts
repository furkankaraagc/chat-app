import { pushMessageToChatLog } from '@/redux/features/chatSlice';
import { setFriendList, setUserInfo } from '@/redux/features/userSlice';
import { RootState } from '@/redux/store';
import socket from '@/socket';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const useSocket = () => {
  const { friendList, userInfo } = useSelector(
    (state: RootState) => state.userSlice.value,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect();

    socket.on('connected', (status, username) => {
      if (friendList.length > 0) {
        const copyFriendList = friendList.map((item: any) => ({ ...item }));
        copyFriendList.map((item: any) => {
          if (item.username === username) {
            item.connected = status;
          }
        });
        dispatch(setFriendList(copyFriendList));
      }
    });
    socket.on('friends', (friendList) => {
      console.log(friendList);
      dispatch(setFriendList(friendList));
    });
    socket.on('userInfo', (userid, username) => {
      const userInfo = {
        userid,
        username,
      };
      console.log('USERINFOOO', userInfo);
      dispatch(setUserInfo(userInfo));
    });
    socket.on('connect_error', (err) => {
      console.log(err);
    });
    socket.on('onMessage', (messageInfo) => {
      console.log(messageInfo);
      dispatch(pushMessageToChatLog(messageInfo));
    });
    socket.on('incrNotify', (receiver_id, notify) => {
      if (friendList.length > 0) {
        const copyFriendList = friendList.map((item: any) => ({ ...item }));
        copyFriendList.map((item: any) => {
          if (item.room_id === receiver_id) {
            let n = Number(item.notification);
            n += notify;
            item.notification = n;
          }
        });
        dispatch(setFriendList(copyFriendList));
      }
    });
    socket.on('clearNotify', (room_id) => {
      if (friendList.length > 0) {
        const copyFriendList = friendList.map((item: any) => ({ ...item }));
        copyFriendList.map((item: any) => {
          if (item.room_id === room_id) {
            item.notification = 0;
          }
        });
        dispatch(setFriendList(copyFriendList));
      }
    });
    socket.on(
      'updateLastMessage',
      (
        receiver_id,
        message_content,
        last_message_by,
        last_message_timestamp,
      ) => {
        if (friendList.length > 0) {
          const copyFriendList = friendList.map((item: any) => ({ ...item }));
          copyFriendList.map((item: any) => {
            if (item.room_id === receiver_id) {
              item.last_message = message_content;
              item.last_message_timestamp = last_message_timestamp;

              if (userInfo.username === last_message_by) {
                item.last_message_by = 'You';
              } else {
                item.last_message_by = last_message_by;
              }
            }
          });
          dispatch(setFriendList(copyFriendList));
        }
      },
    );

    return () => {
      socket.off('connected');
      socket.off('friends');
      socket.off('userid');
      socket.off('connect_error');
      socket.off('onMessage');
      socket.off('incrNotify');
      socket.off('clearNotify');
      socket.off('updateLastMessage');
    };
  }, [friendList]);
};
export default useSocket;
