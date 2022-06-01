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
  const [data, setData] = useStorage();

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
        icon={<UpdateIcon />}
        label={`View v${weblauncherVersion} Release Notes`}
        onClick={() =>
          setData((data) => {
            data.releaseNotes = true;
          })
        }
      />
    </List>
  );
};

export default WebLauncherInfo;
