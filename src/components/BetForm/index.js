import React, { useState } from 'react';

const BetForm = () => {
  const [value, setValue] = useState(0);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(`Bet: ${value}`);
  };
  return (
    <form className='c-bet-form' onSubmit={(e) => handleOnSubmit(e)}>
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
