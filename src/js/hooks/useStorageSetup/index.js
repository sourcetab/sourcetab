import { createContext, useState, useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import storageReducer from './storageReducer';
import useStorageChangeListener from '../useStorageChangeListener';
import getStoredData from './get';
import getKey from './old/getKey';
import deleteKey from './old/deleteKey';
import setStoredData from './set';
import data from './data';

export const storageStateContext = createContext();
export const storageDispatchContext = createContext();

export const StorageProvider = props => {
  const [state, setState] = useState(data.placeholder);

  const dispatch = storageReducer(state, value => {
    setState(value);
    setStoredData(value);
  });

  useEffect(() => {
    getStoredData().then(value => {
      if (value) {
        setState(value);
      } else {
        getKey('websites').then(websites => {
          if (websites) {
            // migrate data from versions less then 2.3.0
            setState({ ...data.default, websites });
            deleteKey('websites');
            deleteKey('clockConfig');
          } else {
            setState(data.default);
          }
        });
      }
    });
  }, []);

  useStorageChangeListener(value => {
    if (!isEqual(state, value)) {
      setState(value);
    }
  });

  return (
    <storageStateContext.Provider value={state}>
      <storageDispatchContext.Provider value={dispatch}>
        {props.children}
      </storageDispatchContext.Provider>
    </storageStateContext.Provider>
  );
};
