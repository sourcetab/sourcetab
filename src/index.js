import ReactDOM from 'react-dom';

import { StorageProvider } from './js/hooks/useStorageSetup';

import App from './js/App';
import './style.css';

ReactDOM.render(
  <StorageProvider>
    <App />
  </StorageProvider>,
  document.getElementById('root')
);
