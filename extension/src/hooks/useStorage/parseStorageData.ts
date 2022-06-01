/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call */

import {weblauncherVersion} from '@/globals';
import {genId, versionLessThan, nonPatchVersionLessThan} from '@/utils';

import genDefaultData from './genDefaultData';

export default function parseStorageData(
  data: any,
  releaseNotes: boolean,
): StorageObject | undefined {
  try {
    const version = data?.weblauncher || data?.ver || data?.version;
    if (version) {
      if (version !== weblauncherVersion) {
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
        } else newData = data as StorageObject;

        return {
          ...newData,
          weblauncher: weblauncherVersion,
          releaseNotes:
            releaseNotes &&
            nonPatchVersionLessThan(version, weblauncherVersion),
        };
      }

      return data as StorageObject;
    }
  } catch (error: unknown) {
    console.error(error);
  }

  return undefined;
}
