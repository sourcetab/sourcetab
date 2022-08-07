import {Alert, Button, Snackbar} from '@mui/material';
import {useEffect, useState} from 'react';
import {weblauncherVersion} from '@/globals';
import useStorage from '@/hooks/useStorage';

const ReleaseNotes: FC = () => {
  const [data, setData] = useStorage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data.releaseNotes) {
      setOpen(true);
      setData((data) => {
        data.releaseNotes = false;
      });
    }
  }, []);

  return (
    <Snackbar
      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      onClose={() => setOpen(false)}
      open={open}
    >
      <Alert
        severity='info'
        action={
          <Button
            color='inherit'
            href={`https://github.com/web-launcher/web-launcher/releases/tag/v${weblauncherVersion}`}
            size='small'
          >
            See Release
          </Button>
        }
      >
        Web Launcher updated to v{weblauncherVersion}
      </Alert>
    </Snackbar>
  );
};

export default ReleaseNotes;
