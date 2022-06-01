import {Box, BoxProps} from '@mui/material';

import useStorage from '@/hooks/useStorage';
import useStorageFile from '@/hooks/useStorageFile';

const commonStyle: BoxProps['sx'] = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  zIndex: -1,
  pointerEvents: 'none',
};

const Background: FC = () => {
  const [data] = useStorage();
  const resolveFile = useStorageFile();

  let backgroundElement: React.ReactElement;

  switch (data.settings.bg[0]) {
    case 'color':
      backgroundElement = (
        <Box
          sx={{
            ...commonStyle,
            backgroundColor: `#${data.settings.bg[1]}`,
          }}
        />
      );
      break;
    case 'gradient': {
      backgroundElement = (
        <Box
          sx={{
            ...commonStyle,
            background: `linear-gradient(${data.settings.bg[1]}deg,#${data.settings.bg[2]} 0%,#${data.settings.bg[3]} 100%)`,
          }}
        />
      );
      break;
    }

    case 'image':
      backgroundElement = (
        <Box
          alt=''
          component='img'
          src={resolveFile(data.settings.bg[1])}
          sx={{...commonStyle, objectFit: 'cover'}}
        />
      );
      break;
    case 'video':
      backgroundElement = (
        <Box
          loop
          muted
          component='video'
          src={resolveFile(data.settings.bg[1])}
          sx={{...commonStyle, objectFit: 'cover'}}
        />
      );
      break;
    case 'iframe':
      backgroundElement = (
        <Box
          allow='accelerometer;autoplay;encrypted-media;gyroscope'
          component='iframe'
          id='youtube'
          src={resolveFile(data.settings.bg[1])}
          sx={{...commonStyle}}
          tabIndex={-1}
        />
      );
      break;
    case 'youtube':
      backgroundElement = (
        <Box
          allow='accelerometer;autoplay;encrypted-media;gyroscope'
          component='iframe'
          sx={{...commonStyle}}
          tabIndex={-1}
          src={`https://www.youtube.com/embed/${resolveFile(
            data.settings.bg[1],
          )}?autoplay=1&controls=0&loop=1`}
        />
      );
      break;
    default:
      backgroundElement = <></>;
      break;
  }

  return backgroundElement;
};

export default Background;
