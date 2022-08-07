import {List, SvgIcon} from '@mui/material';

import {
  OpenInNew as OpenInNewIcon,
  Update as UpdateIcon,
} from '@mui/icons-material';
import Inputs from '@/components/Inputs';
import {SimpleIcons} from '@/components/SimpleIcons';
import {weblauncherVersion} from '@/globals';
import useStorage from '@/hooks/useStorage';

const WebLauncherInfo: FC = () => {
  return (
    <List>
      <Inputs.Button
        href='https://weblauncher.app'
        icon={<OpenInNewIcon />}
        label='Official website'
      />
      <Inputs.Button
        href='https://github.com/web-launcher/web-launcher'
        label='GitHub Repository'
        icon={
          <SvgIcon>
            <SimpleIcons icon='github' />
          </SvgIcon>
        }
      />
      <Inputs.Button
        href={`https://github.com/web-launcher/web-launcher/releases/tag/v${weblauncherVersion}`}
        icon={<UpdateIcon />}
        label={`View v${weblauncherVersion} Release Notes`}
      />
    </List>
  );
};

export default WebLauncherInfo;
