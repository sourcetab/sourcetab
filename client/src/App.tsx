import { Component, createEffect, onMount } from 'solid-js';
import Background from './Background';
import Renderer from './renderer';
import { storage } from './storage';
import { useWorkspace } from './storage/useWorkspace';

const App: Component = () => {
  const [ws] = useWorkspace();

  createEffect(() => {
    document.title = ws.settings.page.pageTitle;
  });

  return (
    <>
      <Background />
      <Renderer />
    </>
  );
};

export default App;
