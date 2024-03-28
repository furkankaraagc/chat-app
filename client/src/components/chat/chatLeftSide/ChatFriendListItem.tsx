import { setSelectedChat } from '@/redux/features/chatSlice';
import { RootState } from '@/redux/store';
import { FriendList } from '@/types/chatTypes';
import { formatDistanceToNow, fromUnixTime } from 'date-fns';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  item: FriendList;
}

const ChatFriendListItem = ({ item }: Props) => {
  const dispatch = useDispatch();
  const { selectedChat } = useSelector(
    (state: RootState) => state.chatSlice.value,
  );

  const formatTime = (unix: string) => {
    const numberUnix = Number(unix);
    const x = fromUnixTime(numberUnix);
    const providedDate = new Date(x);
    return formatDistanceToNow(providedDate, { addSuffix: true });
  };

  return (
    <article
      onClick={() => dispatch(setSelectedChat(item))}
      className={` relative ease-in-out flex justify-between max-h-[100px] border-gray-500 p-4 cursor-pointer rounded-2xl  ${
        selectedChat.username === item.username
          ? 'bg-[#3390EC] text-white'
          : 'hover:bg-gray-200 text-black '
      }  active:opacity-85 `}
    >
      <section className='flex gap-3'>
        <section className='relative'>
          <Image
            className='rounded-full min-h-16 min-w-16 object-cover'
            src={'/auth6.png'}
            alt=''
            width={50}
            height={50}
          />
          {item.connected === 'true' && (
            <div className='absolute bottom-0 right-1 h-5 w-5 bg-green-500 rounded-full border-[2px] border-black'></div>
          )}
        </section>
        <article className='flex flex-col gap-1'>
          <h2>{item.username}</h2>
          {item.last_message && (
            <section
              className={`text-sm  ${
                selectedChat.username === item.username
                  ? 'text-gray-200'
                  : 'text-gray-500'
              } flex`}
            >
              <p>{item.last_message_by}:</p>
              <p className='truncate max-w-[40px] lg:max-w-[60px] xl:max-w-[100px]'>
                {item.last_message}
              </p>
            </section>
          )}
        </article>
      </section>

      {item.last_message_timestamp && (
        <span
          className={`text-sm max-w-[70px]   ${
            selectedChat.username === item.username
              ? 'text-gray-200'
              : 'text-gray-500'
          }`}
        >
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
