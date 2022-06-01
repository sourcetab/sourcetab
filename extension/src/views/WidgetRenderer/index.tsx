import {AppBar, Box, Toolbar} from '@mui/material';
import {useEffect, useState} from 'react';

import useStorage from '@/hooks/useStorage';

import SettingsDialog from '../Settings';
import {DefaultWidgetContainer} from './WidgetContainer';
import WidgetEditDialog from './WidgetEditDialog';
import WidgetsDialog from './WidgetsDialog';

const ToolbarSeparator: FC = () => (
  <Box component='span' sx={{flexGrow: 0.5}} />
);

const DefaultWidgetContext: FC = ({children}) => <>{children}</>;

const WidgetRenderer: FC = () => {
  const [data] = useStorage();
  const [widgetsDialog, setWidgetsDialog] = useState(false);
  const [settingsDialog, setSettingsDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editDialog, setEditDialog] = useState('');

  const [dnd, setDnd] = useState<typeof import('./dnd')>();

  const CurrentWidgetContext =
    editMode && dnd ? dnd.SortableWidgetContext : DefaultWidgetContext;
  const CurrentWidgetContainer =
    editMode && dnd ? dnd.SortableWidgetContainer : DefaultWidgetContainer;

  useEffect(() => {
    if (!dnd && editMode)
      import('./dnd').then((dndModules) => setDnd(dndModules));
  }, [editMode]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection:
          data.settings.toolbar.position === 'top'
            ? 'column'
            : 'column-reverse',
        height: '100%',
      }}
    >
      <CurrentWidgetContext>
        <AppBar
          position='static'
          sx={{
            backgroundColor: `#${data.settings.themeColor}`,
          }}
        >
          <Toolbar
            sx={{
              pt: '12px',
              pb: '12px',
            }}
          >
            <CurrentWidgetContainer
              inToolbar
              editMode={editMode}
              id='tl'
              setEditDialog={setEditDialog}
              setEditMode={setEditMode}
              setSettingsDialog={setSettingsDialog}
              setWidgetsDialog={setWidgetsDialog}
            />
            <ToolbarSeparator />
            <CurrentWidgetContainer
              inToolbar
              editMode={editMode}
              id='tc'
              setEditDialog={setEditDialog}
              setEditMode={setEditMode}
              setSettingsDialog={setSettingsDialog}
              setWidgetsDialog={setWidgetsDialog}
            />
            <ToolbarSeparator />
            <CurrentWidgetContainer
              inToolbar
              editMode={editMode}
              id='tr'
              setEditDialog={setEditDialog}
              setEditMode={setEditMode}
              setSettingsDialog={setSettingsDialog}
              setWidgetsDialog={setWidgetsDialog}
            />
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            flexGrow: 1,
            display: 'grid',
            gridTemplateColumns: `repeat(${
              data.settings.dashboard.columns || 'auto-fill'
            }, ${data.settings.dashboard.size}px)`,
            justifyContent: 'center',
            padding: `${data.settings.dashboard.margin}px`,
            gridGap: `${data.settings.dashboard.gap}px`,
            alignContent: 'baseline',
            overflow: 'auto',
            position: 'relative',
          }}
        >
          <CurrentWidgetContainer
            editMode={editMode}
            id='d'
            setEditDialog={setEditDialog}
            setEditMode={setEditMode}
            setSettingsDialog={setSettingsDialog}
            setWidgetsDialog={setWidgetsDialog}
          />
        </Box>
      </CurrentWidgetContext>
      <WidgetsDialog
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
      />
      <WidgetEditDialog {...{editDialog, setEditDialog}} />
    </Box>
  );
};

export default WidgetRenderer;
