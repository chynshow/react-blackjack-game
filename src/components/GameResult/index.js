import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../state/AppContext';

import InfoModal from '../InfoModal';

const GameResult = () => {
  const {
    getResult,
    resetRound,
    resetGame,
    state: {
      playerScore,
      dealerScore,
      roundStarted,
      finishRoundMsg,
      gameRound,
      credit,
    },
  } = useContext(AppContext);
  useEffect(() => {
    getResult(playerScore, dealerScore);

    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerScore, dealerScore]);

  return (
    <div className='c-game-result'>
      <InfoModal
        showModal={finishRoundMsg && gameRound <= 5}
        btnTitle='New Deal'
        modalTitle='Round finish!'
        modalMsg={finishRoundMsg}
        cb={resetRound}
      />

      <InfoModal
        showModal={!roundStarted && gameRound > 4}
        btnTitle='New Game'
        modalTitle='Game Over!'
        modalMsg={`Your result: ${credit}`}
        cb={resetGame}
      />
    </div>
  );
};

export default GameResult;
