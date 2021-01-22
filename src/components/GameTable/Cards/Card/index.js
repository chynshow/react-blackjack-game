import React from 'react';

const Card = ({ card, cardImgStyles }) => {
  return (
    <div className='c-card'>
      <img src={card?.image} alt={card?.code} className={cardImgStyles} />
    </div>
  );
};

export default React.memo(Card);
