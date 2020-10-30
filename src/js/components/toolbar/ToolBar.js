import {
  AppBar,
  Grow,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Add, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Clock from './Clock';

const useStyles = makeStyles({
  time: {
    flexGrow: 1,
  },
});

export default function ToolBar({
  editMode,
  setEditMode,
  setWebsiteDialogIndex,
}) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography classes={{ root: classes.time }} variant="h6">
          <Clock />
        </Typography>
        <Grow in={editMode}>
          <IconButton
            onClick={() => {
              setWebsiteDialogIndex(null);
            }}
            color="inherit"
          >
            <Add />
          </IconButton>
        </Grow>
        <IconButton
          onClick={() => {
            setEditMode(!editMode);
          }}
          color="inherit"
        >
          <Edit />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
