import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import ChatImage from '../ChatImage';
import ChatLogBottom from './ChatLogBottom';
import ChatLogMid from './ChatLogMid';
import ChatLogTop from './ChatLogTop';

const ChatLogSide = () => {
  const { selectedChat } = useSelector(
    (state: RootState) => state.chatSlice.value,
  );
  return (
    <div className='   w-full h-screen '>
      {selectedChat.username ? (
        <>
          <ChatLogTop />
          <ChatLogMid />
          <ChatLogBottom />
        </>
      ) : (
        <div className='relative h-full '>
          <ChatImage />
          {/* <article className='absolute  top-0 bottom-0 translate-x-1/2 translate-y-1/2	 '>
            <h1 className='font-medium text-2xl'>Your messages</h1>
            <p className='text-gray-200 text-sm'>
              Select friend or group to see messages
            </p>
          </article> */}
        </div>
      )}
    </div>
  );
};

export default ChatLogSide;
