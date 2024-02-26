import useSocket from '@/hooks/useSocket';
import { RootState } from '@/redux/store';

import { useSelector } from 'react-redux';
import ChatFriendListItem from './ChatFriendListItem';

const ChatFriendList = () => {
  const { friendList } = useSelector(
    (state: RootState) => state.userSlice.value,
  );

  useSocket();

  return (
    <div>
      {friendList &&
        friendList.map((item: any, index: number) => (
          <ChatFriendListItem key={index} item={item} />
        ))}
    </div>
  );
};

export default ChatFriendList;
