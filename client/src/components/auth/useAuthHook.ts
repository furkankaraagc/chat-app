import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AuthTypes {
  username: string;
  password: string;
}
const useAuthHook = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const router = useRouter();

  const handleRegister = async (userInfo: AuthTypes, e: React.MouseEvent) => {
    e.preventDefault();
    const { username, password } = userInfo;
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setData(data);
      if (!response.ok || response.status >= 400) {
        return;
      } else {
        router.push('/');
      }
    } catch (error: any) {
      console.log(error);
      setData(error);
    } finally {
      setLoading(false);
    }
  };
  const handleLogin = async (userInfo: AuthTypes, e: React.MouseEvent) => {
    e.preventDefault();
    const { username, password } = userInfo;
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setData(data);
      if (!response.ok || response.status >= 400) {
        return;
      } else {
        router.push('/');
      }
    } catch (error: any) {
      console.log(error);
      setData(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    handleRegister,
    loading,
    data,
  };
};
export default useAuthHook;
