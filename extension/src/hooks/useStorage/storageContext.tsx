import {createContext, useCallback, useEffect, useState} from 'react';
import {useImmer} from 'use-immer';

import {current} from 'immer';
import {
  storageGetInterface,
  storageListenInterface,
  storageSetInterface,
} from '@/hooks/useStorage/storageInterface';

import genDefaultData from './genDefaultData';
import parseStorageData from './parseStorageData';

export const storageContext = createContext<StorageObject | undefined>(
  undefined,
);
export const setStorageContext = createContext<SetStorageObject>(
  () => undefined,
);

export const StorageContextProvider: FC = ({children}) => {
  const [date, setDate] = useState(0);
  const [storage, setStorage] = useImmer<StorageObject | undefined>(undefined);

  useEffect(() => {
    storageGetInterface().then((value) => {
      const newValue = parseStorageData(value, true) ?? genDefaultData();
      setDate(newValue.date);
      setStorage(newValue);
    });
  }, []);

  useEffect(() => {
    if (storage && date > storage.date) {
      setStorage((storage) => {
        storage!.date = date;
        storageSetInterface(current(storage!));
      });
    }

    return storageListenInterface((value) => {
      if (value.date > date) setStorage(value);
    });
  }, [date]);

  return (
    <storageContext.Provider value={storage}>
      <setStorageContext.Provider
        value={useCallback((arg) => {
          setDate(Date.now());
          setStorage(arg);
        }, [])}
      >
        {children}
      </setStorageContext.Provider>
    </storageContext.Provider>
  );
};
