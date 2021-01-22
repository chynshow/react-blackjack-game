import React from 'react';

const PlayerCredit = ({ credit, className }) => {
  return <div className={className}>Player Credit: {credit}$</div>;
};

export default React.memo(PlayerCredit);
