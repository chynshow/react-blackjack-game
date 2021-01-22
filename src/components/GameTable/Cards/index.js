import React from 'react';
import Card from './Card/index';

const Cards = ({ cards, ownerName, ownerScore, className }) => {
  return (
    <div className={className ? className : 'c-cards'}>
      <h3 className='c-cards__owner-name'>
        {ownerName} <span className='c-cards__owner-score'>{ownerScore}</span>
      </h3>

      <div className='c-cards__container'>
        {cards.map((card) => (
          <Card key={card.code} card={card} cardImgStyles='c-card__img' />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Cards);
