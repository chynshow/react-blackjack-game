import React from 'react';
import Card from './../../GameTable/Cards/Card';
import NumberOfRound from './../NumberOfRound';
import PlayerCredit from './../PlayerCredit';
import PlayerBet from './../PlayerBet';

const RoundHistory = ({ roundHistory }) => {
  return (
    <>
      {roundHistory.length > 0 && (
        <div className='c-info-panel__item c-round-history'>
          <h4 className='c-round-history__title'>Round History</h4>
          {roundHistory.map((item, idx) => (
            <div className='c-round-history__item' key={idx}>
              <NumberOfRound
                className='c-round-history__numberOfRound'
                gameRound={item.round}
              />

              <PlayerCredit
                className='c-round-history__credit'
                credit={`${item.credit}`}
              />
              <PlayerBet className='c-round-history__bet' bet={`${item.bet}`} />
              <div className='c-round-history__cards'>
                <div className='c-round-history__cards-container'>
                  <span className='c-round-history__dealer-cards'>
                    Dealer: {item.score?.dealerScore}
                  </span>
                  {item.cards?.dealerCards.map((card) => (
                    <Card
                      cardImgStyles='c-round-history__img'
                      card={card}
                      key={card.code}
                    />
                  ))}
                </div>
                <div className='c-round-history__cards-container'>
                  <span className='c-round-history__player-cards'>
                    Player: {item.score?.playerScore}
                  </span>
                  {item.cards?.playerCards.map((card) => (
                    <Card
                      cardImgStyles='c-round-history__img'
                      card={card}
                      key={card.code}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default React.memo(RoundHistory);
