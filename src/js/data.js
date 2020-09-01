const $ = require('jquery');
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
   * @param {string} key     - where to look in object the object
   * @param {*}      [value] - value to set path at object to
   * @returns {object} If a value is specified then the whole object is returned with new value, otherwise only the value found at specified path is returned.
   */
  const dataPathHandler = (obj, key, value = null) => {
    if (key.length > 0) {
      if (value === null) {
        return obj[key];
      }
      return {
        ...obj,
        [key]: value
      };
    }
    if (value === null) {
      return obj
    }
    return value;
  };

  /**
   * @param {Function} [callback] - callback function to execute after data is initialized
   */
  const init = (callback = () => undefined) => {
    get('', (result) => {
      if ($.isEmptyObject(result)) {
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
   * data.get('apps', (result) => {
   *     console.log(result[2].url);
   *     // https://example.website.com is logged.
   * });
   *
   * @param {string}          key       - location to get application data from
   * @param {dataGetCallback} [callback] - callback function to execute after data is retrieved
   */
  const get = (key, callback = () => undefined) => {
    switch (PLATFORM) {
      case 'WEB':
        const storage = localStorage.getItem(dataKey);
        callback(dataPathHandler(JSON.parse(storage === null ? '{}' : storage), key));
        break;

      case 'CHROME':
        chrome.storage.local.get(dataKey, (result) => {
          callback(dataPathHandler(result[dataKey], key));
        });
        break;
      default:
        break;
    }
  };

  /**
   * Saves a value to specified location in application data.
   *
   * @param {string}   key       - where to save data
   * @param {*}        value      - what data to save
   * @param {Function} [callback] - callback function to execute after data is set
   */
  const set = (key, value, callback = () => undefined) => {
    switch (PLATFORM) {
      case 'WEB':
        get('', (result) => {
          localStorage.setItem(dataKey, JSON.stringify(dataPathHandler(result, key, value)));
          callback();
        });
        break;

      case 'CHROME':
        get('', (result) => {
          chrome.storage.local.set({
            [dataKey]: dataPathHandler(result, key, value),
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