import { Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ReactSortable } from 'react-sortablejs';

import useStorage from '../../hooks/useStorage';

import Website from './Website';
import WebsiteDialog from './WebsiteDialog';

const useStyles = makeStyles(() => ({
  websiteContainer: {
    display: 'grid',
    margin: '80px',
    gridTemplateColumns: 'repeat(auto-fill, 125px)',
    justifyContent: 'space-evenly',
    gridGap: '60px',
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

  const GridType = editMode ? ReactSortable : 'div';

  return (
    <div>
      <Toolbar />
      <GridType
        className={classes.websiteContainer}
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
      </GridType>
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
