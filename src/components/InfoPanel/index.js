import React, { useContext } from 'react';
import { AppContext } from '../../state/AppContext';
import PlayerCredit from './PlayerCredit';
import PlayerBet from './PlayerBet/index';
import NumberOfRound from './NumberOfRound';

const InfoPanel = () => {
  const { playerCredit, playerBet, gameRound, roundStarted } = useContext(
    AppContext
  );
  return (
    <div className='c-info-panel'>
      <PlayerCredit
        credit={playerCredit}
        className='c-info-panel__item c-player-credit'
      />
      <PlayerBet bet={playerBet} className='c-info-panel__item c-player-bet' />
      {roundStarted && (
        <NumberOfRound
          gameRound={gameRound}
          className='c-info-panel__item c-number-of-round'
        />
      )}
    </div>
  );
};

export default InfoPanel;
