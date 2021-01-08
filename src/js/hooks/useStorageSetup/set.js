import { webLauncherDataKey } from './webLauncherDataKey';

export default function set(value) {
  switch (PLATFORM) {
    case 'WEB': {
      localStorage.setItem(webLauncherDataKey, JSON.stringify(value));
      break;
    }

    case 'CHROME': {
      chrome.storage.local.set({ [webLauncherDataKey]: value });
      break;
    }

    case 'FIREFOX': {
      browser.storage.local.set({ [webLauncherDataKey]: value });
      break;
    }

    default:
      break;
  }
}
