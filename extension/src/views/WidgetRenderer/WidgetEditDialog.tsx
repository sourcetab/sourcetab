import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
} from '@mui/material';
import {useEffect, useState} from 'react';

import Inputs from '@/components/Inputs';
import useStorage from '@/hooks/useStorage';
import widgets from '@/widgets';
import DialogTitleActions from '@/components/DialogTitleActions';

const WidgetEditDialog: FC<{
  editDialog: string;
  setEditDialog: (newValue: string) => void;
}> = ({editDialog, setEditDialog}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [data, setData] = useStorage();
  const CurrentWidget = editDialog && widgets[data.widgets[editDialog].t];

  const [currentWidgetData, setCurrentWidgetData] = useState<
    undefined | WidgetData
  >();

  useEffect(() => {
    if (editDialog) {
      setCurrentWidgetData(data.widgets[editDialog].d);
      setOpen(true);
    }
  }, [editDialog]);

  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      onClose={handleClose}
      open={open}
      TransitionProps={{
        onExited: () => setEditDialog(''),
      }}
    >
      <DialogTitleActions
        help={
          // @ts-expect-error
          CurrentWidget?.help
            ? // @ts-expect-error
              `widgets/${CurrentWidget?.help}#settings` // eslint-disable-line @typescript-eslint/restrict-template-expressions
            : undefined
        }
      >
        Edit Widget
      </DialogTitleActions>
      <DialogContent>
        <List>
          {CurrentWidget && currentWidgetData && (
            <>
              <Inputs.Text
                label='Label'
                value={currentWidgetData.label}
                onChange={(newValue) =>
                  setCurrentWidgetData({...currentWidgetData, label: newValue})
                }
              />
              <CurrentWidget.Settings
                data={currentWidgetData}
                globalData={data.settings.widgets[data.widgets[editDialog].t]}
                setData={setCurrentWidgetData}
                setGlobalData={(newValue) => {
                  setData((data) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    data.settings.widgets[data.widgets[editDialog].t] =
                      newValue;
                  });
                }}
              />
            </>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='outlined'>
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            setData((data) => {
              data.widgets[editDialog].d = currentWidgetData!;
            });
            handleClose();
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WidgetEditDialog;
