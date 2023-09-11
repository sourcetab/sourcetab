import * as presets from '~/presets';
import {genId} from '~/utils';

const defaultLinks = [
  'amazon',
  'google',
  'github',
  'netflix',
  'wikipedia',
  'youtube',
];

export default function genDefaultData(): StorageObject {
  const defaultWorkspace = genId();

  const data: StorageObject = {
    sourcetab: VERSION,
    date: Date.now(),
    user: {},
    workspace: defaultWorkspace,
    workspaces: {
      [defaultWorkspace]: {
        name: 'Main',
        widgets: {
          main: {
            children: [],
          } as unknown as WidgetData,
          tl: {
            children: [],
          } as unknown as WidgetData,
          tc: {
            children: [],
          } as unknown as WidgetData,
          tr: {
            children: [],
          } as unknown as WidgetData,
        },
      },
    },
    files: {},
    local: {sync: false, updated: false},
  };

  // const clockId = genId();
  // data.widgets[clockId] = { type: 'clock', name: 'Clock' };
  // data.workspaces[defaultWorkspace].widgets.left.push(clockId);

  for (const link of defaultLinks) {
    const id = genId();
    data.workspaces[defaultWorkspace].widgets[id] = presets.widgets[link];
    data.workspaces[defaultWorkspace].widgets.main.children?.push(id);
  }

  return data;
}
