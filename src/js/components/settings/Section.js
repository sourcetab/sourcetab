import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0.5),
    marginBottom: theme.spacing(2.75),
    padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
  },
}));

export default function Section(props) {
  const classes = useStyles();

  return <Card classes={classes}>{props.children}</Card>;
}
