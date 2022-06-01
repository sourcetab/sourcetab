import {SimpleIconsContextProvider} from './components/SimpleIcons';
import {DateContextProvider} from './hooks/useDate/dateContext';
import ThemeContextProvider from './ThemeContextProvider';

const GlobalContexts: FC = ({children}) => (
  <ThemeContextProvider>
    <SimpleIconsContextProvider>
      <DateContextProvider>{children}</DateContextProvider>
    </SimpleIconsContextProvider>
  </ThemeContextProvider>
);

export default GlobalContexts;
