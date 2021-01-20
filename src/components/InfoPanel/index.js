import React, { useContext } from 'react';
import { AppContext } from '../../state/AppContext';

const InfoPanel = () => {
  const {
    state: { roundHistory, credit, bet, gameRound, roundStarted },
  } = useContext(AppContext);
  return (
    <div className='c-info-panel'>
      <RoundHistory roundHistory={roundHistory} />
      <PlayerCredit credit={credit} />
      <PlayerBet bet={bet} />
      {roundStarted && <NumberOfRound gameRound={gameRound} />}
    </div>
  );
};

export default InfoPanel;

const RoundHistory = ({ roundHistory }) => {
  return (
    <div className='c-info-panel__item c-round-history'>{roundHistory}</div>
  );
};

const PlayerCredit = ({ credit }) => {
  return (
    <div className='c-info-panel__item c-player-credit'>
      Player Credit: {credit}$
    </div>
  );
};

const PlayerBet = ({ bet }) => {
  return (
    <div className='c-info-panel__item c-player-bet'>Player bet: {bet}$</div>
  );
};

const NumberOfRound = ({ gameRound }) => {
  return (
    <div className='c-info-panel__item c-number-of-round'>
      Round: {gameRound} / 5
    </div>
  );
};
