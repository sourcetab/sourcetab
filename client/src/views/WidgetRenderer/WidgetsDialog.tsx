import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogContent,
  Typography,
} from '@mui/material';

import DialogTitleActions from '@/components/DialogTitleActions';
import useStorage from '@/hooks/useStorage';
import {genId} from '@/utils';
import widgets from '@/widgets';
import GlobalWidgetSettings from './GlobalWidgetSettings';

const WidgetsDialog: FC<{
  open: boolean;
  setOpen: (newValue: boolean) => void;
  setEditDialog: (newValue: string) => void;
}> = ({open, setOpen, setEditDialog}) => {
  const [data, setData] = useStorage();
  const handleClose = () => setOpen(false);

  return (
    <Dialog fullWidth maxWidth='sm' onClose={handleClose} open={open}>
      <DialogTitleActions help='widgets' onClose={handleClose}>
        Add Widget
      </DialogTitleActions>
      <DialogContent
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 150px)',
          gridGap: '20px',
          justifyContent: 'center',
        }}
      >
        {Object.keys(widgets).map((v) => {
          const widget = widgets[v];

          return (
            <Card key={v} sx={{position: 'relative'}}>
              <CardActionArea
                sx={{height: '100%'}}
                onClick={() => {
                  const newId = genId();

                  setData((data) => {
                    data.widgets[newId] = {
                      t: v,
                      d: {label: widget.name, ...widget.defaultData},
                    };
                    data.widgets.d.c!.splice(0, 0, newId);
                  });
                  handleClose();
                  setEditDialog(newId);
                }}
              >
                <CardContent sx={{height: '100%'}}>
                  <Typography gutterBottom component='div' variant='h6'>
                    {widget.name}
                  </Typography>
                  <Box
                    sx={{
                      width: '118px',
                      height: '118px',
                      borderRadius: `${data.settings.dashboard.radius}px`,
                    }}
                  >
                    {/* @ts-expect-error */}
                    <widget.Widget
                      disable
                      data={widget.exampleData}
                      setData={() => undefined}
                    />
                  </Box>
                </CardContent>
              </CardActionArea>
              {widget.GlobalSettings ? <GlobalWidgetSettings id={v} /> : null}
            </Card>
          );
        })}
      </DialogContent>
    </Dialog>
  );
};

export default WidgetsDialog;
