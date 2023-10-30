/* eslint-disable @typescript-eslint/no-unsafe-call */

import {genId, nonPatchVersionLessThan, versionLessThan} from '~/utils';

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
        if (versionLessThan(version, '4.0.0')) {
          newData = genDefaultData(data.widgets);
          if (data.settings.bg[1] !== 'beach.jpg') {
            newData.user.theme ??= {};
            newData.user.theme.background = data.settings.bg;
          }
          // TODO: carry over layout (apperance) settings
        } else if (versionLessThan(version, '3.0.0')) {
          const widgets = {
            d: {children: []},
            tl: {children: []},
            tc: {children: []},
            tr: {children: ['m']},
          } as unknown as NonNullable<Workspace['widgets']>;

          if (data.clock.render) {
            const clockId = genId();
            widgets[clockId] = {
              type: 'clock',
              label: 'Clock',
              time: data.clock?.twentyFourHourFormat ? '24' : '12',
              seconds: Boolean(data.clock?.seconds),
              date: 'short',
              format: '',
            };
            widgets.tl.children!.push(clockId);
          }

          if (Array.isArray(data.websites)) {
            for (const v of data.websites) {
              const id = genId();
              widgets[id] = {
                type: 'link',
                label: v.name,
                url: v.url,
                fgType: 'img',
                fgData: v.icon,
                bgColor: (v.backgroundColor || '#FFFFFF').slice(1),
                fgColor: '000000',
                scale: 100,
              };
              widgets.d.children!.push(id);
            }
          }

          newData = genDefaultData(widgets);

          if (data?.background?.url) {
            newData.user.theme ??= {};
            newData.user.theme.background = data.background.url;
          }
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
}
