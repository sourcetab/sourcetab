import {batch} from 'solid-js';
import {createStore, produce} from 'solid-js/store';
import genDefaultData from './genDefaultData';
import parseStorageData from './parseStorageData';
import {storageGet, storageListen, storageSet} from './storageInterface';

const key = 'sourcetab';

/* @ts-expect-error */
const [rawStorage, setRawStorage] = createStore<StorageObject>();

storageGet<StorageObject>(key).then((v) => {
  const newValue = parseStorageData(v, true) ?? genDefaultData();
  setRawStorage(newValue);
  console.log('init', rawStorage);
});

storageListen<StorageObject>(key, (value) => {
  if (value.date > rawStorage.date) setRawStorage(value);
});

export {rawStorage as storage};
export const setStorage = (fn: (state: StorageObject) => void) => {
  console.log('prev', rawStorage.date);
  batch(() => {
    setRawStorage(produce(fn));
    setRawStorage('date', Date.now());
  });
  console.log('next', rawStorage.date);
  storageSet(key, rawStorage);
};
