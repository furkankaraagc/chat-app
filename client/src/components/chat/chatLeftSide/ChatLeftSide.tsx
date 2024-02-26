import ChatAddFriend from './ChatAddFriend';
import ChatFriendList from './ChatFriendList';

const ChatLeftSide = () => {
  return (
    <div className=' border-r flex flex-col border-gray-500 min-w[300px] w-[40%]'>
      <ChatAddFriend />
      <ChatFriendList />
    </div>
  );
};

export default ChatLeftSide;
