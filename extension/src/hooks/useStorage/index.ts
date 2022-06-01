import {useContext} from 'react';

import {setStorageContext, storageContext} from './storageContext';

export default function useStorage(): [StorageObject, SetStorageObject] {
  return [useContext(storageContext)!, useContext(setStorageContext)];
}
