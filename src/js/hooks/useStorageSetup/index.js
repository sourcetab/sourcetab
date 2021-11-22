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
      const finalize = newValue => {
        if (
          newValue.background.url.endsWith(
            '3bbba8741b135f531008326a253e21c5.jpeg'
          )
        )
          newValue.background.url = 'beach.jpg';

        if (Object.prototype.hasOwnProperty.call(newValue, 'version')) {
          delete newValue.version;
        }

        newValue.ver = data.default.ver;

        setState(newValue);
      };

      if (value) {
        finalize(value);
      } else {
        getKey('websites').then(websites => {
          if (websites) {
            // migrate data from versions less then 2.3.0
            deleteKey('websites');
            deleteKey('clockConfig');
            finalize({ ...data.default, websites });
          } else {
            finalize(data.default);
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
