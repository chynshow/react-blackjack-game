import React, { useContext } from 'react';
import { AppContext } from '../../state/AppContext';

const GameScore = () => {
  const {
    state: { gameScore },
  } = useContext(AppContext);
  return (
    <div className='c-game-score'>
      {gameScore.length > 0 &&
        gameScore.sort().map((item, idx) => (
          <div key={idx}>
            {item.date}
            {item.score}
          </div>
        ))}
    </div>
  );
};

export default GameScore;
