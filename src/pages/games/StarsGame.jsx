// STAR MATCH - Starting Template
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { sum, range, random, randomSumIn } from '../../helpers'
import PlayNumber from '../../components/PlayNumbers.jsx';
import PlayAgain from '../../components/PlayAgain.jsx';
import '../../css/game.css';

const StarsDisplay = (props) => (
  <>
    {range(1, props.count)
      .map((startid) => <div
          key={startid}
          className="star" />)}
  </>
);


const useGameState = (props) => {
  const [stars, setStars] = useState(random(1, 9));
  const [score, setScore] = useState(0);
  const [availableNums, setAvailabeNums] = useState(range(1, 9));
  const [candidateNums, setCanidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [gameStatus, setGameStatus] = useState('active');

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerid = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerid);
    }
    if(!secondsLeft) setGameStatus('lost');
  });

  useEffect(() => {
    if(!availableNums.length)  {
      const sc = secondsLeft
      setScore(secondsLeft)//
      props.endGame(props.player, sc);
      setGameStatus('won')
      return;
    }
      setGameStatus('active')
      return;
    ;
  }, [availableNums])
  const setGameState = (newCandidatesNums) => {
    if (sum(newCandidatesNums) !== stars) {
      // we sum the candidate numbers (the selected ones) and check if they sum the amount of starts that are showed
      setCanidateNums(newCandidatesNums); // if is not the correct sum we set the new candidates as the candidates
    } else {
      // the sum of candidates equals the number of starts
      // should be remove from the available numbers all the candidates
      // reset the candidate numbers
      // reset the game
      const newAvailableNums = availableNums.filter((n) => !newCandidatesNums.includes(n));
      const newStars = randomSumIn(newAvailableNums, 9);
      setStars(newStars); // what we do here is tu return a number of starts thats actually playable
      setAvailabeNums(newAvailableNums);
      setCanidateNums([]);
    }
  };

  return {
    setGameState, stars, availableNums, candidateNums, secondsLeft, gameStatus, setGameStatus, score
  };
};

const useStyles = makeStyles((theme) => ({
}));

const StarMatch = (props) => {
  const {
    setGameState, stars, availableNums, candidateNums, secondsLeft, gameStatus, setGameStatus, score
  } = useGameState(props);
  const classes = useStyles();

  // const calculatePoints = (sl) => sl;
  //
  // const score = calculatePoints(secondsLeft);

  // const gameStatus = !availableNums.length ? 'won' : 'active';
  // const gameStatus = !availableNums.length ? 'won' : !secondsLeft ? 'lost' : 'active';
  // const gameStatus = calculateGameStatus();

  const candidatesAreWrong = sum(candidateNums) > stars;

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) return 'used'; // if the number is used
    // in the number is a candidate we have two posibilities
    // 1. is a wrong candidate
    // 2. is a good candidate
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }
    return 'available';
  };

  const onNumberClick = (number, currentStatus) => {
    if (gameStatus !== 'active' || currentStatus === 'used') return; // if the status is used we shouldn't do anything
    const newCandidatesNums = currentStatus === 'available' ? candidateNums.concat(number) : candidateNums.filter((cn) => cn !== number);
    setGameState(newCandidatesNums);
  };
  return (
    <Container maxWidth="lg">
      <div className="help">
        <Typography>
            Pick 1 or more numbers that sum to the number of stars
        </Typography>
      </div>
      <div className="you">
        <Typography variant="h6">
          {`${props.player.name}: ${props.player.points}`}
        </Typography>
      </div>
        <div className="body">
          <Grid container>
             <Grid item xs={12} sm={6} className="flex-content">
               <div className="left">
                 {gameStatus !== 'active'
                   ? (<PlayAgain onClickButton={props.startNewGame} score={score} player={props.player} gameStatus={gameStatus} />)
                   : (<StarsDisplay count={stars}/>)
                 }
               </div>
             </Grid>
             <Grid item xs={12} sm={6} className="flex-content">
               <div className="right">
                 {range(1, 9)
                   .map((number) => <PlayNumber
                       key={number}
                       number={number}
                       status={numberStatus(number)}
                       onClick={onNumberClick}
                     />)

                 }
               </div>
             </Grid>
           </Grid>
        </div>
      <div className="timer">
        <Typography variant="subtitle1" >
          Time Remaining: {secondsLeft}
        </Typography>
      </div>
    </Container>
  );
};


export default StarMatch;
