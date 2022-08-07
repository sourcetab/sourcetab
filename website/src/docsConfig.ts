const docsConfig: import('./views/DocsLayout').DocsConfig = [
  {
    name: 'Getting Started',
    path: '',
  },
  {
    name: 'Settings',
    path: 'settings',
    children: [
      {
        name: 'Appearance',
        path: 'appearance',
      },
      {
        name: 'Background',
        path: 'background',
      },
      {
        name: 'Data',
        path: 'data',
      },
    ],
  },
  {
    name: 'Widgets',
    path: 'widgets',
    children: [
      {
        name: 'Link',
        path: 'link',
      },
      {
        name: 'Clock',
        path: 'clock',
      },
      {
        name: 'IFrame',
        path: 'iframe',
      },
      {
        name: 'Note',
        path: 'note',
      },
    ],
  },
  {
    name: 'Miscellaneous',
    path: 'miscellaneous',
  },
];

export default docsConfig;
