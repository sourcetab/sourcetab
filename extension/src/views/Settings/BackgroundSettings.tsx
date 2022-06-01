import {List} from '@mui/material';

import Inputs from '@/components/Inputs';
import YouTubeInput from '@/components/YouTubeInput';
import useStorage from '@/hooks/useStorage';

const defaultGradient: ['gradient', ...GradientValue] = [
  'gradient',
  60,
  'f3dec9',
  '017575',
];

const BackgroundSettings: FC = () => {
  const [data, setData] = useStorage();

  return (
    <List>
      <Inputs.Select
        label='Type'
        value={data.settings.bg[0]}
        onChange={(newValue) => {
          setData((data) => {
            if (
              ['image', 'video', 'iframe'].includes(data.settings.bg[0]) &&
              Object.prototype.hasOwnProperty.call(
                data.files,
                data.settings.bg[1],
              )
            ) {
              delete data.files[data.settings.bg[1]];
            }
            switch (newValue) {
              case 'color':
                setData((data) => {
                  data.settings.bg = ['color', '1DACA6'];
                });
                break;
              case 'gradient':
                setData((data) => {
                  data.settings.bg = defaultGradient;
                });
                break;
              case 'image':
                setData((data) => {
                  data.settings.bg = ['image', 'beach.jpg'];
                });
                break;
              case 'video':
                setData((data) => {
                  data.settings.bg = ['video', ''];
                });
                break;
              case 'iframe':
                setData((data) => {
                  data.settings.bg = ['iframe', ''];
                });
                break;
              case 'youtube':
                setData((data) => {
                  data.settings.bg = ['youtube', ''];
                });
                break;
              default:
                break;
            }
          });
        }}
        options={{
          color: 'Color',
          gradient: 'Gradient',
          image: 'Image',
          video: 'Video',
          iframe: 'IFrame',
          youtube: 'YouTube',
        }}
      />
      {data.settings.bg[0] === 'color' ? (
        <Inputs.Color
          label='Color'
          value={data.settings.bg[1]}
          onChange={(newValue) =>
            setData((data) => {
              data.settings.bg[1] = newValue;
            })
          }
        />
      ) : undefined}
      {data.settings.bg[0] === 'gradient' ? (
        <>
          <Inputs.Number
            label='Angle'
            max={359}
            min={0}
            step={1}
            value={data.settings.bg[1]}
            onChange={(newValue) =>
              setData((data) => {
                data.settings.bg[1] = newValue;
              })
            }
          />
          <Inputs.Color
            label='From'
            value={data.settings.bg[2]}
            onChange={(newValue) =>
              setData((data) => {
                data.settings.bg[2] = newValue;
              })
            }
          />
          <Inputs.Color
            label='To'
            value={data.settings.bg[3]}
            onChange={(newValue) =>
              setData((data) => {
                data.settings.bg[3] = newValue;
              })
            }
          />
        </>
      ) : undefined}
      {['image', 'video', 'iframe'].includes(data.settings.bg[0]) ? (
        <Inputs.File
          label='File'
          value={data.settings.bg[1] as string}
          accept={
            {
              image: 'image/*',
              video: 'video/mp4,video/ogg,video/webm',
              iframe: 'text/html',
            }[data.settings.bg[0] as 'image' | 'video' | 'iframe']
          }
          onChange={(newValue) =>
            setData((data) => {
              data.settings.bg[1] = newValue;
            })
          }
        />
      ) : undefined}
      {data.settings.bg[0] === 'youtube' ? (
        <YouTubeInput
          value={data.settings.bg[1]}
          onChange={(newValue) =>
            setData((data) => {
              data.settings.bg[1] = newValue;
            })
          }
        />
      ) : undefined}
    </List>
  );
};

export default BackgroundSettings;
