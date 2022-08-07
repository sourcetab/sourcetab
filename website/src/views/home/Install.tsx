import {Button, Stack} from '@mui/material';
import {useEffect, useState} from 'react';
import {downloadMap} from './Downloads';

const Install: FC = () => {
  const [browser, setBrowser] = useState<
    'Chrome' | 'Edge' | 'Firefox' | 'other'
  >('other');

  useEffect(() => {
    if (navigator.userAgent.includes('Firefox')) {
      setBrowser('Firefox');
    } else if (navigator.userAgent.includes('Edg')) {
      setBrowser('Edge');
    } else if (navigator.userAgent.includes('Chrome')) {
      setBrowser('Chrome');
    }
  }, []);

  return (
    <Stack alignItems='center' direction='row' mb='20px' spacing='8px'>
      <Button
        href={browser === 'other' ? '#downloads' : downloadMap[browser]}
        size='large'
        target={browser === 'other' ? undefined : '_blank'}
        variant='contained'
      >
        Install {browser === 'other' ? 'Now' : `on ${browser}`}
      </Button>
      <Button
        href='https://demo.weblauncher.app'
        size='large'
        target='_blank'
        variant='outlined'
      >
        View Demo
      </Button>
    </Stack>
  );
};

export default Install;
