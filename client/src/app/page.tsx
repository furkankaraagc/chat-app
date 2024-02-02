'use client';
import Image from 'next/image';

export default function Home() {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('asd');
  };
  return (
    <main className='w-full h-screen flex justify-center '>
      <form
        onSubmit={handleLogin}
        className='w-[400px] mt-20 flex flex-col gap-5'
      >
        <fieldset className='flex flex-col gap-3'>
          <label htmlFor='username'> username</label>
          <input
            placeholder='username'
            className='py-1 px-3 rounded-md border  bg-gray-200'
            name='username'
            type='text'
          />
        </fieldset>
        <fieldset className='flex flex-col gap-2'>
          <label htmlFor='password'> password</label>
          <input
            placeholder='password'
            className='py-1 px-3 rounded-md border  bg-gray-200'
            name='password'
            type='password'
          />
        </fieldset>
        <button className='p-3 rounded-md bg-blue-500' type='submit'>
          Login
        </button>
        <button className='p-3 rounded-md bg-blue-500' type='submit'>
          Register
        </button>
      </form>
    </main>
  );
}
