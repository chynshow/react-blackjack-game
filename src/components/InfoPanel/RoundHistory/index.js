import React from 'react';

const RoundHistory = ({ roundHistory }) => {
  return (
    <div className='c-info-panel__item c-round-history'>
      {roundHistory.map((item, idx) => (
        <div className='c-round-history__item' key={idx}>
          <div className='c-round-history__numberOfRound'>
            Round: {item.round}
          </div>
          <div className='c-round-history__credit'>Credit: {item.credit}$</div>
          <div className='c-round-history__bet'>Bet: {item.bet}$</div>
          <div className='c-round-history__cards'>
            <span className='c-round-history__dealer-cards'>
              Dealer: {item.score?.dealerScore}
            </span>
            {item.cards?.dealerCards.map((card) => (
              <img
                className='c-round-history__img'
                src={card.image}
                key={card.code}
                alt={card.code}
              />
            ))}

            <span className='c-round-history__player-cards'>
              Player: {item.score?.playerScore}
            </span>
            {item.cards?.playerCards.map((card) => (
              <img
                className='c-round-history__img'
                src={card.image}
                key={card.code}
                alt={card.code}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(RoundHistory);
