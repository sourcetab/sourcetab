import {
  Edit as EditIcon,
  EditOff as EditOffIcon,
  Menu as MenuIcon,
  Settings as SettingsIcon,
  Widgets as WidgetsIcon,
} from '@mui/icons-material';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu as MuiMenu,
  MenuItem,
  Box,
  BoxProps,
} from '@mui/material';
import {useRef, useState, forwardRef} from 'react';
import IconToggle from '@/components/IconToggle';

const Menu = forwardRef<
  HTMLElement,
  {
    editMode?: boolean;
    setEditMode: (newValue: boolean) => void;
    setWidgetsDialog: (newValue: boolean) => void;
    setSettingsDialog: (newValue: boolean) => void;
  } & BoxProps
>(
  (
    {editMode, setEditMode, setWidgetsDialog, setSettingsDialog, ...props},
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLElement>();

    const handleClose = () => setOpen(false);

    return (
      <>
        <Box ref={ref} {...props}>
          <IconButton
            color='inherit'
            onClick={() => setOpen(true)}
            ref={buttonRef}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <MuiMenu anchorEl={buttonRef.current} onClose={handleClose} open={open}>
          <MenuItem
            onClick={() => {
              handleClose();
              setWidgetsDialog(true);
            }}
          >
            <ListItemIcon>
              <WidgetsIcon />
            </ListItemIcon>
            <ListItemText>Widgets</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              setEditMode(!editMode);
            }}
          >
            <ListItemIcon>
              <IconToggle
                offIcon={EditIcon}
                on={Boolean(editMode)}
                onIcon={EditOffIcon}
              />
            </ListItemIcon>
            <ListItemText>Edit Mode</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              setSettingsDialog(true);
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
        </MuiMenu>
      </>
    );
  },
);

export default Menu;
