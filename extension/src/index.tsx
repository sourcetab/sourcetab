import {CssBaseline} from '@mui/material';
import {useContext} from 'react';
import {createRoot} from 'react-dom/client';

import {
  storageContext,
  StorageContextProvider,
} from '@/hooks/useStorage/storageContext';
import App from './App';
import GlobalContexts from './GlobalContexts';

// Only render app if storage is loaded
const StorageCatcher: FC = ({children}) => (
  <>{useContext(storageContext) ? children : undefined}</>
);
createRoot(document.querySelector('#root')).render(
  <>
    <StorageContextProvider>
      <StorageCatcher>
        <GlobalContexts>
          <CssBaseline />
          <App />
        </GlobalContexts>
      </StorageCatcher>
    </StorageContextProvider>
  </>,
);
