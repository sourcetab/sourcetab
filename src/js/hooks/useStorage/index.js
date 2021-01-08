import { useContext } from 'react';
import {
  storageStateContext,
  storageDispatchContext,
} from '../useStorageSetup';

export default function useStorage() {
  return [useContext(storageStateContext), useContext(storageDispatchContext)];
}
