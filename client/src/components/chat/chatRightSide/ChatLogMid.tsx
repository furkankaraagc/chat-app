import {setChatLog} from '@/redux/features/chatSlice';
import {RootState} from '@/redux/store';
import socket from '@/socket';
import {baseURL} from '@/utils/utils';
import {getCookie} from 'cookies-next';
import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ChatLog} from '../../../types/chatTypes';
import ChatLogMessage from './ChatLogMessage';

const ChatLogMid = () => {
  const {chatLog} = useSelector((state: RootState) => state.chatSlice.value);
  const {userInfo} = useSelector((state: RootState) => state.userSlice.value);
  const {selectedChat} = useSelector(
    (state: RootState) => state.chatSlice.value
  );
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const url = `${baseURL}/getChatLog `;
  const token = getCookie('auth_token');
  const handleScrollToBottom = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    socket.emit('onChat', userInfo.userid, selectedChat.room_id, 'connected');

    return () => {
      socket.emit(
        'onChat',
        userInfo.userid,
        selectedChat.room_id,
        'disconnected'
      );
      socket.off('onChat');
    };
  }, [selectedChat]);

  useEffect(() => {
    async function fetchChatLog() {
      try {
        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            room_id: selectedChat.room_id,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        dispatch(setChatLog(data));
      } catch (error) {
        console.log(error);
      }
    }
    fetchChatLog();
  }, [url, selectedChat]);

  useEffect(() => {
    handleScrollToBottom();
  }, [chatLog]);

  return (
    <div
      style={{
        backgroundImage: 'url(/chat1.jpg)',
      }}
      className=' h-[85%]  overflow-auto  flex flex-col gap-3 py-10 px-[10px] sm:px-[50px] md:px-[100px] xl:px-[200px]   '
    >
      {chatLog.length > 0 &&
        chatLog.map((item: ChatLog, index: number) => {
          return <ChatLogMessage key={index} item={item} />;
        })}
      <div ref={ref}></div>
    </div>
  );
};

export default ChatLogMid;
