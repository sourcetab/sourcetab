const weblauncherDataKey = 'weblauncher';

export async function storageGetInterface(): Promise<StorageObject> {
  return new Promise((resolve) => {
    switch (PLATFORM) {
      case 'WEB':
        resolve(JSON.parse(localStorage.getItem(weblauncherDataKey)));
        break;

      case 'CHROME':
        chrome.storage.local.get(weblauncherDataKey, (result) =>
          resolve(result[weblauncherDataKey]),
        );
        break;

      case 'FIREFOX':
        browser.storage.local
          .get(weblauncherDataKey)
          .then((result) => resolve(result[weblauncherDataKey]));
        break;

      default:
        break;
    }
  });
}

export function storageSetInterface(value: StorageObject) {
  switch (PLATFORM) {
    case 'WEB':
      localStorage.setItem(weblauncherDataKey, JSON.stringify(value));
      break;

    case 'CHROME':
      chrome.storage.local.set({[weblauncherDataKey]: value});
      break;

    case 'FIREFOX':
      browser.storage.local.set({[weblauncherDataKey]: value});
      break;

    default:
      break;
  }
}

export function storageListenInterface(
  callback: (value: StorageObject) => void,
) {
  switch (PLATFORM) {
    case 'WEB': {
      const listener = (e: StorageEvent): void => {
        if (e.key === weblauncherDataKey) callback(JSON.parse(e.newValue!));
      };

      window.addEventListener('storage', listener);
      return () => window.removeEventListener('storage', listener);
    }

    case 'CHROME': {
      const listener = (
        changes: Record<string, chrome.storage.StorageChange>,
        areaName: string,
      ): void => {
        if (
          areaName === 'local' &&
          Object.keys(changes).includes(weblauncherDataKey)
        )
          callback(changes[weblauncherDataKey].newValue);
      };

      chrome.storage.onChanged.addListener(listener);
      return () => chrome.storage.onChanged.removeListener(listener);
    }

    case 'FIREFOX': {
      const listener = (
        changes: Record<string, browser.storage.StorageChange>,
        areaName: string,
      ): void => {
        if (
          areaName === 'local' &&
          Object.keys(changes).includes(weblauncherDataKey)
        )
          callback(changes[weblauncherDataKey].newValue);
      };

      browser.storage.onChanged.addListener(listener);
      return () => browser.storage.onChanged.removeListener(listener);
    }

    default:
      break;
  }
}
