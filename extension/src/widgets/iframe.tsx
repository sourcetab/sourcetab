import {Web as WebIcon} from '@mui/icons-material';
import {Box, Dialog, IconButton} from '@mui/material';
import {useState} from 'react';
import DialogTitleActions from '@/components/DialogTitleActions';
import useStorageFile from '@/hooks/useStorageFile';
import Inputs from '@/components/Inputs';

type IFrameType = {
  src: string;
};

const IFrameToolbar: FC<{
  data: IFrameType & InitialWidgetData;
  disable: boolean | undefined;
}> = ({data, disable}) => {
  const resolveFile = useStorageFile();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton
        color='inherit'
        disableRipple={disable}
        onClick={disable ? undefined : () => setOpen(true)}
      >
        <WebIcon />
      </IconButton>
      <Dialog fullWidth maxWidth='lg' onClose={handleClose} open={open}>
        <DialogTitleActions onClose={handleClose}>
          {data.label}
        </DialogTitleActions>
        <Box
          component='iframe'
          src={resolveFile(data.src)}
          sx={{width: '100%', height: '600px', border: 'none'}}
        />
      </Dialog>
    </>
  );
};

const IFrameDashboard: FC<{
  data: IFrameType & InitialWidgetData;
  disable: boolean | undefined;
}> = ({data, disable}) => {
  const resolveFile = useStorageFile();

  const sx = {width: '100%', height: '100%', borderRadius: 'inherit'};

  return disable ? (
    <Box
      sx={{
        ...sx,
        position: 'relative',
      }}
    >
      <Box
        component='iframe'
        src={resolveFile(data.src)}
        sx={{
          ...sx,
          position: 'absolute',
          border: 'none',
        }}
      />
      <Box
        sx={{
          ...sx,
          position: 'absolute',
        }}
      />
    </Box>
  ) : (
    <Box
      component='iframe'
      src={resolveFile(data.src)}
      sx={{
        ...sx,
        border: 'none',
      }}
    />
  );
};

const iframe: Widget<IFrameType> = {
  name: 'IFrame',
  help: 'iframe',
  defaultData: {src: ''},
  exampleData: {src: 'https://www.wikipedia.org'},
  defaultGlobalData: {},
  Widget({data, inToolbar, disable}) {
    return inToolbar ? (
      <IFrameToolbar {...{data, disable}} />
    ) : (
      <IFrameDashboard {...{data, disable}} />
    );
  },
  Settings({data, setData}) {
    return (
      <Inputs.File
        accept='text/html'
        label='Source'
        onChange={(newValue) => setData({...data, src: newValue})}
        value={data.src}
      />
    );
  },
};

export default iframe;
