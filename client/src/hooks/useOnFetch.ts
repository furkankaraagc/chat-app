import { useState } from 'react';
interface OnFetchResult {
  data: any;
  error: any;
  setError: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  handleFetch: (endpoint: string, body: any) => Promise<any>;
}

const useOnFetch = (): OnFetchResult => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>('');
  const [loading, setLoading] = useState(false);

  async function handleFetch(endpoint: string, body: any) {
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
      setError(error);
      setData(undefined);
      return error;
    } finally {
      setLoading(false);
    }
  }

  return { data, error, setError, loading, handleFetch };
};
export default useOnFetch;
