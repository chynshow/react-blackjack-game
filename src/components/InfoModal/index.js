import React from 'react';

const InfoModal = ({ btnTitle, cb, modalTitle, modalMsg, showModal }) => {
  return (
    <>
      <div
        className={`${
          showModal ? 'c-info-modal c-info-modal--active' : 'c-info-modal'
        }`}
      >
        <h5 className='c-info-modal__title'>{modalTitle}</h5>
        <div className='c-info-modal__msg'>{modalMsg}</div>
        <button className='c-btn c-info-modal__btn' onClick={() => cb()}>
          {btnTitle}
        </button>
      </div>
      {showModal && <div className='c-info-modal__overlay' />}
    </>
  );
};

export default InfoModal;
