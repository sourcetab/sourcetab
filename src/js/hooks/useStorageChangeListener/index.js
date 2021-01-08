import { useEffect } from 'react';
import { webLauncherDataKey } from '../useStorageSetup/webLauncherDataKey';

export default function useStorageChangeListener(cb) {
  useEffect(() => {
    let listener;
    switch (PLATFORM) {
      case 'WEB': {
        listener = e => {
          if (e.key === webLauncherDataKey) {
            cb(JSON.parse(e.newValue));
          }
        };
        break;
      }

      case 'CHROME':
      case 'FIREFOX': {
        listener = (changes, areaName) => {
          if (
            areaName === 'local' &&
            Object.keys(changes).includes(webLauncherDataKey)
          ) {
            cb(changes[webLauncherDataKey].newValue);
          }
        };
        break;
      }

      default: {
        break;
      }
    }
    switch (PLATFORM) {
      case 'WEB': {
        window.addEventListener('storage', listener);
        break;
      }

      case 'CHROME': {
        chrome.storage.onChanged.addListener(listener);
        break;
      }

      case 'FIREFOX': {
        browser.storage.onChanged.addListener(listener);
        break;
      }

      default: {
        break;
      }
    }

    return () => {
      switch (PLATFORM) {
        case 'WEB': {
          window.removeEventListener('storage', listener);
          break;
        }

        case 'CHROME': {
          chrome.storage.onChanged.removeListener(listener);
          break;
        }

        case 'FIREFOX': {
          browser.storage.onChanged.removeListener(listener);
          break;
        }

        default: {
          break;
        }
      }
    };
  });
}
