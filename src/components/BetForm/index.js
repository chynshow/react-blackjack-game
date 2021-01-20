import React, { useContext, useState } from 'react';
import { AppContext } from '../../state/AppContext';

const BetForm = () => {
  const {
    state: { credit, gameStarted },
    setBet,
  } = useContext(AppContext);
  const [value, setValue] = useState(0);
  const [showBet, setShowBet] = useState(true);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (gameStarted && (!value || value > credit))
      return console.error('Invalid bet error message!');
    setBet(value);
    setShowBet(false);
  };
  return (
    <form
      className={`${
        gameStarted && showBet ? 'c-bet-form c-bet-form--active' : 'c-bet-form'
      }`}
      onSubmit={(e) => handleOnSubmit(e)}
    >
      <input
        className='c-bet-form__input'
        value={value}
        type='number'
        onChange={(e) => setValue(+e.target.value)}
      />
      <button type='submit' className='c-btn c-bet-form__btn'>
        Set Bet
      </button>
    </form>
  );
};

export default BetForm;
