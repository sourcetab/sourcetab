import {
  Autorenew as AutorenewIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';
import {
  Alert,
  Button as MuiButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  List,
  Radio,
  RadioGroup,
  Snackbar,
} from '@mui/material';
import {useState} from 'react';

import Inputs from '@/components/Inputs';
import useStorage from '@/hooks/useStorage';
import genDefaultData from '@/hooks/useStorage/genDefaultData';
import {downloadJson, uploadFile} from '@/utils';
import parseStorageData from '@/hooks/useStorage/parseStorageData';

const DataSettings: FC = () => {
  const [data, setData] = useStorage();
  const [restoreDataFile, setRestoreDataFile] = useState<StorageObject>();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState<'restore' | 'reset'>();
  const [snackbarData, setSnackbarData] = useState<StorageObject>();
  const [dataError, setDataError] = useState(false);

  const [method, setMethod] = useState<'replace' | 'merge'>('replace');
  const [widgets, setWidgets] = useState(true);
  const [settings, setSettings] = useState(true);

  const openConfirmDialog = (type: 'restore' | 'reset') => {
    setConfirmType(type);
    setConfirmOpen(true);
  };
  const closeConfirmDialog = () => setConfirmOpen(false);

  return (
    <List>
      <Inputs.Button
        icon={<DownloadIcon />}
        label='Backup Data'
        onClick={() => {
          const d = new Date();
          downloadJson(
            `weblauncher-${d.getFullYear()}-${
              d.getMonth() + 1
            }-${d.getDate()}-${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}.json`,
            data,
          );
        }}
      />
      <Inputs.Button
        icon={<UploadIcon />}
        label='Restore Data'
        onClick={async () =>
          uploadFile('text', 'application/json').then((value) => {
            let newData: StorageObject | undefined;
            try {
              newData = parseStorageData(JSON.parse(value.data), false);
            } catch {}

            if (newData) {
              setRestoreDataFile(newData);
              openConfirmDialog('restore');
            } else setDataError(true);
          })
        }
      />
      <Inputs.Button
        icon={<AutorenewIcon />}
        label='Reset Data'
        onClick={() => openConfirmDialog('reset')}
      />
      <Dialog onClose={closeConfirmDialog} open={confirmOpen}>
        <DialogTitle>
          {confirmType === 'reset'
            ? 'Reset data to default state?'
            : 'Restore data from backup file?'}
        </DialogTitle>
        <DialogContent>
          <List>
            {confirmType === 'restore' && (
              <RadioGroup
                row
                sx={{justifyContent: 'center', mb: '8px'}}
                value={method}
                onChange={(e) =>
                  setMethod(e.target.value as 'replace' | 'merge')
                }
              >
                <FormControlLabel
                  control={<Radio />}
                  disabled={!widgets}
                  label='Replace'
                  value='replace'
                />
                <FormControlLabel
                  control={<Radio />}
                  disabled={!widgets}
                  label='Merge'
                  value='merge'
                />
              </RadioGroup>
            )}
            <Inputs.Switch
              label='Widgets'
              onChange={setWidgets}
              value={widgets}
            />
            <Inputs.Switch
              label='Settings'
              onChange={setSettings}
              value={settings}
            />
          </List>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={closeConfirmDialog}>Cancel</MuiButton>
          <MuiButton
            autoFocus
            disabled={!widgets && !settings}
            onClick={() => {
              closeConfirmDialog();
              if (confirmType === 'reset') {
                const newData = genDefaultData(widgets);
                if (!widgets) newData.widgets = data.widgets;
                if (!settings) newData.settings = data.settings;
                setSnackbarData(data);
                setData(newData);
              } else {
                const newData = restoreDataFile!;
                if (!widgets) {
                  newData.widgets = data.widgets;
                } else if (method === 'merge') {
                  const newWidgets: StorageObject['widgets'] = {
                    ...data.widgets,
                  };
                  for (const [key, value] of Object.entries(newData.widgets)) {
                    if (Object.prototype.hasOwnProperty.call(newWidgets, key)) {
                      if (newWidgets[key].c && value.c) {
                        newWidgets[key] = {...newWidgets[key]};
                        newWidgets[key].c = [...newWidgets[key].c!];
                        for (const child of value.c) {
                          if (!newWidgets[key].c?.includes(child)) {
                            newWidgets[key].c?.push(child);
                          }
                        }
                      }
                    } else {
                      newWidgets[key] = value;
                    }
                  }
                  newData.widgets = newWidgets;
                }
                if (!settings) newData.settings = data.settings;
                setSnackbarData(data);
                setData(newData);
              }
            }}
          >
            Confirm
          </MuiButton>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        autoHideDuration={7000}
        message={`Data ${confirmType === 'reset' ? 'reset' : 'restored'}`}
        onClose={() => setSnackbarData(undefined)}
        open={Boolean(snackbarData)}
        action={
          <MuiButton
            size='small'
            onClick={() => {
              setData(snackbarData!);
              setSnackbarData(undefined);
            }}
          >
            undo
          </MuiButton>
        }
      />
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        autoHideDuration={7000}
        onClose={() => setDataError(false)}
        open={dataError}
      >
        <Alert severity='error' sx={{width: '100%'}} variant='filled'>
          Error - Invalid Backup File
        </Alert>
      </Snackbar>
    </List>
  );
};

export default DataSettings;
