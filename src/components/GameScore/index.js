import React, { useContext } from 'react';
import { AppContext } from '../../state/AppContext';

const GameScore = () => {
  const {
    state: { gameScore },
  } = useContext(AppContext);
  console.log(gameScore.sort());
  return (
    <div className='c-game-score'>
      {gameScore.length > 0 &&
        gameScore
          .sort()
          .map((score, idx) => <div key={idx}>{score.score}</div>)}
    </div>
  );
};

export default GameScore;
