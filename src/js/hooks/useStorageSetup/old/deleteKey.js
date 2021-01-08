export default function deleteKey(key) {
  switch (PLATFORM) {
    case 'WEB': {
      localStorage.removeItem(key);
      break;
    }

    case 'CHROME': {
      chrome.storage.local.remove(key);
      break;
    }

    case 'FIREFOX': {
      browser.storage.local.remove(key);
      break;
    }

    default:
      break;
  }
}
