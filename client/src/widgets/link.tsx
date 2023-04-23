import {Box, BoxProps, IconButton, SvgIcon} from '@mui/material';
import {Icon} from '@iconify-icon/react';

import Inputs from '@/components/Inputs';
import ContainerPicker from '@/components/ContainerPicker';

const link: Widget<
  {
    url: string;
    fgType: 'img' | 'ico' | 'let';
    fgData: string;
    bgColor: string;
    fgColor: string;
    scale: number;
    container?: string;
  },
  {
    openInNewTab: boolean;
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
    fgData: 'simple-icons:wikipedia',
    bgColor: '000000',
    fgColor: 'FFFFFF',
    scale: 100,
  },
  defaultGlobalData: {
    openInNewTab: false,
  },
  Widget({data, globalData, disable, inToolbar}) {
    let visual: React.ReactNode;
    switch (data.fgType) {
      case 'img': {
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
      }
      case 'ico': {
        visual = (
          <Icon
            height={inToolbar ? 24 : '100%'}
            icon={data.fgData}
            width={inToolbar ? 24 : '100%'}
            style={{
              color: `#${data.fgColor}`,
              transform: `scale(${data.scale * (inToolbar ? 0.01 : 0.007)})`,
            }}
          />
        );
        break;
      }
      case 'let': {
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
      }
      default: {
        break;
      }
    }

    const anchorProps: BoxProps = disable
      ? {}
      : {
          component: 'a',
          href: data.url,
          target: globalData.openInNewTab ? '_blank' : undefined,
          ...(PLATFORM === 'FIREFOX' && data.container
            ? {
                async onClick(e) {
                  e.preventDefault();
                  const current = await browser.tabs.getCurrent();
                  if (globalData.openInNewTab) {
                    browser.tabs.create({
                      url: data.url,
                      cookieStoreId: data.container,
                      index: current!.index + 1,
                    });
                  } else {
                    browser.tabs.create({
                      url: data.url,
                      cookieStoreId: data.container,
                      index: current!.index + 1,
                    });
                    browser.tabs.remove(current!.id!);
                  }
                },
                async onAuxClick(e) {
                  e.preventDefault();

                  browser.tabs.create({
                    url: data.url,
                    cookieStoreId: data.container,
                    active: false,
                    index: (await browser.tabs.getCurrent())!.index + 1,
                  });
                },
              }
            : {}),
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
          display: 'flex',
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
  Settings({data, setData}) {
    let fgDataElement;
    switch (data.fgType) {
      case 'ico': {
        fgDataElement = (
          <Inputs.Icon
            initialSearch={data.label}
            label='Foreground Icon'
            value={data.fgData}
            onChange={(newValue) => {
              setData({...data, fgData: newValue});
            }}
          />
        );
        break;
      }
      case 'img': {
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
      }
      case 'let': {
        fgDataElement = (
          <Inputs.Text
            label='Foreground Letter'
            onChange={(newValue) => setData({...data, fgData: newValue})}
            value={data.fgData}
          />
        );
        break;
      }
      default: {
        fgDataElement = <></>;
        break;
      }
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
        {PLATFORM === 'FIREFOX' && (
          <ContainerPicker
            value={data.container ?? ''}
            onChange={(newValue) => {
              setData({
                ...data,
                container: newValue === '' ? undefined : newValue,
              });
            }}
          />
        )}
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
      </>
    );
  },
};

export default link;
