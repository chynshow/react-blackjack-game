import React from 'react';

const Cards = ({ cards, ownerName, ownerScore }) => {
  return (
    <div className='c-cards'>
      <h5 className='c-cards__owner'>{ownerName}</h5>
      <div className='c-cards__owner-score'>{ownerScore}</div>
      {/* <Card /> */}
    </div>
  );
};

export default Cards;

const Card = ({ card: { image, code } }) => {
  return (
    <div className='c-card'>
      <img src={image} alt={code} className='c-card__img' />
    </div>
  );
};
