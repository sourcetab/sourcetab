const { MDCTopAppBar } = require('@material/top-app-bar');

module.exports = (() => {
  const init = () => {
    const topAppBarElement = document.querySelector('.mdc-top-app-bar');
    const topAppBar = new MDCTopAppBar(topAppBarElement);
  };

  return {
    init,
  };
})();
