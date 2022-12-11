import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay = 0): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(
    () => {
      const timer = setTimeout(() => setDebounced(value), delay);
      return () => clearTimeout(timer);
    },
    [value, delay]
  );

  return debounced;
}
