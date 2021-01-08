import parse from '../parse';

export default function getKey(key) {
  return new Promise(resolve => {
    switch (PLATFORM) {
      case 'WEB': {
        resolve(parse(localStorage.getItem(key), true));
        break;
      }

      case 'CHROME': {
        chrome.storage.local.get(key, result => {
          resolve(parse(result[key]));
        });
        break;
      }

      case 'FIREFOX': {
        browser.storage.local.get(key).then(result => {
          resolve(parse(result[key]));
        });
        break;
      }

      default:
        break;
    }
  });
}
