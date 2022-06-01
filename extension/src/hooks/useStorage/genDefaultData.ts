import {simpleIconsConfig} from '@/components/SimpleIcons';
import {weblauncherVersion} from '@/globals';
import {genId} from '@/utils';
import widgets from '@/widgets';

const defaultLinks: Array<[string, string]> = [
  ['amazon', 'https://www.amazon.com'],
  ['google', 'https://www.google.com'],
  ['github', 'https://github.com'],
  ['netflix', 'https://www.netflix.com'],
  ['wikipedia', 'https://www.wikipedia.org'],
  ['youtube', 'https://www.youtube.com'],
];

const defaultLeftToolbarWidgets: StoredWidgetType[] = [
  {
    t: 'clock',
    d: {label: 'Clock', time: '12', seconds: true, date: 'short', format: ''},
  },
];

export default function genDefaultData(genWidgets = true): StorageObject {
  const globalWidgetSettings: StorageObject['settings']['widgets'] = {};

  for (const widget of Object.keys(widgets)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    globalWidgetSettings[widget] = widgets[widget].defaultGlobalData;
  }

  const data: StorageObject = {
    weblauncher: weblauncherVersion,
    date: Date.now(),
    releaseNotes: false,
    widgets: {
      // @ts-expect-error
      d: {c: []},
      // @ts-expect-error
      tl: {c: []},
      // @ts-expect-error
      tc: {c: []},
      // @ts-expect-error
      tr: {c: ['m']},
    },
    settings: {
      widgets: globalWidgetSettings,
      bg: ['image', 'beach.jpg'],
      themeColor: '2196F3CC',
      darkMode: 'auto',
      pageTitle: 'Web Launcher',
      borderRadius: 8,
      showHelp: true,
      dashboard: {
        columns: 0,
        margin: 70,
        gap: 50,
        radius: 16,
        size: 125,
      },
      toolbar: {
        position: 'top',
      },
    },
    files: {},
  };

  if (genWidgets) {
    const pushWidgets = (from: StoredWidgetType[], to: string[]): void => {
      for (const v of from) {
        const id = genId();
        data.widgets[id] = v;
        to.push(id);
      }
    };

    pushWidgets(
      defaultLinks.map((link) => ({
        t: 'link',
        d: {
          label: simpleIconsConfig[link[0]][0],
          url: link[1],
          fgType: 'ico',
          fgData: link[0],
          bgColor: simpleIconsConfig[link[0]][1],
          fgColor: simpleIconsConfig[link[0]][2] ? 'FFFFFF' : '000000',
          scale: 100,
        },
      })),
      data.widgets.d.c!,
    );
    pushWidgets(defaultLeftToolbarWidgets, data.widgets.tl.c!);
  }

  return data;
}
