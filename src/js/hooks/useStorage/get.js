const addDefault = (result, initialValue, parse) => {
  if (result) {
    if (parse) return JSON.parse(result);

    return result;
  }
  return initialValue;
};

export default function get(key, initialValue) {
  return new Promise(resolve => {
    switch (PLATFORM) {
      case 'WEB': {
        resolve(addDefault(localStorage.getItem(key), initialValue, true));
        break;
      }

      case 'CHROME': {
        chrome.storage.local.get(key, result => {
          resolve(addDefault(result[key], initialValue));
        });
        break;
      }

      case 'FIREFOX': {
        browser.storage.local.get(key).then(result => {
          resolve(addDefault(result[key], initialValue));
        });
        break;
      }

      default:
        break;
    }
  });
}
