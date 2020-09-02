# Web Launcher

A material design dashboard that replaces your new tab page and improves productivity.

## Getting Started

Web Launcher is an extension for multiple browsers, and also has a demo you can look at before installing.

| [Demo](https://jwr12135.github.io/web-launcher/) | [Chrome]() | [Firefox]() |
| :------------: | :------------: | :------------: |
| [![Demo](https://raw.githubusercontent.com/jwr12135/web-launcher/master/assets/icons/128.png "Demo")](https://jwr12135.github.io/web-launcher/ "Demo") | [![Chrome](https://raw.githubusercontent.com/jwr12135/web-launcher/master/assets/chrome.png "Chrome")](http:// "Chrome") | [![Firefox](https://raw.githubusercontent.com/jwr12135/web-launcher/master/assets/firefox.png "Firefox")](http:// "Firefox") |

## Development

Nodejs and npm must be installed before starting.

Install nessesary packages by running `npm ci` in the projects root directory.

### Building

Web Launcher has several build scripts used for different platforms.

#### Web

To generate a build that runs directly in a browser, execute `npm run build-web` in the projects root directory.
Open **./build/web/index.html** in a browser to view results.

#### Chrome

To generate the chrome extension, execute `npm run build-chrome` in the projects root directory.
The results are in the **./build/chrome** directory.

#### Firefox

To generate the firefox extension, execute `npm run build-firefox` in the projects root directory.
The results are in the **./build/firefox** directory.

### Development

To start development execute `npm start` in the projects root directory. This will create a local server in which you can view the project from a browser. Any changes from the source files in the **./src** directory, will automatically reload the page.

## Built With

* [ESLint](https://eslint.org/) - Used to enforce a certain coding style and correct syntax.
* [JQuery](https://jquery.com/) - Used to simplify dom manipulation and animations.
* [Material Design](https://material.io/) - Used to create a smooth user interface.
* [Webpack](https://webpack.js.org/) - Used to bundle modules into a browser ready format.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
