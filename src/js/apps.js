const $ = require('jquery');
const {
  MDCDialog,
} = require('@material/dialog');
const {
  MDCMenu,
} = require('@material/menu');
const {
  MDCRipple,
} = require('@material/ripple');
const {
  MDCTextField,
} = require('@material/textfield');
const data = require('./data');

module.exports = (() => {
  let openDialog;
  let remove;
  const render = {};

  const init = () => {
    render.apps();

    // Initialize material design components
    const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
    const buttonRipples = [].map.call(document.querySelectorAll('.mdc-button'), (el) => new MDCRipple(el));
    const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), (el) => new MDCTextField(el));

    openDialog = (index = undefined) => {
      $(dialog.root).attr('data-index', index);
      if (index === undefined) {
        dialog.open();
      } else {
        data.get('apps', (result) => {
          $('#app-dialog-name').val(result[index].name);
          $('#app-dialog-url').val(result[index].url);
          $('#app-dialog-icon').val(result[index].icon);
          dialog.open();
        });
      }
    };

    remove = (index, callback) => {
      data.get('apps', (result) => {
        result.splice(index, 1);
        data.set('apps', result, () => {
          if (typeof callback === 'function') callback();
        });
      });
    };

    $('#toolbar-add').click(() => {
      openDialog();
    });

    $(dialog.root).on('MDCDialog:opened', () => {
      buttonRipples.forEach((v) => {
        v.layout();
      });
      textFields.forEach((v) => {
        v.layout();
      });
    });
    $(dialog.root).on('MDCDialog:closed', (e) => {
      if (e.detail.action === 'accept') {
        console.log($(dialog.root).attr('data-index'));
        if ($(dialog.root).attr('data-index') === undefined) {
          console.log('Add');
          add($('#app-dialog-name').val(), $('#app-dialog-url').val(), $('#app-dialog-icon').val());
        } else {
          console.log('Edit');
          remove($(dialog.root).attr('data-index'));
          add($('#app-dialog-name').val(), $('#app-dialog-url').val(), $('#app-dialog-icon').val());
        }
      }
      $('#app-dialog-name').val('');
      $('#app-dialog-url').val('');
      $('#app-dialog-icon').val('');
    });
  };

  /**
     * render apps to "#app-container" div
     */
  render.apps = () => {
    $('#app-container').html('');
    $('#app-context-menus').html('');

    const menus = [];
    const closeMenus = () => {
      menus.forEach((m) => {
        m.open = false;
      });
    };

    data.get('apps', (result) => {
      result.forEach((v, i) => {
        $('#app-container').append(`
                    <a id="app-div-${i}" href="${v.url}">
                        <svg viewBox="0 0 100 100">
                            <rect width="100" height="100" fill="#FFF"/>
                            <image href="${v.icon}" height="100" width="100"/>
                        </svg>
                        <p>${v.name}</p>
                    </a>
                `);
        $('#app-context-menus').append(`
                    <div id="app-menu-${i}" class="mdc-menu mdc-menu-surface">
                        <ul class="mdc-list" tabindex="-1">
                            <li id="app-menu-edit-${i}" class="mdc-list-item">
                                <span class="mdc-list-item__ripple"></span>
                                <span class="mdc-list-item__text">Edit</span>
                            </li>
                            <li id="app-menu-remove-${i}" class="mdc-list-item">
                                <span class="mdc-list-item__ripple"></span>
                                <span class="mdc-list-item__text">Remove</span>
                            </li>
                        </ul>
                    </div>
                `);
        $(`#app-menu-edit-${i}`).click(() => {
          openDialog(i);
        });
        $(`#app-menu-remove-${i}`).click(() => {
          remove(i, () => {
            render.apps();
          });
        });
        const menu = new MDCMenu(document.getElementById(`app-menu-${i}`));
        menus.push(menu);
        $(`#app-div-${i}`).off().on('contextmenu', (e) => {
          e.preventDefault();
          closeMenus();
          menu.setAbsolutePosition(e.originalEvent.clientX, e.originalEvent.clientY);
          menu.open = true;
        });
      });
    });
  };

  render.icon = () => {

  };

  /**
     * add item to apps array
     *
     * @param {string} name - defines the label displayed under the icon
     * @param {string} url  - defines where the user will be sent when app is pressed
     * @param {string} icon - defines what icon will be displayed
     */
  const add = (name, url, icon) => {
    data.get('apps', (result) => {
      // add app to data object
      result.push({
        name,
        url,
        icon,
      });

      // sort apps alphabetically
      const compare = (a, b) => {
        const varA = a.name.toUpperCase();
        const varB = b.name.toUpperCase();

        let varC = 0;
        if (varA > varB) {
          varC = 1;
        } else if (varA < varB) {
          varC = -1;
        }
        return varC;
      };
      result.sort(compare);

      // save and show apps
      data.set('apps', result, () => {
        render.apps();
      });
    });
  };

  return {
    init,
    render,
  };
})();
