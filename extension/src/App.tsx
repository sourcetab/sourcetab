import {useEffect} from 'react';

import useStorage from './hooks/useStorage';
import Background from './views/Background';
import ReleaseNotes from './views/ReleaseNotes';
import WidgetRenderer from './views/WidgetRenderer';

const App: FC = () => {
  const [data] = useStorage();

  useEffect(() => {
    document.title = data.settings.pageTitle;
  }, [data.settings.pageTitle]);

  return (
    <>
      <Background />
      <WidgetRenderer />
      {data.releaseNotes ? <ReleaseNotes /> : null}
    </>
  );
};

export default App;
