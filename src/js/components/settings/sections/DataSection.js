import { useState } from 'react';
import { Button, Snackbar } from '@material-ui/core';
import { CloudDownload, CloudUpload, Loop } from '@material-ui/icons';
import useStorage from '../../../hooks/useStorage';
import Section from '../Section';
import Input from '../Input';
import Confirm from '../Confirm';
import initData from '../../../hooks/useStorageSetup/data';

export default function DataSection() {
  const [data, dispatch] = useStorage();
  const setData = value => dispatch({ type: 'set', value });

  const [restoreDataPlaceholder, setRestoreDataPlaceholder] = useState();
  const [restoreDataSnackbarData, setRestoreDataSnackbarData] = useState();

  const [resetDataOpen, setResetDataOpen] = useState(false);
  const [resetDataSnackbarData, setResetDataSnackbarData] = useState();

  return (
    <Section>
      <Confirm
        handleCancel={() => setResetDataOpen(false)}
        handleConfirm={() => {
          setRestoreDataSnackbarData(data);
          setData(JSON.parse(restoreDataPlaceholder));
          setRestoreDataPlaceholder();
        }}
        open={!!restoreDataPlaceholder}
        title="Restore data?"
      >
        This will replace all of Web Launcher&#39;s data with the selected
        file&#39;s data.
      </Confirm>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!!restoreDataSnackbarData}
        autoHideDuration={5000}
        onClose={() => setRestoreDataSnackbarData()}
        message="Data restored"
        action={
          <Button
            color="secondary"
            size="small"
            onClick={() => {
              setData(restoreDataSnackbarData);
              setRestoreDataSnackbarData();
            }}
          >
            UNDO
          </Button>
        }
      />

      <Confirm
        handleCancel={() => setResetDataOpen(false)}
        handleConfirm={() => {
          setResetDataSnackbarData(data);
          setResetDataOpen(false);
          setData(initData.default);
        }}
        open={resetDataOpen}
        title="Reset data?"
      >
        This will reset all of Web Launcher&#39;s data to it&#39;s default
        state.
      </Confirm>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!!resetDataSnackbarData}
        autoHideDuration={5000}
        onClose={() => setResetDataSnackbarData()}
        message="Data reset"
        action={
          <Button
            color="secondary"
            size="small"
            onClick={() => {
              setData(resetDataSnackbarData);
              setResetDataSnackbarData();
            }}
          >
            UNDO
          </Button>
        }
      />

      <Input header label="Data" />

      <Input
        control={
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudDownload />}
            onClick={() => {
              const time = new Date();
              const filename = `weblauncher-${time.getFullYear()}-${
                time.getMonth() + 1
              }-${time.getDate()}-${time.getHours()}-${time.getMinutes()}-${time.getSeconds()}`;
              const e = document.createElement('a');
              e.setAttribute(
                'href',
                `data:application/json;charset=utf-8,${encodeURIComponent(
                  JSON.stringify(data)
                )}`
              );
              e.setAttribute('download', filename);

              e.style.display = 'none';
              document.body.appendChild(e);

              e.click();

              document.body.removeChild(e);
            }}
          >
            Download
          </Button>
        }
        label="Backup your data"
      />

      <Input
        control={
          <>
            <input
              accept="application/json"
              type="file"
              style={{ display: 'none' }}
              onChange={e => {
                e.target.files[0]
                  .text()
                  .then(value => setRestoreDataPlaceholder(value));
              }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUpload />}
              component="span"
            >
              Upload
            </Button>
          </>
        }
        label="Restore your data"
      />

      <Input
        control={
          <Button
            variant="contained"
            color="primary"
            startIcon={<Loop />}
            onClick={() => setResetDataOpen(true)}
          >
            Reset
          </Button>
        }
        label="Reset your data"
      />
    </Section>
  );
}
