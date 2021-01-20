import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../state/AppContext';
import InfoModal from '../InfoModal';

const GameResult = () => {
  const {
    getResult,
    resetGame,
    resetRound,
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
      {finishRoundMsg && !roundStarted && gameRound < 5 && (
        <InfoModal
          btnTitle='New Deal'
          modalTitle='Round finish!'
          modalMsg={`Your result ${playerScore}`}
          cb={resetRound}
        />
      )}
      {!roundStarted && gameRound > 4 && (
        <InfoModal
          btnTitle='New Game'
          modalTitle='Game Over!'
          modalMsg={`Your result ${credit}`}
          cb={resetGame}
        />
      )}
    </div>
  );
};

export default GameResult;
