import { useEffect, useState } from 'react';
import get from './get';
import set from './set';

export default function useStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    get(
      key,
      typeof initialValue === 'function' ? initialValue() : initialValue
    ).then(result => {
      setStoredValue(result);
    });
    return initialValue;
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => set(key, storedValue), [storedValue]);

  return [storedValue, setStoredValue];
}
