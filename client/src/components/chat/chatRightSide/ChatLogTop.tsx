import { RootState } from '@/redux/store';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const ChatLogTop = () => {
  const { selectedChat } = useSelector(
    (state: RootState) => state.chatSlice.value,
  );
  return (
    <div className='h-[10%] border-b border-gray-500 bg-[#1F2C33] px-10 flex gap-2 p-3 '>
      <section className='relative'>
        <div className='rounded-full h-14 w-14 bg-gray-600 flex justify-center items-center'>
          <Image src={'/person.svg'} alt='' width={40} height={40} />
        </div>
      </section>
      <div>{selectedChat.username}</div>
    </div>
  );
};

export default ChatLogTop;
