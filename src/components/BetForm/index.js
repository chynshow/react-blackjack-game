import React, { useContext, useState } from 'react';
import { AppContext } from '../../state/AppContext';
import { SHOW_INFO_MODAL } from '../../state/AppReducer';

const BetForm = () => {
  const { setBet, dispatch, playerCredit, gameStarted } = useContext(
    AppContext
  );
  const [value, setValue] = useState(0);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (gameStarted && (!value || value > playerCredit))
      return dispatch({
        type: SHOW_INFO_MODAL,
        payload: {
          title: 'Please set a correct bet!',
          msg: `Bet should be more then zero and less then ${playerCredit}$`,
          closeBtnTitle: 'Back to game!',
        },
      });
    setBet(value);
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
        Set Bet $
      </button>
    </form>
  );
};

export default BetForm;
