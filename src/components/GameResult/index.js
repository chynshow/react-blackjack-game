import React, { useState } from 'react';

const GameResult = () => {
  return (
    <div className='c-game-result'>
      <InfoModal
        btnTitle='New Deal'
        modalTitle='Round finish!'
        modalMsg={`Your result 22`}
        cb={() => console.log('work')}
      />
    </div>
  );
};

export default GameResult;

const InfoModal = ({ btnTitle, cb, modalTitle, modalMsg }) => {
  const [showModal, setShowModal] = useState(false);
  const handleOnClick = () => {
    setShowModal(!showModal);
    cb();
  };
  return (
    <>
      <div
        className={`${
          showModal ? 'c-info-modal c-info-modal--active' : 'c-info-modal'
        }`}
      >
        <h5 className='c-info-modal__title'>{modalTitle}</h5>
        <div className='c-info-modal__msg'>{modalMsg}</div>
        <button
          className='c-btn c-info-modal__btn'
          onClick={() => handleOnClick()}
        >
          {btnTitle}
        </button>
      </div>
      {showModal && <div className='c-info-modal__overlay' />}
    </>
  );
};
