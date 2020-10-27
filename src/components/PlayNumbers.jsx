import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../css/game.css';

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    fontSize: '25px',
  },
}));

const PlayNumber = (props) => {
    const classes = useStyles();
    return (
      <Button className={`number ${classes.button}`}
              onClick={() => props.onClick(props.number, props.status)}
              style={{ backgroundColor: colors[props.status] }}// @todo: migrate this to css
      >
        {props.number}
      </Button>
  )
};

export default PlayNumber;
