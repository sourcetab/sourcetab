import { webLauncherDataKey } from './webLauncherDataKey';
import parse from './parse';

export default function get() {
  return new Promise(resolve => {
    switch (PLATFORM) {
      case 'WEB': {
        resolve(parse(localStorage.getItem(webLauncherDataKey), true));
        break;
      }

      case 'CHROME': {
        chrome.storage.local.get(webLauncherDataKey, result => {
          resolve(parse(result[webLauncherDataKey]));
        });
        break;
      }

      case 'FIREFOX': {
        browser.storage.local.get(webLauncherDataKey).then(result => {
          resolve(parse(result[webLauncherDataKey]));
        });
        break;
      }

      default:
        break;
    }
  });
}
