export default function set(key, value) {
  switch (PLATFORM) {
    case 'WEB': {
      localStorage.setItem(key, JSON.stringify(value));
      break;
    }

    case 'CHROME': {
      chrome.storage.local.set({ [key]: value });
      break;
    }

    case 'FIREFOX': {
      browser.storage.local.set({ [key]: value });
      break;
    }

    default:
      break;
  }
}
