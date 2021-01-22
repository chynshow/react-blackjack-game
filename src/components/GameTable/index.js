import React, { useContext } from 'react';
import { AppContext } from '../../state/AppContext';
import Cards from './Cards';

const GameTable = () => {
  const {
    state: { playerCards, dealerCards, playerScore, dealerScore, stand },
  } = useContext(AppContext);
  return (
    <>
      {playerCards.length > 0 && dealerCards.length > 0 && (
        <div className='c-game-table'>
          <Cards
            cards={dealerCards}
            ownerName='Dealer'
            ownerScore={dealerScore}
          />
          <Cards
            className={stand ? 'c-cards c-cards--disable' : 'c-cards'}
            cards={playerCards}
            ownerName='Player'
            ownerScore={playerScore}
          />
        </div>
      )}
    </>
  );
};

export default GameTable;
