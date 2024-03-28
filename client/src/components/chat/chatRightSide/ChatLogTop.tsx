import { RootState } from '@/redux/store';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const ChatLogTop = () => {
  const { selectedChat } = useSelector(
    (state: RootState) => state.chatSlice.value,
  );
  return (
    <div className='h-[8%] border-b border-gray-500 bg-white text-black px-10 flex gap-2 p-3 '>
      <section className='relative'>
        <Image
          className={'rounded-full w-11 h-11 object-cover'}
          src={'/auth6.png'}
          alt=''
          width={100}
          height={100}
        />
      </section>
      <div>{selectedChat.username}</div>
    </div>
  );
};

export default ChatLogTop;
