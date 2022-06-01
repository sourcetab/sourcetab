import {Box, IconButton, SvgIcon} from '@mui/material';

import {SimpleIcons, simpleIconsConfig} from '@/components/SimpleIcons';
import Inputs from '@/components/Inputs';

const link: Widget<
  {
    url: string;
    fgType: 'img' | 'ico' | 'let';
    fgData: string;
    bgColor: string;
    fgColor: string;
    scale: number;
  },
  {
    autocomplete: {
      label: boolean;
      bg: boolean;
      fg: boolean;
    };
  }
> = {
  name: 'Link',
  help: 'link',
  defaultData: {
    url: '',
    fgType: 'ico',
    fgData: '',
    bgColor: 'FFFFFF',
    fgColor: '000000',
    scale: 100,
  },
  exampleData: {
    url: 'https://www.wikipedia.org',
    fgType: 'ico',
    fgData: 'wikipedia',
    bgColor: '000000',
    fgColor: 'FFFFFF',
    scale: 100,
  },
  defaultGlobalData: {
    autocomplete: {
      label: false,
      bg: true,
      fg: true,
    },
  },
  Widget({data, disable, inToolbar}) {
    let visual: React.ReactNode;
    switch (data.fgType) {
      case 'img':
        visual = (
          <Box
            component='img'
            src={data.fgData}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transform: `scale(${data.scale * 0.01})`,
            }}
          />
        );
        break;
      case 'ico':
        visual = inToolbar ? (
          <SvgIcon
            sx={{
              fill: `#${data.fgColor}`,
              transform: `scale(${data.scale * 0.01})`,
            }}
          >
            <SimpleIcons icon={data.fgData} />
          </SvgIcon>
        ) : (
          <svg
            fill={`#${data.fgColor}`}
            transform={`scale(${data.scale * 0.0065})`}
            viewBox='0 0 24 24'
          >
            <SimpleIcons icon={data.fgData} />
          </svg>
        );
        break;
      case 'let':
        visual = (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              lineHeight: '125px',
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                color: `#${data.fgColor}`,
                verticalAlign: 'middle',
                display: 'inline-block',
                wordWrap: 'break-word',
                lineHeight: 1,
                width: '100%',
                fontSize: data.scale * 0.45,
                fontWeight: 'bold',
              }}
            >
              {data.fgData}
            </Box>
          </Box>
        );
        break;
      default:
        break;
    }

    return inToolbar ? (
      <Box sx={{backgroundColor: `#${data.bgColor}`, borderRadius: '50%'}}>
        <IconButton
          {...(disable ? {disabled: true} : {component: 'a', href: data.url})}
        >
          {visual}
        </IconButton>
      </Box>
    ) : (
      <Box
        {...(disable ? {} : {component: 'a', href: data.url})}
        sx={{
          width: '100%',
          height: '100%',
          display: 'inline-block',
          color: 'black',
          textDecoration: 'none',
          borderRadius: 'inherit',
          backgroundColor: `#${data.bgColor}`,
          overflow: 'hidden',
        }}
      >
        {visual}
      </Box>
    );
  },
  Settings({data, setData, globalData}) {
    let fgDataElement;
    switch (data.fgType) {
      case 'ico':
        fgDataElement = (
          <Inputs.Icon
            label='Foreground Icon'
            value={data.fgData}
            onChange={(newValue) => {
              const icon = simpleIconsConfig[newValue];
              const newData = {...data, fgData: newValue};

              if (globalData.autocomplete.label) {
                newData.label = icon[0];
              }

              if (globalData.autocomplete.bg) {
                newData.bgColor = icon[1];
              }

              if (globalData.autocomplete.fg) {
                newData.fgColor = icon[2] ? 'FFFFFFFF' : '000000FF';
              }

              setData(newData);
            }}
          />
        );
        break;
      case 'img':
        fgDataElement = (
          <Inputs.File
            accept='image/*'
            label='Foreground Image'
            value={data.fgData}
            onChange={
              (newValue) =>
                // @ts-expect-error
                setData((data) => ({...data, fgData: newValue})) // eslint-disable-line @typescript-eslint/no-unsafe-return
            }
          />
        );
        break;
      case 'let':
        fgDataElement = (
          <Inputs.Text
            label='Foreground Letter'
            onChange={(newValue) => setData({...data, fgData: newValue})}
            value={data.fgData}
          />
        );
        break;
      default:
        fgDataElement = <></>;
        break;
    }

    return (
      <>
        <Inputs.Text
          label='URL'
          onChange={(newValue) => setData({...data, url: newValue})}
          value={data.url}
        />
        <Inputs.Select
          label='Foreground Type'
          options={{ico: 'Icon', img: 'Image', let: 'Letter'}}
          value={data.fgType}
          onChange={(newValue) =>
            setData({...data, fgType: newValue, fgData: ''})
          }
        />
        {fgDataElement}
        <Inputs.Color
          alpha
          label='Background Color'
          onChange={(newValue) => setData({...data, bgColor: newValue})}
          value={data.bgColor}
        />
        <Inputs.Color
          alpha
          label='Foreground Color'
          onChange={(newValue) => setData({...data, fgColor: newValue})}
          value={data.fgColor}
        />
        <Inputs.Number
          label='Scale'
          onChange={(newValue) => setData({...data, scale: newValue})}
          softMax={200}
          softMin={50}
          value={data.scale}
        />
      </>
    );
  },
  GlobalSettings({data, setData}) {
    return (
      <>
        <Inputs.Switch
          label='Autocomplete Label'
          value={data.autocomplete.label}
          onChange={(newValue) =>
            setData({
              ...data,
              autocomplete: {
                ...data.autocomplete,
                label: newValue,
              },
            })
          }
        />
        <Inputs.Switch
          label='Autocomplete Background'
          value={data.autocomplete.bg}
          onChange={(newValue) =>
            setData({
              ...data,
              autocomplete: {
                ...data.autocomplete,
                bg: newValue,
              },
            })
          }
        />
        <Inputs.Switch
          label='Autocomplete Foreground'
          value={data.autocomplete.fg}
          onChange={(newValue) =>
            setData({
              ...data,
              autocomplete: {
                ...data.autocomplete,
                fg: newValue,
              },
            })
          }
        />
      </>
    );
  },
};

export default link;
