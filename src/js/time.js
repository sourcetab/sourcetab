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
     * Used to add a 0 to the front of a one digit number
     * @param {number} i
     */
  const zero = (i) => (i < 10 ? `0${i}` : i);

  const render = () => {
    data.get('time', (result) => {
      const date = new Date();
      let h = zero(date.getHours());
      const m = zero(date.getMinutes());
      const s = zero(date.getSeconds());
      const g = ' : ';
      if (result.render) {
        if (!result.twentyFourHourFormat && h > 12) {
          h -= 12;
        }
        $('#time').text(h + g + m + ((result.renderSeconds) ? g + s : ''));
      }
    });
  };

  return {
    init,
  };
})();
