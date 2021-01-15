/* eslint-disable global-require */
import pkg from '../../../../package.json';

const imgs = {
  background: require('../../../images/beach.jpeg'),
  amazon: require('../../../icons/amazon.png'),
  drive: require('../../../icons/drive.png'),
  gmail: require('../../../icons/gmail.png'),
  google: require('../../../icons/google.png'),
  youtube: require('../../../icons/youtube.png'),
};

export default {
  default: {
    version: pkg.version,
    background: { url: imgs.background.default },
    clock: {
      render: true,
      renderSeconds: true,
      twentyFourHourFormat: false,
    },
    websites: [
      {
        name: 'Amazon',
        url: 'https://www.amazon.com',
        icon: imgs.amazon.default,
        backgroundColor: '#ffffff',
      },
      {
        name: 'Drive',
        url: 'https://drive.google.com',
        icon: imgs.drive.default,
        backgroundColor: '#ffffff',
      },
      {
        name: 'Gmail',
        url: 'https://mail.google.com',
        icon: imgs.gmail.default,
        backgroundColor: '#ffffff',
      },
      {
        name: 'Google',
        url: 'https://www.google.com',
        icon: imgs.google.default,
        backgroundColor: '#ffffff',
      },
      {
        name: 'YouTube',
        url: 'https://www.youtube.com',
        icon: imgs.youtube.default,
        backgroundColor: '#ffffff',
      },
    ],
  },
  placeholder: {
    version: '',
    background: { url: '' },
    clock: {
      render: false,
      renderSeconds: false,
      twentyFourHourFormat: false,
    },
    websites: [],
  },
};
