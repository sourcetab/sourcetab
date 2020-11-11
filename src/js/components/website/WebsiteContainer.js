import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ReactSortable } from 'react-sortablejs';

import useStorage from '../../hooks/useStorage';

import Website from './Website';
import WebsiteDialog from './WebsiteDialog';
import defaultWebsites from './defaultWebsites';

const useStyles = makeStyles(theme => ({
  websiteContainer: {
    width: '100%',
    padding: theme.spacing(10),
  },
  ghost: {
    visibility: 'hidden',
  },
}));

export default function WebsiteContainer({
  editMode,
  websiteDialogIndex,
  setWebsiteDialogIndex,
}) {
  const classes = useStyles();
  const [websites, setWebsites] = useStorage('websites', defaultWebsites);

  return (
    <div>
      <Grid
        component={editMode ? ReactSortable : 'div'}
        classes={{ root: classes.websiteContainer }}
        container
        spacing={10}
        {...(editMode
          ? {
              ghostClass: classes.ghost,
              list: websites,
              setList: setWebsites,
              animation: 150,
            }
          : {})}
      >
        {websites.map((v, i) => (
          <Website
            key={i}
            data={{ ...v, i }}
            style={classes}
            {...{ editMode, setWebsiteDialogIndex, websites, setWebsites }}
          />
        ))}
      </Grid>
      <WebsiteDialog
        {...{
          websites,
          setWebsites,
          websiteDialogIndex,
          setWebsiteDialogIndex,
        }}
      />
    </div>
  );
}
