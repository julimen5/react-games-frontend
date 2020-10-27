import React, { useState, useEffect } from 'react';
import { Paper, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import GameService from '../services/GamesService.js';
import { Layout } from '../layout';
import LadderBoard from '../components/Ladderboard';
import { find, findId } from '../helpers/index';
import StarsMatch from './games/StarsGame';
import NewPlayer from '../components/NewPlayer';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));


const Game = (props) => {
  const classes = useStyles();

  const [game, setGame] = useState({gameId: 1, description: '', game: ''});
  const [player, setPlayer] = useState();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const getGame = async () => {
      const result = await GameService.getGame(props.game);
      // TODO: este set game no funciona y no se por que
      setGame({...game, description: result.data.description, game: result.data.name})
      setPlayers(result.data.players);
    };
    getGame()
  }, []);

  /**
   * add a new player to the ladderboard and to the backend
   * @param {string} pl the name of the player
   */
  const addPlayer = (pl) => {
    const p = find(players, pl, 'name');
    if (p) setPlayer(p);
    else {
      GameService.insertPlayer(game, pl)
      .then((playerFromBackend) => {
        setPlayers([...players, playerFromBackend]);
        setPlayer(playerFromBackend);
      });
    }
  };

  /**
   * this function ends a game and update the score of a player
   * @param  {string} pl    the name of the player
   * @param  {int} score    the score of the player
   * @return {[type]}       [description]
   */
  const endGame = (pl, score) => {
    const id = findId(players, pl, '_id');
    if (id === -1) {
      console.log('wtf');
    } else {
      const pls = { ...players[id] };
      pls.points = score + pls.points;
      // TODO: acá voy a updatear el player en la base de datos con el nuevo puntaje
      setPlayers([...players.slice(0, id), pls, ...players.slice(id + 1)]);
      setPlayer(pls);
      GameService.updatePlayer(game,pls);
    }
  }

  /**
   * Start a new game
   */
  const startNewGame = () => {
    setGame({...game, gameId: game.gameId + 1 });
  };
  return (
    <Layout>
      <main>
        <Container className={classes.container}>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <LadderBoard players={players} />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
              <div className={classes.title}>
                <Typography variant="h4" align="center">
                  {props.game}
                </Typography>
              </div>
              {player
                ? <StarsMatch
                  key={game.gameId}
                  startNewGame={startNewGame}
                  endGame={endGame}
                  player={player}
                />
                : <NewPlayer addPlayer={addPlayer}/>
              }
            </Paper>
          </Grid>
        </Grid>
      </Container>
      </main>
    </Layout>
  );
};

export default Game;
