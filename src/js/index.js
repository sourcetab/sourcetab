import ReactDOM from 'react-dom';

import { StorageProvider } from './hooks/useStorageSetup';

import App from './App';
import '../style.css';

ReactDOM.render(
  <StorageProvider>
    <App />
  </StorageProvider>,
  document.getElementById('root')
);
