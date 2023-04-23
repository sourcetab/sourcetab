import {Close, QuestionMark as QuestionMarkIcon} from '@mui/icons-material';
import {
  DialogTitle,
  IconButton,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import useStorage from '@/hooks/useStorage';

const buttonSx: SxProps<Theme> = {
  m: '4px',
  color: (theme) => theme.palette.grey[500],
};

const DialogTitleActions: FC<{
  onClose?: () => void;
  help?: string;
}> = ({children, onClose, help}) => {
  const [data] = useStorage();

  return (
    <DialogTitle sx={{display: 'flex', alignItems: 'center', p: '0 8px 0 0'}}>
      <Typography
        component='span'
        sx={{p: '16px 24px', flexGrow: 1}}
        variant='h5'
      >
        {children}
      </Typography>
      {data.settings.showHelp && help ? (
        <IconButton
          aria-label='help'
          href={`https://sourcetab.org/docs/${help}`}
          sx={buttonSx}
          target='_blank'
        >
          <QuestionMarkIcon />
        </IconButton>
      ) : null}
      {onClose && (
        <IconButton aria-label='close' onClick={onClose} sx={buttonSx}>
          <Close />
        </IconButton>
      )}
    </DialogTitle>
  );
};

export default DialogTitleActions;
