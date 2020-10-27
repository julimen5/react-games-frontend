import React, { useState } from 'react';
import { Button, TextField, Container, Box, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  form: {
    textAlign: 'center',
  },
  input: {
    padding:theme.spacing(1),
  }
}));

const NewPlayer = (props) => {
  const classes = useStyles();

  const [player, setPlayer] = useState('');
  return (
        <Container>
          <form className={classes.form} onSubmit={() => props.addPlayer(player)}>
            <TextField
              type="text"
              required
              placeholder="New player"
              onChange={(event) => setPlayer(event.target.value)}
              className={classes.input}
            >

            </TextField>
            <Button variant="contained" className={classes.input} onClick={() => props.addPlayer(player)} color="primary">
                Start!
            </Button>
          </form>



        </Container>
  );
};

export default NewPlayer;
