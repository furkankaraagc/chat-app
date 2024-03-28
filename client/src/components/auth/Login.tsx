'use client';
import useOnFetch from '@/hooks/useOnFetch';
import { baseURL } from '@/utils/utils';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

const Login = () => {
  const [userInfo, setUserInfo] = useState({ username: '', password: '' });
  const { data, error, loading, handleFetch } = useOnFetch();
  const router = useRouter();
  const endpoint = `${baseURL}/auth/login`;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await handleFetch(endpoint, userInfo);
    if (res && res.loggedIn) {
      setCookie('auth_token', res.token);
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleLogin} className='w-[400px] flex flex-col gap-5'>
      <fieldset className='flex flex-col gap-3'>
        <label className='font-medium text-[16px]' htmlFor='username'>
          Username
        </label>
        <input
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, username: e.target.value }))
          }
          className={`input-auth ${
            error &&
            error.error &&
            'border-red-500 hover:border-red-500 focus:border-red-500'
          }`}
          name='username'
          type='text'
          required
        />
        {error && error.error && (
          <span className='text-red-500 text-sm'>{error.error}</span>
        )}
      </fieldset>
      <fieldset className='flex flex-col gap-2'>
        <label className='font-medium text-[16px]' htmlFor='password'>
          Password
        </label>
        <input
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, password: e.target.value }))
          }
          className='input-auth'
          name='password'
          type='password'
          required
        />
      </fieldset>

      <button className='button-dark ' type='submit'>
        <div className='flex   relative  items-center gap-4 text-white'>
          <p>Login</p>
          {loading && (
            <ClipLoader
              className='absolute -right-8'
              color='#E7F0FE'
              size={20}
            />
          )}
        </div>
      </button>
    </form>
  );
};

export default Login;
