import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';

export default function WebsiteDialog({
  websites,
  setWebsites,
  websiteDialogIndex,
  setWebsiteDialogIndex,
}) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [icon, setIcon] = useState('');

  const [nameError, setNameError] = useState('');
  const [urlError, setUrlError] = useState('');
  const [iconError, setIconError] = useState('');

  const close = () => {
    setWebsiteDialogIndex(undefined);
    setName('');
    setUrl('');
    setIcon('');
  };

  const submit = e => {
    e.preventDefault();
    let errors = 0;

    if (name.length > 0) {
      setNameError('');
    } else {
      errors += 1;
      setNameError('Name must be filled.');
    }

    if (url.length > 0) {
      setUrlError('');
    } else {
      errors += 1;
      setUrlError('URL must be filled.');
    }

    if (icon.length > 0) {
      setIconError('');
    } else {
      errors += 1;
      setIconError('Icon URL must be filled.');
    }

    if (errors === 0) {
      if (websiteDialogIndex === null) {
        setWebsites([
          ...websites,
          {
            name,
            url,
            icon,
          },
        ]);
      } else {
        setWebsites([
          ...websites.slice(0, websiteDialogIndex),
          {
            name,
            url,
            icon,
          },
          ...websites.slice(websiteDialogIndex + 1),
        ]);
      }

      close();
    }
  };

  useEffect(() => {
    if (typeof websiteDialogIndex === 'number') {
      setName(websites[websiteDialogIndex].name);
      setUrl(websites[websiteDialogIndex].url);
      setIcon(websites[websiteDialogIndex].icon);
    }
  }, [websiteDialogIndex, websites]);

  return (
    <Dialog open={websiteDialogIndex !== undefined} onClose={close}>
      <form onSubmit={submit}>
        <DialogTitle>{`${
          websiteDialogIndex !== null ? 'Edit' : 'Add'
        } Website`}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            error={nameError.length > 0}
            helperText={nameError}
            onChange={e => {
              setName(e.target.value);
            }}
            value={name}
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            label="URL"
            error={urlError.length > 0}
            helperText={urlError}
            onChange={e => {
              setUrl(e.target.value);
            }}
            value={url}
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            label="Icon URL"
            error={iconError.length > 0}
            helperText={iconError}
            onChange={e => {
              setIcon(e.target.value);
            }}
            value={icon}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
