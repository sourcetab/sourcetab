import React from 'react';
import { Fade, Grid, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete, Edit, FileCopy } from '@material-ui/icons';

const useStyles = makeStyles({
  website: {
    textDecoration: 'none',
  },
  website_edit_mode: {
    cursor: 'grab',
  },

  website_svg: {
    borderRadius: '8px',
    margin: 'auto',
  },

  website_text: {
    textAlign: 'center',
    color: '#000',
  },

  edit_div: {
    position: 'absolute',
  },
  edit_div_layer: {
    backgroundColor: '#0003',
    borderRadius: '8px 0px 8px',
  },
  edit_icons: {
    color: 'white',
  },
});

export default function Website({
  data,
  editMode,
  setWebsiteDialogIndex,
  websites,
  setWebsites,
}) {
  const classes = useStyles();

  const children = (
    <div>
      <div className={classes.edit_div}>
        <Fade in={editMode}>
          <div className={classes.edit_div_layer}>
            <IconButton
              onClick={() => {
                setWebsiteDialogIndex(data.i);
              }}
              size="small"
              classes={{ root: classes.edit_icons }}
            >
              <Edit fontSize="inherit" />
            </IconButton>
            <IconButton
              onClick={() => {
                setWebsites([...websites, websites[data.i]]);
              }}
              size="small"
              classes={{ root: classes.edit_icons }}
            >
              <FileCopy fontSize="inherit" />
            </IconButton>
            <IconButton
              onClick={() => {
                setWebsites([
                  ...websites.slice(0, data.i),
                  ...websites.slice(data.i + 1),
                ]);
              }}
              size="small"
              classes={{ root: classes.edit_icons }}
            >
              <Delete fontSize="inherit" />
            </IconButton>
          </div>
        </Fade>
      </div>

      <svg className={classes.website_svg} width="125" viewBox="0 0 100 100">
        <rect width="100" height="100" fill="#FFF" />
        <image href={data.icon} height="100" width="100" />
      </svg>
      <Typography className={classes.website_text}>{data.name}</Typography>
    </div>
  );

  return (
    <Grid item>
      {editMode ? (
        <div className={classes.website_edit_mode}>{children}</div>
      ) : (
        <a className={classes.website} href={data.url}>
          {children}
        </a>
      )}
    </Grid>
  );
}
