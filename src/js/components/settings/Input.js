import React from 'react';
import { Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    cursor: props => (props.control && !props.disabled ? 'pointer' : 'default'),
    padding: theme.spacing(1.25),
  },
  label: {
    flexGrow: 1,
    color: ({ disabled }) =>
      disabled ? theme.palette.text.disabled : theme.palette.text.primary,
  },
}));

export default function Input(props) {
  const classes = useStyles(props);

  const title = (
    <Typography
      classes={{ root: classes.label }}
      variant={props.header ? 'h6' : 'body1'}
      component="span"
    >
      {props.label}
    </Typography>
  );

  return (
    <>
      {props.header ? '' : <Divider />}
      <label className={classes.main}>
        {title}
        {props.control
          ? React.cloneElement(props.control, {
              ...props.control.props,
              disabled: props.disabled,
            })
          : ''}
      </label>
    </>
  );
}
