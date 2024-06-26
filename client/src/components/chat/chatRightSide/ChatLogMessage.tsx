import {RootState} from '@/redux/store';
import {ChatLog} from '@/types/chatTypes';
import {useSelector} from 'react-redux';

interface Props {
  item: ChatLog;
}

const ChatLogMessage = ({item}: Props) => {
  const {userInfo} = useSelector((state: RootState) => state.userSlice.value);

  return (
    <div className='    '>
      <div className={`flex `}>
        <div
          className={`bg-blue-500 max-w-[65%]  shadow-xl rounded-lg  p-2 ${
            userInfo.userid === item.sender_id ? 'ml-auto' : 'mr-auto'
          }`}
        >
          <p className='break-words '>{item.message_content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatLogMessage;
