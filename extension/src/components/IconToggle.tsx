import {SvgIconComponent} from '@mui/icons-material';
import {Box, BoxProps, useTheme} from '@mui/material';

const IconToggle: FC<{
  on: boolean;
  onIcon: SvgIconComponent;
  offIcon: SvgIconComponent;
}> = ({on, onIcon: OnIcon, offIcon: OffIcon}) => {
  const theme = useTheme();

  const commonSx: BoxProps['sx'] = {
    transition: theme.transitions.create(['clip-path'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  };

  return (
    <Box
      sx={{
        width: 24,
        height: 24,
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <OffIcon
        sx={{
          ...commonSx,
          clipPath: on
            ? 'polygon(0% 0%, 0% 0%, 0% 0%)'
            : 'polygon(0% 200%, 0% 0%, 200% 0%)',
        }}
      />
      <OnIcon
        sx={{
          ...commonSx,
          clipPath: on
            ? 'polygon(100% -100%, 100% 100%, -100% 100%)'
            : 'polygon(100% 100%, 100% 100%, 100% 100%)',
        }}
      />
    </Box>
  );
};
export default IconToggle;
