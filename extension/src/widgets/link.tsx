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
    openInNewTab: boolean;
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
    openInNewTab: false,
    autocomplete: {
      label: false,
      bg: true,
      fg: true,
    },
  },
  Widget({data, globalData, disable, inToolbar}) {
    let visual: React.ReactNode;
    switch (data.fgType) {
      case 'img':
        visual = inToolbar ? (
          <SvgIcon
            sx={{
              fill: `#${data.fgColor}`,
              transform: `scale(${data.scale * 0.0167})`,
            }}
          >
            <image height='24' href={data.fgData} width='24' />
          </SvgIcon>
        ) : (
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
        visual = (
          <SvgIcon
            sx={{
              fill: `#${data.fgColor}`,
              transform: `scale(${data.scale * (inToolbar ? 0.01 : 0.0065)})`,
              ...(inToolbar ? {} : {width: '100%', height: '100%'}),
            }}
          >
            <SimpleIcons icon={data.fgData} />
          </SvgIcon>
        );
        break;
      case 'let':
        visual = (
          <SvgIcon
            sx={{
              fill: `#${data.fgColor}`,
              ...(inToolbar
                ? {transform: `scale(1.67)`}
                : {
                    width: '100%',
                    height: '100%',
                  }),
            }}
          >
            <text
              dominantBaseline='middle'
              fontSize={data.scale * 0.14}
              fontWeight='bold'
              textAnchor='middle'
              x='12'
              y='12'
            >
              {data.fgData}
            </text>
          </SvgIcon>
        );
        break;
      default:
        break;
    }

    const anchorProps = disable
      ? {}
      : {
          component: 'a',
          href: data.url,
          target: globalData.openInNewTab ? '_blank' : undefined,
        };

    return inToolbar ? (
      <Box sx={{backgroundColor: `#${data.bgColor}`, borderRadius: '50%'}}>
        <IconButton sx={{overflow: 'hidden'}} {...anchorProps}>
          {visual}
        </IconButton>
      </Box>
    ) : (
      <Box
        {...anchorProps}
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
          label='Open in New Tab'
          value={data.openInNewTab}
          onChange={(newValue) =>
            setData({
              ...data,
              openInNewTab: newValue,
            })
          }
        />
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
