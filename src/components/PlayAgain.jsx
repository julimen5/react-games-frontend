import React from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';

const PlayAgain = (props) => (
  <div className="game-done">
    <div className="message" style={{ color: props.gameStatus === 'lost' ? 'red' : 'green' }}>
      {props.gameStatus === 'lost' ?
        <Typography>
          Game over
        </Typography> :
        <Typography variant="h6">
          You won
        </Typography>}
    </div>
    <div>
      Your score: {props.score}
    </div>
    <Button
    variant="contained"
    color="primary"
    onClick={() => props.onClickButton()}
    >
      Play again
    </Button>
  </div>
);


export default PlayAgain;
