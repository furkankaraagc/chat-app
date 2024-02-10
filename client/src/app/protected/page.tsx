'use client';
import socket from '@/socket';
import React, { useState } from 'react';

const Page = () => {
  const [value, setValue] = useState('');
  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('add_friend', value, ({ error, done }: any) => {
      if (done) {
        return console.log('doneeee');
      } else {
        console.log('socket_emit-erro', error);
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleAddFriend}>
        <input
          onChange={(e) => setValue(e.target.value)}
          className='border p-3 '
          type='text'
        />
        <button type='submit'>add friend</button>
      </form>
    </div>
  );
};

export default Page;
