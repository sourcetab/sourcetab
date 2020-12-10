import { useState } from 'react';
import useEventListener from '@use-it/event-listener';
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

  useEventListener('storageChange', e => {
    if (Object.keys(e.detail).includes(key)) {
      setStoredValue(e.detail[key].newValue);
    }
  });

  return [
    storedValue,
    value => {
      setStoredValue(value);
      set(key, value);
    },
  ];
}
