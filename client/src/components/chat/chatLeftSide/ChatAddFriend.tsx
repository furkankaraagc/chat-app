import socket from '@/socket';
import Image from 'next/image';
import React, { useState } from 'react';
const ChatAddFriend = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('add_friend', value, ({ errorMessage, isDone }: any) => {
      setError(errorMessage);
      setStatus(isDone);
    });
  };
  return (
    <div className=''>
      {status ? <div>{status}</div> : error ? <div>{error}</div> : null}

      <form className='p-5 flex gap-2' onSubmit={handleAddFriend}>
        <input
          onChange={(e) => setValue(e.target.value)}
          className='bg-[#1F2C33] h-10 rounded-md p-2 outline-none'
          type='text'
          placeholder='add a friend'
        />
        <button
          className=' p-3  h-10 w-10  bg-[#2A3942] rounded-md'
          type='submit'
        >
          <Image src={'/plus.svg'} alt='' width={20} height={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatAddFriend;
