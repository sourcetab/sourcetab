const defaultData = require('./defaultData');

/**
 * Data module
 * @module data
 * @see module:defaultData
 */

module.exports = (() => {
  /**
     * Key to save and load application data to.
     * @type {string}
     */
  const dataKey = 'weblauncher';

  /**
     *
     * @param {object} obj
     * @param {string} path    - where to look in object
     * @param {*}      [value] - value to set path at object to
     * @returns {object} If a value is specified then the whole object is returned with new value, otherwise only the value found at specified path is returned.
     */
  const dataPathHandler = (obj, path, value = null) => {
    if (typeof obj !== 'object') {
      obj = {};
    }
    const result = (new Function('obj', 'value', `
            if (value === null) {
                obj = obj${(path.length > 0) ? '.' : ''}${path};
            } else {
                obj${(path.length > 0) ? '.' : ''}${path} = value;
            };
            return obj;
        `))(obj, value);

    return result;
  };

  /**
     * @param {Function} [callback] - callback function to execute after data is initialized
     */
  const init = (callback = () => undefined) => {
    get('', (result) => {
      if (typeof result !== 'object' || result === {}) {
        reset(() => {
          callback();
        });
      } else {
        callback();
      }
    });
  };

  /**
     * Executes after data.get is completed
     *
     * @callback dataGetCallback
     * @param {*} result - data retrieved from specified location
     */

  /**
     * Retrieves data from specified location in application data.
     *
     * @example
     * data.get('apps[2].url', (result) => {
     *     console.log(result);
     *     // https://example.website.com is logged.
     * });
     *
     * @param {string}          path       - location to get application data from
     * @param {dataGetCallback} [callback] - callback function to execute after data is retrieved
     */
  const get = (path, callback = () => undefined) => {
    switch (PLATFORM) {
      case 'WEB':
        callback(dataPathHandler(JSON.parse(localStorage.getItem(dataKey)), path));
        break;

      case 'CHROME':
        chrome.storage.local.get(dataKey, (result) => {
          callback(dataPathHandler(result[dataKey], path));
        });
        break;
      default:
        break;
    }
  };

  /**
     * Saves a value to specified location in application data.
     *
     * @example
     * data.set('apps[2].url', 'https://example.website.com', () => {
     *     console.log('Data has been set!');
     * });
     *
     * @param {string}   path       - where to save data
     * @param {*}        value      - what data to save
     * @param {Function} [callback] - callback function to execute after data is set
     */
  const set = (path, value, callback = () => undefined) => {
    switch (PLATFORM) {
      case 'WEB':
        get('', (result) => {
          localStorage.setItem(dataKey, JSON.stringify(dataPathHandler(result, path, value)));
          callback();
        });
        break;

      case 'CHROME':
        get('', (result) => {
          chrome.storage.local.set({
            [dataKey]: dataPathHandler(result, path, value),
          }, callback);
        });
        break;
      default:
        break;
    }
  };

  /**
     * Resets application data to its default state.
     * @param {Function} [callback] - callback function to execute after data is reset
     */
  const reset = (callback = () => undefined) => {
    set('', defaultData, callback);
  };

  // Return exposed functions
  return {
    init,
    get,
    set,
    reset,
  };
})();
