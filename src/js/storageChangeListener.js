export default function storageChangeListener() {
  switch (PLATFORM) {
    case 'WEB': {
      window.addEventListener('storage', e => {
        dispatchEvent(
          new CustomEvent('storageChange', {
            detail: {
              [e.key]: { newValue: JSON.parse(e.newValue) },
            },
          })
        );
      });
      break;
    }

    case 'CHROME': {
      chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName === 'local') {
          dispatchEvent(
            new CustomEvent('storageChange', {
              detail: changes,
            })
          );
        }
      });
      break;
    }

    case 'FIREFOX': {
      browser.storage.onChanged.addListener((changes, areaName) => {
        if (areaName === 'local') {
          dispatchEvent(
            new CustomEvent('storageChange', {
              detail: changes,
            })
          );
        }
      });
      break;
    }

    default:
      break;
  }
}
