import {
  ContentCopy as ContentCopyIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import {
  Box,
  Grow,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
} from '@mui/material';
import {useState} from 'react';

export const WidgetEditMenu: FC<{
  visible?: boolean;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}> = ({visible, onEdit, onDuplicate, onDelete}) => (
  <Grow unmountOnExit in={visible}>
    <Paper
      sx={{
        top: '-10px',
        position: 'absolute',
        width: '90px',
        left: '50%',
        transform: 'translate(-50%,0) !important',
        display: 'inline-block',
        borderRadius: '15px',
      }}
    >
      <IconButton onClick={onEdit} size='small'>
        <EditIcon fontSize='small' />
      </IconButton>
      <IconButton onClick={onDuplicate} size='small'>
        <ContentCopyIcon fontSize='small' />
      </IconButton>
      <IconButton onClick={onDelete} size='small'>
        <DeleteIcon fontSize='small' />
      </IconButton>
    </Paper>
  </Grow>
);

export const WidgetEditMenuSmall: FC<{
  visible?: boolean;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}> = ({visible, onEdit, onDuplicate, onDelete}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();

  const handleClose = () => setAnchorEl(undefined);

  return (
    <Grow unmountOnExit in={visible}>
      <Paper
        sx={{
          top: '-10px',
          position: 'absolute',
          width: '30px',
          left: '50%',
          transform: 'translate(-50%,0) !important',
          display: 'inline-block',
          borderRadius: '15px',
        }}
      >
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size='small'>
          <MoreVertIcon fontSize='small' />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          onClose={handleClose}
          open={Boolean(anchorEl)}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              onEdit();
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              onDuplicate();
            }}
          >
            <ListItemIcon>
              <ContentCopyIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Duplicate</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              onDelete();
            }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </Paper>
    </Grow>
  );
};
