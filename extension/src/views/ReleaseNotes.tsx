import {Dialog, DialogContent} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import {useEffect, useState} from 'react';
import DialogTitleActions from '@/components/DialogTitleActions';
import {weblauncherVersion} from '@/globals';
import useStorage from '@/hooks/useStorage';

const ReleaseNotes: FC = () => {
  const [data, setData] = useStorage();
  const [body, setBody] = useState('');

  useEffect(() => {
    fetch(
      `https://api.github.com/repos/web-launcher/web-launcher/releases/tags/v${weblauncherVersion}`,
    )
      .then(async (v) => v.json())
      .then((v) => setBody(v.body));
  }, []);

  const handleClose = () =>
    setData((data) => {
      data.releaseNotes = false;
    });

  return (
    <Dialog onClose={handleClose} open={Boolean(body)}>
      <DialogTitleActions onClose={handleClose}>
        Web Launcher {weblauncherVersion} released
      </DialogTitleActions>
      <DialogContent>
        <ReactMarkdown>{body}</ReactMarkdown>
      </DialogContent>
    </Dialog>
  );
};

export default ReleaseNotes;
