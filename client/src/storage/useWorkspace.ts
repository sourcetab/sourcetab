import { deepmerge } from '~/utils';
import { setStorage, storage } from '.';
import { defaultSettings } from './defaultSettings';

export const useWorkspace: () => Inter<Workspace> = () => {
  const rawWorkspace = storage.workspaces[storage.workspace];

  const workspace = deepmerge(
    {
      name: '',
      widgets: {},
      settings: deepmerge(defaultSettings, storage.user.settings),
    },
    rawWorkspace,
  ) as DeepRequired<Workspace>;

  workspace.settings.theme.widget.fontFamily ??=
    workspace.settings.theme.fontFamily;
  workspace.settings.theme.widget.labelFont.family ??=
    workspace.settings.theme.fontFamily;
  workspace.settings.theme.widgetHover = deepmerge(
    workspace.settings.theme.widget,
    workspace.settings.theme.widgetHover,
  );

  return [
    workspace,
    (fn) =>
      setStorage((state) => {
        fn(state.workspaces[state.workspace]);
      }),
    rawWorkspace,
  ];
};
