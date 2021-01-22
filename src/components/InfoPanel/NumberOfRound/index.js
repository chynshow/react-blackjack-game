import React from 'react';

const NumberOfRound = ({ gameRound, className }) => {
  return <div className={className}>Round: {gameRound} / 5</div>;
};

export default React.memo(NumberOfRound);
