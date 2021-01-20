import React from 'react';

const InfoPanel = () => {
  return (
    <div className='c-info-panel'>
      <RoundHistory />
      <PlayerCredit />
      <PlayerBet />
      <NumberOfRound />
    </div>
  );
};

export default InfoPanel;

const RoundHistory = () => {
  return (
    <div className='c-info-panel__item c-round-history'>Round History</div>
  );
};

const PlayerCredit = () => {
  return (
    <div className='c-info-panel__item c-player-credit'>
      Player Credit: 1000$
    </div>
  );
};

const PlayerBet = () => {
  return <div className='c-info-panel__item c-player-bet'>Player bet: 0$</div>;
};

const NumberOfRound = () => {
  return (
    <div className='c-info-panel__item c-number-of-round'>Round: n / 5</div>
  );
};
