import React, { useState } from 'react';

import Background from './components/background/Background';
import ToolBar from './components/toolbar/ToolBar';
import WebsiteContainer from './components/website/WebsiteContainer';

export default function App() {
  const [websiteDialogIndex, setWebsiteDialogIndex] = useState();
  const [editMode, setEditMode] = useState(false);

  return (
    <div>
      <Background />
      <ToolBar {...{ editMode, setEditMode, setWebsiteDialogIndex }} />
      <WebsiteContainer
        {...{ editMode, websiteDialogIndex, setWebsiteDialogIndex }}
      />
    </div>
  );
}
