import {Alert, Button, Snackbar} from '@mui/material';
import {useEffect, useState} from 'react';

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
            href={`https://github.com/sourcetab/sourcetab/releases/tag/v${VERSION}`}
            size='small'
          >
            See Release
          </Button>
        }
      >
        Sourcetab updated to v{VERSION}
      </Alert>
    </Snackbar>
  );
};

export default ReleaseNotes;
