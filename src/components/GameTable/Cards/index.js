import React from 'react';

const Cards = ({ cards, ownerName, ownerScore }) => {
  return (
    <div className='c-cards'>
      <h3 className='c-cards__owner-name'>
        {ownerName} <span className='c-cards__owner-score'>{ownerScore}</span>
      </h3>

      <div className='c-cards__container'>
        {cards.map((card) => (
          <Card key={card.code} card={card} />
        ))}
      </div>
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
