import React from 'react';

const Card = ({ card: { image, code }, cardImgStyles }) => {
  return (
    <div className='c-card'>
      <img src={image} alt={code} className={cardImgStyles} />
    </div>
  );
};

export default React.memo(Card);
