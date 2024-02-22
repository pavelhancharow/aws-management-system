import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useFilter = (callback: (filters: Record<string, unknown>) => void) => {
  const [filters, setFilters] = useState({ page: '1', limit: '25', order: 'asc' })
  const [, setSearchParams] = useSearchParams();

  const handleChangeFilters = (event: { currentTarget: Record<string, string> }) => {
    const current = event.currentTarget;

    setFilters((state) => ({
      ...state,
      [current.name]: current.value.trim(),
      ...(current.name === 'limit' ? { page: '1' } : {}),
    }));
  };

  const handleChangePagination = (trigger: number) => {
    const page = `${trigger}`;

    setFilters(state => ({ ...state, page }));
  };

  const handleClearFilters = () => {
    setFilters({ page: '1', limit: '25', order: 'asc' })
  }

  useEffect(() => {
    callback(filters);
    setSearchParams(filters);
    // eslint-disable-next-line
  }, [filters]);

  return { filters, handleChangeFilters, handleChangePagination, handleClearFilters }
};
