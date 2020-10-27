// STAR MATCH - Starting Template
import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import {sum, range, random, randomSumIn } from '../../helpers'
import '../../css/game.css';

// const PlayNumber = (props) => (
//   <button className="number"
//           onClick={() => props.onClick(props.number, props.status)}
//           style={{ backgroundColor: colors[props.status] }}// @todo: migrate this to css
//   >
//     {props.number}
//   </button>
// );

const PlayNumber = (props) => (
  <button className="number"
          onClick={() => props.onClick(props.number, props.status)}
          style={{ backgroundColor: colors[props.status] }}// @todo: migrate this to css
  >
    {props.number}
  </button>
);

const StarsDisplay = (props) => (
  <>
    {range(1, props.count)
      .map((startid) => <div
          key={startid}
          className="star" />)}
  </>
);

const PlayAgain = (props) => (
  <div className="game-done">
    <div className="message" style={{ color: props.gameStatus === 'lost' ? 'red' : 'green' }}>
      {props.gameStatus === 'lost' ? 'Game over' : 'Won'}
    </div>
    <div>
      Your score: {props.score}
    </div>
    <button onClick={() => props.onClickButton(props.player, props.score)}> Play again </button>
  </div>
);

const useGameState = () => {
  const [stars, setStars] = useState(random(1, 9));
  const [availableNums, setAvailabeNums] = useState(range(1, 9));
  const [candidateNums, setCanidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerid = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerid);
    }
  });

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
    setGameState, stars, availableNums, candidateNums, secondsLeft,
  };
};

const StarMatch = (props) => {
  const {
    setGameState, stars, availableNums, candidateNums, secondsLeft,
  } = useGameState();

  const calculatePoints = (sl) => sl;
  //
  // const calculateGameStatus = () => {
  //     if(!availableNums.length) {
  //         return 'won';
  //     }
  //     if(!secondsLeft) return 'lost'
  //     return 'active';
  // }

  const score = calculatePoints(secondsLeft);

  const gameStatus = !availableNums.length ? 'won' : 'active';
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
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="you">
        {`${props.player.name}: ${props.player.points}`}
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active'
            ? (<PlayAgain onClickButton={props.startNewGame} score={score} player={props.player} gameStatus={gameStatus} />)
            : (<StarsDisplay count={stars}/>)
          }
        </div>
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
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

export default StarMatch;
