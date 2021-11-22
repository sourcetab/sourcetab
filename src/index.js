import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';

import { StorageProvider } from './js/hooks/useStorageSetup';

import App from './js/App';
import './style.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <StorageProvider>
      <App />
    </StorageProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
