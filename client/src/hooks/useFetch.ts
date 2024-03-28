import { useEffect, useState } from 'react';
interface FetchResult<T> {
  data: T[] | undefined;
  error: {} | undefined;
  loading: boolean;
}

const useFetch = <T>(endpoint: string): FetchResult<T> => {
  const [data, setData] = useState<T[] | undefined>([]);
  const [error, setError] = useState<{} | undefined>({});
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
      .then((data: T[]) => {
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
