/* eslint-disable @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call */

import {genId, versionLessThan, nonPatchVersionLessThan} from '@/utils';

import genDefaultData from './genDefaultData';

export default function parseStorageData(
  data: any,
  releaseNotes: boolean,
): StorageObject | undefined {
  try {
    const version =
      data?.sourcetab || data?.weblauncher || data?.ver || data?.version;
    if (version) {
      if (version !== VERSION) {
        let newData: StorageObject;
        if (versionLessThan(version, '3.0.0')) {
          newData = genDefaultData(false);

          if (data?.background?.url)
            newData.settings.bg[1] = data.background.url;

          if (data.clock.render) {
            const clockId = genId();
            newData.widgets[clockId] = {
              t: 'clock',
              d: {
                label: 'Clock',
                time: data.clock?.twentyFourHourFormat ? '24' : '12',
                seconds: Boolean(data.clock?.seconds),
                date: 'short',
                format: '',
              },
            };
            newData.widgets.tl.c!.push(clockId);
          }

          if (Array.isArray(data.websites)) {
            for (const v of data.websites) {
              const id = genId();
              newData.widgets[id] = {
                t: 'link',
                d: {
                  label: v.name,
                  url: v.url,
                  fgType: 'img',
                  fgData: v.icon,
                  bgColor: (v.backgroundColor || '#FFFFFF').slice(1),
                  fgColor: '000000',
                  scale: 100,
                },
              };
              newData.widgets.d.c!.push(id);
            }
          }
        } else if (versionLessThan(version, '3.3.0')) {
          newData = data as StorageObject;
          newData.settings.icons = ['simple-icons', 'logos'];
          for (const widget of Object.values(newData.widgets)) {
            if (widget?.t === 'link' && widget.d.fgType === 'ico') {
              widget.d.fgData = 'simple-icons:' + String(widget.d.fgData);
            }
          }

          if (
            newData.settings.pageTitle.toLowerCase().replace(/\s/g, '') ===
            'weblauncher'
          )
            newData.settings.pageTitle = 'Sourcetab';

          delete newData.weblauncher;
          delete newData.settings.widgets.link.autocomplete;
        } else newData = data as StorageObject;

        return {
          ...newData,
          sourcetab: VERSION,
          releaseNotes:
            releaseNotes && nonPatchVersionLessThan(version, VERSION),
        };
      }

      return data as StorageObject;
    }
  } catch (error: unknown) {
    console.error(error);
  }

  return undefined;
}
