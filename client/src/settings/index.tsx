import {Component, For, createSignal} from 'solid-js';
import {Dynamic} from 'solid-js/web';
import NavItem from '~/components/Button/NavItem';
import SourcetabSettings from './SourcetabSettings';

const settingsNav = [
  {name: 'Sourcetab', icon: 'material-symbols:info', comp: SourcetabSettings},
  {name: 'Theme', icon: 'material-symbols:palette', comp: SourcetabSettings},
  {name: 'Layout', icon: 'material-symbols:dashboard', comp: SourcetabSettings},
  {name: 'Data', icon: 'material-symbols:database', comp: SourcetabSettings},
];

const Settings: Component = (props) => {
  const [active, setActive] = createSignal(0);

  return (
    <div class='flex'>
      <ul class='inline-flex flex-col mr-3'>
        <For each={settingsNav}>
          {(settingsNavConfig, i) => (
            <li>
              <NavItem
                icon={settingsNavConfig.icon}
                {...(i() === active()
                  ? {class: 'text-sky-700', iconClass: 'text-sky-700'}
                  : {})}
                onClick={() => setActive(i())}
              >
                {settingsNavConfig.name}
              </NavItem>
            </li>
          )}
        </For>
      </ul>
      <div class='w-full'>
        <Dynamic component={settingsNav[active()].comp} />
      </div>
    </div>
  );
};

export default Settings;
