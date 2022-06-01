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
  DialogContentText,
  DialogTitle,
  List,
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
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [confirmType, setConfirmType] = useState<0 | 1>(0);
  const [snackbarData, setSnackbarData] = useState<StorageObject>();
  const [dataError, setDataError] = useState(false);

  const closeConfirmDialog = () => setConfirmDialog(false);

  const closeDataError = () => setDataError(false);

  return (
    <List>
      <Inputs.Button
        icon={<DownloadIcon />}
        label='Backup Data'
        onClick={() => {
          const time = new Date();
          downloadJson(
            `weblauncher-${time.getFullYear()}-${
              time.getMonth() + 1
            }-${time.getDate()}-${time.getHours()}-${time.getMinutes()}-${time.getSeconds()}.json`,
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
              setConfirmType(0);
              setConfirmDialog(true);
            } else setDataError(true);
          })
        }
      />
      <Inputs.Button
        icon={<AutorenewIcon />}
        label='Reset Data'
        onClick={() => {
          setConfirmType(1);
          setConfirmDialog(true);
        }}
      />
      <Dialog onClose={closeConfirmDialog} open={confirmDialog}>
        <DialogTitle>{`${
          confirmType ? 'Reset' : 'Restore'
        } data?`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmType
              ? "This will reset all of Web Launcher's data to it's default state."
              : "This will replace all of Web Launcher's data with the selected file's data."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={closeConfirmDialog}>Cancel</MuiButton>
          <MuiButton
            autoFocus
            onClick={() => {
              if (confirmType) {
                closeConfirmDialog();
                setSnackbarData(data);
                setData(genDefaultData());
              } else {
                closeConfirmDialog();
                setSnackbarData(data);
                setData(restoreDataFile!);
              }
            }}
          >
            Confirm
          </MuiButton>
        </DialogActions>
      </Dialog>
      <Snackbar
        autoHideDuration={7000}
        message={`Data ${confirmType ? 'reset' : 'restored'}`}
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
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      />
      <Snackbar
        autoHideDuration={7000}
        onClose={closeDataError}
        open={dataError}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert severity='error' sx={{width: '100%'}} variant='filled'>
          Error - Invalid Backup File
        </Alert>
      </Snackbar>
    </List>
  );
};

export default DataSettings;
