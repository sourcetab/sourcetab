const $ = require('jquery');
const data = require('./data');

module.exports = (() => {
  const init = () => {
    tick();
  };

  const tick = () => {
    render();
    setTimeout(tick, 1000);
  };

  /**
   * Make sure numbers are have two digits.
   * @param {number} i
   */
  const zero = (i) => (i < 10 ? `0${i}` : i);

  const render = () => {
    data.get('time', (result) => {
      if (result.render) {
        const date = new Date();
        let h = date.getHours();
        h = h - (!result.twentyFourHourFormat && h > 12 ? 12 : 0);
        const m = zero(date.getMinutes());
        const s = zero(date.getSeconds());
        const g = ' : ';
        $('#time').text(h + g + m + (result.renderSeconds ? g + s : ''));
      }
    });
  };

  return {
    init,
  };
})();