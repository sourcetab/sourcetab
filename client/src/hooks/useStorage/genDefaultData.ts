import {genId} from '@/utils';
import widgets from '@/widgets';

const defaultWidgets: StoredWidgetType[] = [
  {
    t: 'link',
    d: {
      label: 'Amazon',
      url: 'https://www.amazon.com',
      fgType: 'ico',
      fgData: 'simple-icons:amazon',
      bgColor: 'FF9900',
      fgColor: 'FFFFFF',
      scale: 100,
    },
  },
  {
    t: 'link',
    d: {
      label: 'GitHub',
      url: 'https://github.com',
      fgType: 'ico',
      fgData: 'simple-icons:github',
      bgColor: '181717',
      fgColor: 'FFFFFF',
      scale: 100,
    },
  },
  {
    t: 'link',
    d: {
      label: 'Google',
      url: 'https://www.google.com',
      fgType: 'ico',
      fgData: 'logos:google-icon',
      bgColor: 'FFFFFF',
      fgColor: '000000',
      scale: 100,
    },
  },
  {
    t: 'link',
    d: {
      label: 'Microsoft',
      url: 'https://www.microsoft.com',
      fgType: 'ico',
      fgData: 'logos:microsoft-icon',
      bgColor: 'FFFFFF',
      fgColor: '000000',
      scale: 100,
    },
  },
  {
    t: 'link',
    d: {
      label: 'Netflix',
      url: 'https://www.netflix.com',
      fgType: 'ico',
      fgData: 'simple-icons:netflix',
      bgColor: '000000',
      fgColor: 'E50914',
      scale: 100,
    },
  },
  {
    t: 'link',
    d: {
      label: 'Reddit',
      url: 'https://www.reddit.com',
      fgType: 'ico',
      fgData: 'simple-icons:reddit',
      bgColor: 'FF4500',
      fgColor: 'FFFFFF',
      scale: 100,
    },
  },
  {
    t: 'link',
    d: {
      label: 'Wikipedia',
      url: 'https://www.wikipedia.org',
      fgType: 'ico',
      fgData: 'simple-icons:wikipedia',
      bgColor: 'FFFFFF',
      fgColor: '000000',
      scale: 100,
    },
  },
  {
    t: 'link',
    d: {
      label: 'YouTube',
      url: 'https://www.youtube.com',
      fgType: 'ico',
      fgData: 'simple-icons:youtube',
      bgColor: 'FFFFFF',
      fgColor: 'FF0000',
      scale: 100,
    },
  },
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
    globalWidgetSettings[widget] = widgets[widget].defaultGlobalData;
  }

  const data: StorageObject = {
    sourcetab: VERSION,
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
      pageTitle: 'Sourcetab',
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
      icons: ['simple-icons', 'logos'],
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

    pushWidgets(defaultWidgets, data.widgets.d.c!);
    pushWidgets(defaultLeftToolbarWidgets, data.widgets.tl.c!);
  }

  return data;
}
