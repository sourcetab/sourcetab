import {createTheme, ThemeProvider, useMediaQuery} from '@mui/material';
import {useMemo} from 'react';
import useStorage from './hooks/useStorage';

const ThemeContextProvider: FC = ({children}) => {
  const [data] = useStorage();

  const detectDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  let darkMode = false;

  switch (data.settings.darkMode) {
    case 'auto':
      darkMode = detectDarkMode;
      break;
    case 'enabled':
      darkMode = true;
      break;
    default:
      break;
  }

  return (
    <ThemeProvider
      theme={useMemo(
        () =>
          createTheme({
            palette: {
              mode: darkMode ? 'dark' : 'light',
              primary: {main: `#${data.settings.themeColor.slice(0, 6)}`},
            },
            shape: {
              borderRadius: data.settings.borderRadius,
            },
          }),
        [darkMode, data.settings.themeColor, data.settings.borderRadius],
      )}
    >
      {children}
    </ThemeProvider>
  );
};

export default ThemeContextProvider;
