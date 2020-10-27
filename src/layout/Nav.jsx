import React from 'react';
import {
  AppBar, Toolbar, Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbarSecondary: {
  },
  toolbarLink: {
    padding: theme.spacing(1),
  },
  appbar: {
    alignItems: 'center',
  },
}));

const Nav = (props) => {
  const classes = useStyles();
  return (
  <div className={classes.root} >
      <AppBar position="static" className={classes.appbar}>
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary} >
          {props.paths.map((path, i) => (<Link key={i} href={path.path} className={classes.toolbarLink} color="inherit">{path.name}</Link>))}
        </Toolbar>
    </AppBar>
  </div>
  );
};

export default Nav;
