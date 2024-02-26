import { useEffect, useState } from 'react';

const useFetch = async (endpoint: string) => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<string | undefined>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    fetch(`${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then((data) => {
        if (!ignore) {
          setData(data);
          setError(undefined);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err);
          setData(undefined);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [endpoint]);
  return { data, error, loading };
};
export default useFetch;
