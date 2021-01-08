import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ReactSortable } from 'react-sortablejs';

import useStorage from '../../hooks/useStorage';

import Website from './Website';
import WebsiteDialog from './WebsiteDialog';

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
  const [data, dispatch] = useStorage();

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
              list: data.websites,
              setList: value => {
                dispatch({ type: 'set', path: 'websites', value });
              },
              animation: 150,
            }
          : {})}
      >
        {data.websites.map((v, i) => (
          <Website
            key={i}
            data={{ ...v, i }}
            style={classes}
            {...{
              editMode,
              setWebsiteDialogIndex,
              websites: data.websites,
              dispatch,
            }}
          />
        ))}
      </Grid>
      <WebsiteDialog
        {...{
          websites: data.websites,
          dispatch,
          websiteDialogIndex,
          setWebsiteDialogIndex,
        }}
      />
    </div>
  );
}
