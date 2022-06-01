import {
  Extension as ExtensionIcon,
  Palette as PaletteIcon,
  Storage as StorageIcon,
  Wallpaper as WallpaperIcon,
  Widgets as WidgetsIcon,
} from '@mui/icons-material';
import {
  alpha,
  Box,
  Dialog,
  DialogContent,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  useTheme,
} from '@mui/material';
import {useState} from 'react';

import DialogTitleActions from '@/components/DialogTitleActions';

import AppearanceSettings from './AppearanceSettings';
import BackgroundSettings from './BackgroundSettings';
import DataSettings from './DataSettings';
import WebLauncherInfo from './WebLauncherInfo';

const settingsNav: Array<{
  name: string;
  Icon: typeof SvgIcon;
  component: React.ReactNode;
  help?: string;
}> = [
  {
    name: 'Appearance',
    Icon: PaletteIcon,
    component: <AppearanceSettings />,
    help: 'appearance',
  },
  {
    name: 'Background',
    Icon: WallpaperIcon,
    component: <BackgroundSettings />,
    help: 'background',
  },
  {
    name: 'Data',
    Icon: StorageIcon,
    component: <DataSettings />,
    help: 'data',
  },
  {
    name: 'Web Launcher',
    Icon: ExtensionIcon,
    component: <WebLauncherInfo />,
  },
];

const SettingsDialog: FC<{
  settingsDialog: boolean;
  setSettingsDialog: (newValue: boolean) => void;
}> = ({settingsDialog, setSettingsDialog}) => {
  const [nav, setNav] = useState(0);

  const theme = useTheme();

  const close = () => setSettingsDialog(false);

  return (
    <Dialog fullWidth maxWidth='md' onClose={close} open={settingsDialog}>
      <DialogTitleActions
        onClose={close}
        help={
          settingsNav[nav].help
            ? `settings/${settingsNav[nav].help!}`
            : 'settings'
        }
      >
        Settings
      </DialogTitleActions>
      <Divider />
      <Box sx={{display: 'flex'}}>
        <List>
          {settingsNav.map((v, index) => (
            <ListItem
              disablePadding
              key={v.name}
              sx={
                nav === index
                  ? {
                      bgcolor: alpha(
                        theme.palette.mode === 'dark'
                          ? theme.palette.primary.light
                          : theme.palette.primary.dark,
                        theme.palette.action.selectedOpacity,
                      ),
                    }
                  : undefined
              }
            >
              <ListItemButton onClick={() => setNav(index)}>
                <ListItemIcon>
                  <v.Icon {...(nav === index ? {color: 'inherit'} : {})} />
                </ListItemIcon>
                <ListItemText
                  primary={v.name}
                  sx={
                    nav === index
                      ? {'.MuiTypography-root': {fontStyle: 'italic'}}
                      : undefined
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider flexItem orientation='vertical' />
        <DialogContent sx={{height: '300px', overflow: 'auto'}}>
          {settingsNav[nav].component}
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default SettingsDialog;
