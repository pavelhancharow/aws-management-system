import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

interface QueryData {
  [key: string]: string | number | null;
}

export const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => {
    const searchParams = new URLSearchParams(search);
    const data: QueryData = Object.fromEntries(searchParams.entries());

    if (data.page) {
      data.page = parseInt(data.page as string, 10);
    }

    return data;
  }, [search]);
};
