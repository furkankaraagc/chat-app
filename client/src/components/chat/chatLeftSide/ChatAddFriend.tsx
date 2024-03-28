import socket from '@/socket';
import Image from 'next/image';
import React, { useState } from 'react';
const ChatAddFriend = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<boolean | null>(null);

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit(
      'add_friend',
      value,
      ({ errorMessage, isDone }: { errorMessage: string; isDone: boolean }) => {
        setError(errorMessage);
        setStatus(isDone);
      },
    );
    setValue('');
  };
  return (
    <div className=''>
      {status ? (
        <div>{status}</div>
      ) : error ? (
        <div className=' flex justify-center '>{error}</div>
      ) : null}

      <form className='p-5 flex gap-2' onSubmit={handleAddFriend}>
        <input
          onChange={(e) => setValue(e.target.value)}
          className='bg-gray-200 h-10 rounded-2xl text-black p-3 outline-none'
          type='text'
          placeholder='add a friend'
          value={value}
        />
        <button
          className=' p-3  h-10 w-10  bg-gray-200 rounded-full'
          type='submit'
        >
          <Image src={'/plus.svg'} alt='' width={20} height={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatAddFriend;
