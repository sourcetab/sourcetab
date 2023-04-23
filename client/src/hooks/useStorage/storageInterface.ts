/* eslint-disable @typescript-eslint/no-unsafe-argument */

const sourcetabDataKey = 'weblauncher';

export async function storageGetInterface(): Promise<StorageObject> {
  return new Promise((resolve) => {
    switch (PLATFORM) {
      case 'WEB': {
        resolve(JSON.parse(localStorage.getItem(sourcetabDataKey)!));
        break;
      }

      case 'CHROME': {
        chrome.storage.local.get(sourcetabDataKey, (result) =>
          resolve(result[sourcetabDataKey]),
        );
        break;
      }

      case 'FIREFOX': {
        browser.storage.local
          .get(sourcetabDataKey)
          .then((result) => resolve(result[sourcetabDataKey]));
        break;
      }

      default: {
        break;
      }
    }
  });
}

export function storageSetInterface(value: StorageObject) {
  switch (PLATFORM) {
    case 'WEB': {
      localStorage.setItem(sourcetabDataKey, JSON.stringify(value));
      break;
    }

    case 'CHROME': {
      chrome.storage.local.set({[sourcetabDataKey]: value});
      break;
    }

    case 'FIREFOX': {
      browser.storage.local.set({[sourcetabDataKey]: value});
      break;
    }

    default: {
      break;
    }
  }
}

export function storageListenInterface(
  callback: (value: StorageObject) => void,
) {
  switch (PLATFORM) {
    case 'WEB': {
      const listener = (e: StorageEvent): void => {
        if (e.key === sourcetabDataKey) callback(JSON.parse(e.newValue!));
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
          Object.keys(changes).includes(sourcetabDataKey)
        )
          callback(changes[sourcetabDataKey].newValue);
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
          Object.keys(changes).includes(sourcetabDataKey)
        )
          callback(changes[sourcetabDataKey].newValue);
      };

      browser.storage.onChanged.addListener(listener);
      return () => browser.storage.onChanged.removeListener(listener);
    }

    default: {
      break;
    }
  }
}
