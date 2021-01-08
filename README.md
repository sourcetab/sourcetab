# Web Launcher

A material design dashboard that replaces your new tab page and improves productivity.

## Getting Started

Web Launcher is an extension for multiple browsers, and also has a demo you can look at before installing.

|                                                     [Demo](https://jwr12135.github.io/web-launcher/)                                                      |                                                    [Chrome](https://chrome.google.com/webstore/detail/web-launcher/akomlegpokabommpdjfmhnbdcnaefmdo/)                                                     |                                                      [Firefox](https://addons.mozilla.org/en-US/firefox/addon/weblauncher/)                                                      |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [![Demo](https://raw.githubusercontent.com/jwr12135/web-launcher/master/assets/icons/64.png 'Demo')](https://web-launcher.github.io/web-launcher/ 'Demo') | [![Chrome](https://raw.githubusercontent.com/jwr12135/web-launcher/master/assets/chrome.png 'Chrome')](https://chrome.google.com/webstore/detail/web-launcher/akomlegpokabommpdjfmhnbdcnaefmdo/ 'Chrome') | [![Firefox](https://raw.githubusercontent.com/jwr12135/web-launcher/master/assets/firefox.png 'Firefox')](https://addons.mozilla.org/en-US/firefox/addon/weblauncher/ 'Firefox') |

## Development

Nodejs and npm must be installed before starting.

Install necessary packages by running `npm ci` in the projects root directory.

### Building

Web Launcher has several build scripts used for different platforms.

#### Web

To build, run `npm run build:web` in the projects root directory. An **index.html** file will be generated in the **./dist** directory. You can open that in a browser to view the product.

#### Chrome

To generate the chrome extension, run `npm run build:chrome` in the projects root directory.
The results are in the **./dist/chrome** directory.

#### Firefox

To generate the firefox extension, run `npm run build:firefox` in the projects root directory.
The results are in the **./dist/firefox** directory.

### Develop

To start development, run `npm start` in the project root directory. This will create a local server in which you can view the project from a browser. Any changes from the source files in the **./src** directory, will automatically reload the page.

## Built With

- [Babel](https://babeljs.io/) - Used to compile Javascript in a way that increases backwards compatibility.
- [ESLint](https://eslint.org/) - Used to enforce a certain coding style and correct syntax.
- [Material-UI](https://material-ui.com/) - Used to create a smooth user interface based off [Google’s Material Design](https://material.io/).
- [Prettier](https://prettier.io/) - Used to format code in an efficient manner.
- [React](https://reactjs.org/) - Used to build and create reusable UI components.
- [Webpack](https://webpack.js.org/) - Used to bundle modules into a browser ready format.

## License

This project is licensed under the GPL License - see the [LICENSE](LICENSE) file for details
