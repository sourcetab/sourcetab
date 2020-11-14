/* eslint-disable global-require */
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
    backgroundColor: '#ffffff',
  },
  {
    name: 'Drive',
    url: 'https://drive.google.com',
    icon: icons.drive.default,
    backgroundColor: '#ffffff',
  },
  {
    name: 'Gmail',
    url: 'https://mail.google.com',
    icon: icons.gmail.default,
    backgroundColor: '#ffffff',
  },
  {
    name: 'Google',
    url: 'https://www.google.com',
    icon: icons.google.default,
    backgroundColor: '#ffffff',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com',
    icon: icons.youtube.default,
    backgroundColor: '#ffffff',
  },
];
