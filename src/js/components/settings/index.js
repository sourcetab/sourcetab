import {
  Dialog,
  DialogContent,
  IconButton,
  SvgIcon,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import pkg from '../../../../package.json';
import useStorage from '../../hooks/useStorage';
import DialogHeader from '../DialogHeader';
import Section from './Section';
import Input from './Input';
import DataSection from './sections/DataSection';

export default function SettingsDialog({ settings, setSettings }) {
  const close = () => setSettings(false);

  const [data, dispatch] = useStorage();

  return (
    <Dialog open={settings} onClose={close}>
      <DialogHeader onClose={close}>Settings</DialogHeader>
      <DialogContent>
        <Section>
          <Input
            header
            label="Clock"
            control={
              <Switch
                checked={data.clock.render}
                onChange={e =>
                  dispatch({
                    type: 'set',
                    path: 'clock.render',
                    value: e.target.checked,
                  })
                }
              />
            }
          />

          <Input
            disabled={!data.clock.render}
            control={
              <Switch
                checked={data.clock.renderSeconds}
                onChange={e =>
                  dispatch({
                    type: 'set',
                    path: 'clock.renderSeconds',
                    value: e.target.checked,
                  })
                }
              />
            }
            label="Show seconds"
          />
          <Input
            disabled={!data.clock.render}
            control={
              <Switch
                checked={data.clock.twentyFourHourFormat}
                onChange={e =>
                  dispatch({
                    type: 'set',
                    path: 'clock.twentyFourHourFormat',
                    value: e.target.checked,
                  })
                }
              />
            }
            label="24 hour format"
          />
        </Section>

        <Section>
          <Input header label="Background" />

          <Input
            control={
              <TextField
                label="url"
                variant="outlined"
                value={data.background.url}
                onChange={e =>
                  dispatch({
                    type: 'set',
                    path: 'background.url',
                    value: e.target.value,
                  })
                }
              />
            }
            label="Url"
          />
        </Section>

        <DataSection />

        <Section>
          <Input header label={`Web Launcher ${pkg.version}`} />
          <Typography paragraph>{pkg.description}</Typography>
          <a
            href="https://github.com/jwr12135/web-launcher"
            style={{ textDecoration: 'none' }}
          >
            <Input
              label="View on GitHub"
              control={
                <IconButton>
                  <SvgIcon>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </SvgIcon>
                </IconButton>
              }
            />
          </a>
        </Section>
      </DialogContent>
    </Dialog>
  );
}
