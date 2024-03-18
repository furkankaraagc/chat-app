import { setSelectedChat } from '@/redux/features/chatSlice';
import { RootState } from '@/redux/store';
import { formatDistanceToNow, fromUnixTime } from 'date-fns';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

const ChatFriendListItem = ({ item }: any) => {
  const dispatch = useDispatch();
  const { selectedChat } = useSelector(
    (state: RootState) => state.chatSlice.value,
  );

  const formatTime = (unix: any): any => {
    const numberUnix = Number(unix);
    const x = fromUnixTime(numberUnix);
    const providedDate = new Date(x);
    return formatDistanceToNow(providedDate, { addSuffix: true });
  };

  return (
    <article
      onClick={() => dispatch(setSelectedChat(item))}
      className={` relative ease-in-out flex justify-between  text-white border-b border-gray-500 p-4 cursor-pointer ${
        selectedChat.username === item.username
          ? 'bg-[#2A3942]'
          : 'hover:bg-[#1F2C33]'
      }  active:opacity-85 `}
    >
      <section className='flex gap-3'>
        <section className='relative'>
          <div className='rounded-full h-16 w-16 bg-gray-600 flex justify-center items-center'>
            <Image src={'/person.svg'} alt='' width={50} height={50} />
          </div>
          {item.connected === 'true' && (
            <div className='absolute bottom-0 right-1 h-5 w-5 bg-green-500 rounded-full border-[2px] border-black'></div>
          )}
        </section>
        <article className='flex flex-col gap-1'>
          <h2>{item.username}</h2>
          {item.last_message && (
            <section
              className={`text-sm ${
                Number(item.notification) !== 0
                  ? 'text-white'
                  : 'text-gray-300 '
              } flex`}
            >
              <p>{item.last_message_by}:</p>
              <p className='truncate max-w-[100px]'>{item.last_message}</p>
            </section>
          )}
        </article>
      </section>

      {item.last_message_timestamp && (
        <span className='text-sm max-w-[70px]  text-gray-300'>
          {formatTime(item.last_message_timestamp)}
        </span>
      )}

      {item.notification !== '0' && item.notification !== 0 && (
        <div className='absolute w-5 h-5 flex justify-center items-center right-1 top-1 text-sm p-2 bg-red-500 rounded-full'>
          <span className=' text-white  text-md'>{item.notification}</span>
        </div>
      )}
    </article>
  );
};

export default ChatFriendListItem;
