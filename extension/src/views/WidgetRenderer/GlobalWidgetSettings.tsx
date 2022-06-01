import {Dialog, DialogContent, IconButton} from '@mui/material';
import {Settings as SettingsIcon} from '@mui/icons-material';
import {useState} from 'react';
import DialogTitleActions from '@/components/DialogTitleActions';
import widgets from '@/widgets';
import useStorage from '@/hooks/useStorage';

const GlobalWidgetSettings: FC<{id: string}> = ({id}) => {
  const [data, setData] = useStorage();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const GlobalSettings = widgets[id].GlobalSettings!;

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{position: 'absolute', right: '12px', top: '12px'}}
      >
        <SettingsIcon />
      </IconButton>
      <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={open}>
        <DialogTitleActions
          help={`widgets/${widgets[id].help}#global-settings`}
          onClose={handleClose}
        >
          Widget Settings
        </DialogTitleActions>
        <DialogContent>
          <GlobalSettings
            data={data.settings.widgets[id]}
            setData={(newValue) => {
              setData((data) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                data.settings.widgets[id] = newValue;
              });
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default GlobalWidgetSettings;
