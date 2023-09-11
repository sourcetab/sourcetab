import {Component, createSignal, ParentComponent} from 'solid-js';
import {Dynamic} from 'solid-js/web';
import {Button, Popover} from '@kobalte/core';
import {Icon} from '@iconify-icon/solid';
import {useWorkspace} from '~/storage/useWorkspace';
import useBackground from '~/useBackground';
import {themeCss} from '~/utils';
import NavItem from '~/components/Button/NavItem';
import Dialog from '~/components/Dialog';
import Settings from '~/settings';
import {DefaultWidgetContainer} from './WidgetContainer';

export const [widgetsDialog, setWidgetsDialog] = createSignal(false);
export const [settingsDialog, setSettingsDialog] = createSignal(false);
export const [editMode, setEditMode] = createSignal(false);
export const [editDialog, setEditDialog] = createSignal('');

const ToolbarSeparator: Component = () => <span style={{'flex-grow': 0.5}} />;

const DefaultWidgetContext: ParentComponent = (props) => <>{props.children}</>;

const Renderer: Component = () => {
  const [ws] = useWorkspace();

  const background = useBackground();

  const CurrentWidgetContext = () =>
    // editMode() && dnd ? dnd.SortableWidgetContext :
    DefaultWidgetContext;
  const CurrentWidgetContainer = () =>
    // editMode() && dnd ? dnd.SortableWidgetContainer :
    DefaultWidgetContainer;

  const [settingsOpen, setSettingsOpen] = createSignal(false);

  return (
    <div
      class='flex h-full'
      style={{
        'flex-direction':
          ws.settings.layout.toolbar.position === 'top'
            ? 'column'
            : 'column-reverse',
      }}
    >
      <Dynamic component={CurrentWidgetContext()}>
        <div
          class='text-center flex min-h-[64px] w-full'
          style={{
            background: background(ws.settings.theme.toolbar.background),
            margin: `${ws.settings.layout.toolbar.margin}px`,
            'border-radius': `${ws.settings.theme.toolbar.radius}px`,
            'box-shadow': themeCss.boxShadow(ws.settings.theme.toolbar.shadow),
            padding: `${ws.settings.layout.toolbar.padding}px`,
          }}
        >
          <Dynamic component={CurrentWidgetContainer()} inToolbar id='tl' />
          <ToolbarSeparator />
          <Dynamic component={CurrentWidgetContainer()} inToolbar id='tc' />
          <ToolbarSeparator />
          <Dynamic component={CurrentWidgetContainer()} inToolbar id='tr' />
          <Popover.Root>
            <Popover.Trigger class='p-2 text-white'>
              <Icon icon='material-symbols:menu' width={24} height={24} />
            </Popover.Trigger>
            <Popover.Anchor />
            <Popover.Portal>
              <Popover.Content class='p-2 m-2 bg-white rounded-md shadow-lg animate-hide ui-expanded:animate-show'>
                <Popover.Arrow />
                <NavItem icon='material-symbols:widgets'>Widgets</NavItem>
                <NavItem icon='material-symbols:edit'>Edit Mode</NavItem>
                <NavItem
                  icon='material-symbols:settings'
                  onClick={() => setSettingsOpen(true)}
                >
                  Settings
                </NavItem>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
        <div
          class='grow grid justify-center align-middle overflow-auto relative'
          style={{
            'grid-template-columns': `repeat(${
              ws.settings.layout.dashboard.columns || 'auto-fill'
            }, ${ws.settings.layout.dashboard.size}px)`,
            padding: `${ws.settings.layout.dashboard.margin}px`,
            'grid-gap': `${ws.settings.layout.dashboard.gap}px`,
          }}
        >
          <Dynamic component={CurrentWidgetContainer()} id='main' />
        </div>
      </Dynamic>
      {/* <WidgetsDialog
        open={widgetsDialog}
        setOpen={setWidgetsDialog}
        setEditDialog={(newValue) => {
          setEditMode(true);
          setEditDialog(newValue);
        }}
      />
      <SettingsDialog
        {...{
          settingsDialog,
          setSettingsDialog,
        }}
      /> */}
      {/* <WidgetEditDialog {...{ editDialog, setEditDialog }} /> */}
      <Dialog
        open={settingsOpen()}
        onOpenChange={(isOpen) => setSettingsOpen(isOpen)}
        title='Settings'
      >
        <Settings />
      </Dialog>
    </div>
  );
};

export default Renderer;
