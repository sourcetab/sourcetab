import {DateContextProvider} from './hooks/useDate/dateContext';
import ThemeContextProvider from './ThemeContextProvider';

const GlobalContexts: FC = ({children}) => (
  <ThemeContextProvider>
    <DateContextProvider>{children}</DateContextProvider>
  </ThemeContextProvider>
);

export default GlobalContexts;
