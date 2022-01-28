# Web Launcher

A material design dashboard that replaces your new tab page.

## Getting Started

Web Launcher is supported in multiple browsers and has a demo you can look at before installing.

|                      [Demo](https://jwr12135.github.io/web-launcher/)                      |                     [Chrome](https://chrome.google.com/webstore/detail/web-launcher/akomlegpokabommpdjfmhnbdcnaefmdo/)                     |                  [Edge](https://microsoftedge.microsoft.com/addons/detail/web-launcher/fpknfiaimmgbbpplehjclidiphmhljeh)                  |                      [Firefox](https://addons.mozilla.org/en-US/firefox/addon/web-launcher/)                       |
| :----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------: |
| [![Demo](assets/icons/64.png 'Demo')](https://web-launcher.github.io/web-launcher/ 'Demo') | [![Chrome](assets/chrome.png 'Chrome')](https://chrome.google.com/webstore/detail/web-launcher/akomlegpokabommpdjfmhnbdcnaefmdo/ 'Chrome') | [![Edge](assets/edge.png 'Edge')](https://microsoftedge.microsoft.com/addons/detail/web-launcher/fpknfiaimmgbbpplehjclidiphmhljeh 'Edge') | [![Firefox](assets/firefox.png 'Firefox')](https://addons.mozilla.org/en-US/firefox/addon/web-launcher/ 'Firefox') |

## Development

Nodejs and npm must be installed before starting.

Install necessary packages by running `npm ci` in the project's root directory.

### Building

Web Launcher has several build scripts used for different platforms.

#### Web

To build, run `npm run build:web` in the project's root directory. An **index.html** file will be generated in the **./dist** directory. You can open that in a browser to view the product.

#### Chrome

To generate the chrome extension, run `npm run build:chrome` in the project's root directory.
The results are in the **./dist/chrome** directory.

#### Firefox

To generate the firefox extension, run `npm run build:firefox` in the project's root directory.
The results are in the **./dist/firefox** directory.

### Develop

To start development, run `npm dev` in the project root directory. This will create a local server in which you can view the project from a browser. Any changes from the source files in the **./src** directory, will automatically reload the page.

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details
