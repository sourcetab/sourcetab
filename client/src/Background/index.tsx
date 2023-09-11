import {Component, JSX} from 'solid-js';
import useStorageFile from '~/storage/useStorageFile';
import {useWorkspace} from '../storage/useWorkspace';

const Background: Component = () => {
  const [ws] = useWorkspace();
  const resolveFile = useStorageFile();

  const background = () => {
    let backgroundElement: JSX.Element;

    switch (ws.settings.theme.background[0]) {
      case 'color': {
        backgroundElement = (
          <div
            class='fixed w-full h-full pointer-events-none -z-10'
            style={{
              'background-color': `#${ws.settings.theme.background[1]}`,
            }}
          />
        );
        break;
      }
      case 'gradient': {
        backgroundElement = (
          <div
            class='fixed w-full h-full pointer-events-none -z-10'
            style={{
              background: `linear-gradient(${ws.settings.theme.background[1]}deg,#${ws.settings.theme.background[2]} 0%,#${ws.settings.theme.background[3]} 100%)`,
            }}
          />
        );
        break;
      }

      case 'image': {
        backgroundElement = (
          <img
            class='fixed w-full h-full pointer-events-none -z-10'
            alt=''
            src={resolveFile(ws.settings.theme.background[1])}
            style={{'object-fit': 'cover'}}
          />
        );
        break;
      }
      case 'video': {
        backgroundElement = (
          <video
            class='fixed w-full h-full pointer-events-none -z-10'
            loop
            muted
            src={resolveFile(ws.settings.theme.background[1])}
            style={{'object-fit': 'cover'}}
          />
        );
        break;
      }
      case 'iframe': {
        backgroundElement = (
          <iframe
            class='fixed w-full h-full pointer-events-none -z-10'
            allow='accelerometer;autoplay;encrypted-media;gyroscope'
            src={resolveFile(ws.settings.theme.background[1])}
            tabIndex={-1}
          />
        );
        break;
      }
      case 'youtube': {
        backgroundElement = (
          <iframe
            class='fixed w-full h-full pointer-events-none -z-10'
            allow='accelerometer;autoplay;encrypted-media;gyroscope'
            tabIndex={-1}
            src={`https://www.youtube.com/embed/${resolveFile(
              ws.settings.theme.background[1],
            )}?autoplay=1&controls=0&loop=1`}
          />
        );
        break;
      }
      default: {
        backgroundElement = <></>;
        break;
      }
    }

    return backgroundElement;
  };

  return background();
};

export default Background;
