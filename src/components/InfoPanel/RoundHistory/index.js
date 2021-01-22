import React, { useState } from 'react';

const RoundHistory = ({ roundHistory }) => {
  const [showPanel, setShowPanel] = useState(true);

  return (
    <>
      {roundHistory.length > 0 && (
        <div
          className={`${
            showPanel
              ? 'c-info-panel__item c-round-history c-round-history--active'
              : 'c-info-panel__item c-round-history'
          }`}
        >
          <h4 className='c-round-history__title'>Round History</h4>
          {roundHistory.map((item, idx) => (
            <div className='c-round-history__item' key={idx}>
              <div className='c-round-history__numberOfRound'>
                Round: {item.round}
              </div>
              <div className='c-round-history__credit'>
                Credit: {item.credit}$
              </div>
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
          <button
            className='c-btn c-round-history__show-history-btn'
            onClick={() => setShowPanel(!showPanel)}
          >
            Hide
          </button>
        </div>
      )}
    </>
  );
};

export default React.memo(RoundHistory);
