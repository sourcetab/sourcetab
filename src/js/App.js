import { useState } from 'react';

import Background from './components/background/Background';
import ToolBar from './components/toolbar/ToolBar';
import WebsiteContainer from './components/website/WebsiteContainer';
import SettingsDialog from './components/settings';

export default function App() {
  const [websiteDialogIndex, setWebsiteDialogIndex] = useState();
  const [editMode, setEditMode] = useState(false);
  const [settings, setSettings] = useState(false);

  return (
    <div>
      <Background />
      <ToolBar
        {...{ editMode, setEditMode, setWebsiteDialogIndex, setSettings }}
      />
      <WebsiteContainer
        {...{ editMode, websiteDialogIndex, setWebsiteDialogIndex }}
      />
      <SettingsDialog {...{ settings, setSettings }} />
    </div>
  );
}
