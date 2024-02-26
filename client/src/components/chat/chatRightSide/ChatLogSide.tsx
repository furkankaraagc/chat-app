import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import ChatLogBottom from './ChatLogBottom';
import ChatLogMid from './ChatLogMid';
import ChatLogTop from './ChatLogTop';

const ChatLogSide = () => {
  const { selectedChat } = useSelector(
    (state: RootState) => state.chatSlice.value,
  );
  return (
    <div className='  text-white w-full'>
      {selectedChat ? (
        <>
          <ChatLogTop />
          <ChatLogMid />
          <ChatLogBottom />
        </>
      ) : (
        <article className='flex justify-center text-center  h-full flex-col items-center  gap-2 '>
          <h1 className='font-medium text-2xl'>Your messages</h1>
          <p className='text-gray-200 text-sm'>
            Select friend or group to see messages
          </p>
        </article>
      )}
    </div>
  );
};

export default ChatLogSide;
