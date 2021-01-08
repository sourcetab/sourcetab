import { makeStyles } from '@material-ui/core/styles';
import useStorage from '../../hooks/useStorage';

const useStyles = makeStyles({
  background: {
    zIndex: -9,
    margin: '0',
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    backgroundImage:
      "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb')",
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
});

export default function Background() {
  const classes = useStyles();

  const [data] = useStorage();

  return (
    <div
      className={classes.background}
      style={{ backgroundImage: `url('${data.background.url}')` }}
    ></div>
  );
}
