import useSocket from '@/hooks/useSocket';
import { RootState } from '@/redux/store';

import { FriendList } from '@/types/chatTypes';
import { useSelector } from 'react-redux';
import ChatFriendListItem from './ChatFriendListItem';

const ChatFriendList = () => {
  const { friendList } = useSelector(
    (state: RootState) => state.userSlice.value,
  );

  useSocket();

  return (
    <div className='px-2'>
      {friendList &&
        friendList.map((item: FriendList, index: number) => (
          <ChatFriendListItem key={index} item={item} />
        ))}
    </div>
  );
};

export default ChatFriendList;
