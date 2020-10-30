const icons = {
  amazon: require('../../../icons/amazon.png'),
  drive: require('../../../icons/drive.png'),
  gmail: require('../../../icons/gmail.png'),
  google: require('../../../icons/google.png'),
  youtube: require('../../../icons/youtube.png'),
};

export default [
  {
    name: 'Amazon',
    url: 'https://www.amazon.com',
    icon: icons.amazon.default,
  },
  {
    name: 'Drive',
    url: 'https://drive.google.com',
    icon: icons.drive.default,
  },
  {
    name: 'Gmail',
    url: 'https://mail.google.com',
    icon: icons.gmail.default,
  },
  {
    name: 'Google',
    url: 'https://www.google.com',
    icon: icons.google.default,
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com',
    icon: icons.youtube.default,
  },
];
