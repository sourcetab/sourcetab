import { Grid, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ReactSortable } from 'react-sortablejs';

import useStorage from '../../hooks/useStorage';

import Website from './Website';
import WebsiteDialog from './WebsiteDialog';

const useStyles = makeStyles(theme => ({
  websiteContainer: {
    width: '100%',
    margin: 0,
    padding: theme.spacing(5),
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
      <Toolbar />
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
            data={v}
            index={i}
            {...{
              editMode,
              setWebsiteDialogIndex,
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
