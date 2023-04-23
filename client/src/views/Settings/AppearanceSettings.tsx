import {List} from '@mui/material';

import Inputs from '@/components/Inputs';
import useStorage from '@/hooks/useStorage';

const AppearanceSettings: FC = () => {
  const [data, setData] = useStorage();

  return (
    <List>
      <Inputs.Color
        alpha
        label='Theme Color'
        value={data.settings.themeColor}
        onChange={(newValue) =>
          setData((data) => {
            data.settings.themeColor = newValue;
          })
        }
      />
      <Inputs.Select
        label='Dark Mode'
        options={{auto: 'Auto', enabled: 'Enabled', disabled: 'Disabled'}}
        value={data.settings.darkMode}
        onChange={(newValue) =>
          setData((data) => {
            data.settings.darkMode = newValue;
          })
        }
      />
      <Inputs.Text
        label='Page Title'
        value={data.settings.pageTitle}
        onChange={(newValue) =>
          setData((data) => {
            data.settings.pageTitle = newValue;
          })
        }
      />
      <Inputs.Number
        label='Border Radius'
        min={0}
        softMax={36}
        value={data.settings.borderRadius}
        onChange={(newValue) =>
          setData((data) => {
            data.settings.borderRadius = newValue;
          })
        }
      />
      <Inputs.Switch
        label='Show Help'
        value={data.settings.showHelp}
        onChange={(newValue) =>
          setData((data) => {
            data.settings.showHelp = newValue;
          })
        }
      />
      <Inputs.Number
        label='Dashboard Columns'
        min={0}
        softMax={8}
        value={data.settings.dashboard.columns}
        onChange={(newValue) =>
          setData((data) => {
            data.settings.dashboard.columns = newValue;
          })
        }
      />
      <Inputs.Number
        label='Dashboard Margin'
        min={0}
        softMax={200}
        value={data.settings.dashboard.margin}
        onChange={(newValue) =>
          setData((data) => {
            data.settings.dashboard.margin = newValue;
          })
        }
      />
      <Inputs.Number
        label='Dashboard Gap Size'
        min={0}
        softMax={150}
        value={data.settings.dashboard.gap}
        onChange={(newValue) =>
          setData((data) => {
            data.settings.dashboard.gap = newValue;
          })
        }
      />
      <Inputs.Number
        label='Dashboard Widget Radius'
        min={0}
        softMax={Math.ceil(data.settings.dashboard.size / 2)}
        value={data.settings.dashboard.radius}
        onChange={(newValue) =>
          setData((data) => {
            data.settings.dashboard.radius = newValue;
          })
        }
      />
      <Inputs.Number
        label='Dashboard Widget Size'
        min={0}
        softMax={150}
        softMin={50}
        value={data.settings.dashboard.size}
        onChange={(newValue) =>
          setData((data) => {
            data.settings.dashboard.size = newValue;
          })
        }
      />
      <Inputs.Select
        label='Toolbar Position'
        value={data.settings.toolbar.position}
        onChange={(newValue) =>
          setData((data) => {
            data.settings.toolbar.position = newValue;
          })
        }
        options={{
          top: 'Top',
          bottom: 'Bottom',
        }}
      />
    </List>
  );
};

export default AppearanceSettings;
