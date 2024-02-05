'use client';
import React, { useState } from 'react';
import useAuthHook from './useAuthHook';

const Auth = () => {
  const { handleLogin, handleRegister, data, loading } = useAuthHook();

  const [userInfo, setUserInfo] = useState({ username: '', password: '' });

  return (
    <main className='w-full h-screen flex justify-center '>
      <div className='w-[400px] mt-20 flex flex-col gap-5'>
        <fieldset className='flex flex-col gap-3'>
          <label htmlFor='username'> username</label>
          <input
            onChange={(e) =>
              setUserInfo((prev) => ({ ...prev, username: e.target.value }))
            }
            placeholder='username'
            className='py-1 px-3 rounded-md border  bg-gray-200'
            name='username'
            type='text'
          />
        </fieldset>
        <fieldset className='flex flex-col gap-2'>
          <label htmlFor='password'> password</label>
          <input
            onChange={(e) =>
              setUserInfo((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder='password'
            className='py-1 px-3 rounded-md border  bg-gray-200'
            name='password'
            type='password'
          />
        </fieldset>
        {data.error && (
          <div className='bg-red-500 text-white p-3 rounded-md'>
            {data.error}
          </div>
        )}
        <button
          onClick={(e) => handleLogin(userInfo, e)}
          className='p-3 rounded-md bg-blue-500'
          type='button'
        >
          {loading ? <div>loading...</div> : <div>login</div>}
        </button>
        <button
          onClick={(e) => handleRegister(userInfo, e)}
          className='p-3 rounded-md bg-blue-500'
          type='button'
        >
          {loading ? <div>loading...</div> : <div>Register</div>}
        </button>
      </div>
    </main>
  );
};

export default Auth;
