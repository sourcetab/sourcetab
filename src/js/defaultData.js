const icons = {
  amazon: require('../icons/amazon.png'),
  drive: require('../icons/drive.png'),
  gmail: require('../icons/gmail.png'),
  google: require('../icons/google.png'),
  youtube: require('../icons/youtube.png'),
};

/**
 * Returns the default data for the application.
 * @type {object}
 * @module defaultData
 */

/**
 * @type {object}
 */
module.exports = {
  /**
   * an array of preset apps
   * @type {Array.<{name: string, url: string, icon: string}>}
   */
  apps: [{
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
  ],
  time: {
    render: true,
    renderSeconds: true,
    twentyFourHourFormat: false,
  },
};