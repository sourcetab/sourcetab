const $ = require('jquery');
const data = require('./data');
const apps = require('./apps');
const time = require('./time')
const toolbar = require('./toolbar');

data.init(() => {
    $(document).ready(() => {
        toolbar.init();
        time.init();
        apps.init();
    });
});