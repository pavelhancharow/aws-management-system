import { MutableRefObject, useCallback, useEffect } from 'react';

export const useOutside = (ref: MutableRefObject<HTMLElement | null>, trigger: boolean, callback: () => void) => {
  const handleClickOutside = useCallback((event: any) => {
    const elem = event.target as Node;

    if (trigger && ref.current && !ref.current.contains(elem)) {
      callback();
    }
  }, [ref, callback, trigger]);

  useEffect(() => {
    document.body.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.body.removeEventListener('mousedown', handleClickOutside);
    };
  }, [trigger, handleClickOutside]);
};