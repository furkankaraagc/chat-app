import { useState } from 'react';
interface OnFetchResult<T> {
  data: T[] | undefined;
  error:
    | { usernameError?: string; passwordError?: string; error?: string }
    | undefined;

  setError: React.Dispatch<
    React.SetStateAction<{
      usernameError?: string;
      passwordError?: string;
      error?: string;
    }>
  >;
  loading: boolean;
  handleFetch: (endpoint: string, body: T) => Promise<any>;
}

const useOnFetch = <T>(): OnFetchResult<T> => {
  const [data, setData] = useState<T[] | undefined>([]);
  const [error, setError] = useState<any>({});
  const [loading, setLoading] = useState(false);

  async function handleFetch(endpoint: string, body: T) {
    setLoading(true);
    try {
      const res = await fetch(`${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok || res.status >= 400) {
        return setError({ error: 'Invalid username or password!' });
      }
      const responseData = await res.json();
      setData(responseData);
      setError(undefined);
      return responseData;
    } catch (error: any) {
      console.log(error);
      setError({ error: 'Something went wrong' });
      setData(undefined);
      return error;
    } finally {
      setLoading(false);
    }
  }

  return { data, error, setError, loading, handleFetch };
};
export default useOnFetch;
