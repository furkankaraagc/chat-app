import {RootState} from '@/redux/store';
import socket from '@/socket';
import Image from 'next/image';
import {useState} from 'react';
import {useSelector} from 'react-redux';

const ChatLogBottom = () => {
  const [message, setMessage] = useState('');
  const {selectedChat} = useSelector(
    (state: RootState) => state.chatSlice.value
  );
  const {userInfo} = useSelector((state: RootState) => state.userSlice.value);
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim().length === 0) {
      return;
    }

    socket.emit('onMessage', {
      message_content: message,
      sender_id: userInfo.userid,
      sender_username: userInfo.username,
      receiver_id: selectedChat.room_id,
    });
    setMessage('');
  };

  return (
    <div className='h-[7%] flex justify-center items-center px-10 '>
      <form className=' flex gap-2 items-center w-[80%]' onSubmit={sendMessage}>
        <input
          onChange={(e) => setMessage(e.target.value)}
          className='bg-gray-200 rounded-2xl p-3 w-full text-black outline-none'
          placeholder='Type a message'
          type='text'
          value={message}
        />
        <button type='submit'>
          <Image
            className='w-[40px] h-[40px] '
            src={'/send.svg'}
            alt=''
            width={100}
            height={100}
          />
        </button>
      </form>
    </div>
  );
};

export default ChatLogBottom;
