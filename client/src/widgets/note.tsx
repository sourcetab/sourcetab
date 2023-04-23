import {StickyNote2 as StickyNote2Icon} from '@mui/icons-material';
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  useTheme,
} from '@mui/material';
import {ChangeEvent, useState} from 'react';
import DialogTitleActions from '@/components/DialogTitleActions';

type NoteType = {
  body: string;
};

const NoteToolbar: FC<{
  data: NoteType & InitialWidgetData;
  setData: (newValue: NoteType & InitialWidgetData) => void;
  disable: boolean | undefined;
}> = ({data, setData, disable}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton
        color='inherit'
        disableRipple={disable}
        onClick={disable ? undefined : () => setOpen(true)}
      >
        <StickyNote2Icon />
      </IconButton>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitleActions onClose={handleClose}>
          {data.label}
        </DialogTitleActions>
        <DialogContent>
          <TextField
            multiline
            onChange={(e) => setData({...data, body: e.target.value})}
            value={data.body}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

const note: Widget<NoteType> = {
  name: 'Note',
  help: 'note',
  defaultData: {body: ''},
  exampleData: {body: 'Hello World'},
  defaultGlobalData: {},
  Widget({data, setData, inToolbar, disable}) {
    const theme = useTheme();

    return inToolbar ? (
      <NoteToolbar {...{data, setData, disable}} />
    ) : (
      <Box
        component='textarea'
        readOnly={disable}
        value={data.body}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setData({...data, body: e.target.value})
        }
        sx={{
          width: '100%',
          height: '100%',
          resize: 'none',
          borderRadius: 'inherit',
          p: '8px',
          ...theme.typography.body2,
        }}
      />
    );
  },
  Settings() {
    return <></>;
  },
};

export default note;
