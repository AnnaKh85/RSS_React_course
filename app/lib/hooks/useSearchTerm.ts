import { useState, useEffect } from 'react';

export const useSearchTerm = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
    return () => {
      localStorage.setItem(key, value);
    };
  }, [key, value]);

  return [value, setValue] as const;
};
