import React from 'react';

const PlayerBet = ({ bet, className }) => {
  return <div className={className}>Player bet: {bet}$</div>;
};

export default React.memo(PlayerBet);
