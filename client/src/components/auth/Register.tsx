'use client';
import useOnFetch from '@/hooks/useOnFetch';
import { baseURL } from '@/utils/utils';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
interface AuthTypes {
  username: string;
  password: string;
}
const Register = () => {
  const [userInfo, setUserInfo] = useState({ username: '', password: '' });
  const { data, error, setError, loading, handleFetch } = useOnFetch();
  const router = useRouter();
  const endpoint = `${baseURL}/auth/register`;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo.username.length < 3) {
      return setError({ usernameError: 'Invalid username: minimum length 6' });
    } else if (userInfo.password.length < 3) {
      return setError({ passwordError: 'Invalid password: minimum length 6' });
    }
    const res = await handleFetch(endpoint, userInfo);
    if (res) {
      setCookie('auth_token', res.token);
      router.push('/');
    }
  };
  // console.log(error);
  return (
    <form onSubmit={handleRegister} className='w-[400px] flex flex-col gap-5'>
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
            error?.usernameError &&
            'border-red-500 hover:border-red-500 focus:border-red-500'
          }`}
          name='username'
          type='text'
          required
        />
        {error && error?.usernameError && (
          <span className='text-red-500 text-sm'>
            {error && error?.usernameError}
          </span>
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
          className={`input-auth ${
            error &&
            error.passwordError &&
            'border-red-500 hover:border-red-500 focus:border-red-500'
          }`}
          name='password'
          type='password'
          required
        />
        {error && error?.passwordError && (
          <span className='text-red-500 text-sm'>
            {error && error?.passwordError}
          </span>
        )}
      </fieldset>

      <button className='button-dark ' type='submit'>
        <div className='flex   relative  items-center gap-4 text-white'>
          <p>Register</p>
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

export default Register;
