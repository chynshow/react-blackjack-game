import React, { useContext } from 'react';
import { AppContext } from '../../state/AppContext';
import { HIDE_INFO_MODAL } from '../../state/AppReducer';

const InfoModal = () => {
  const {
    state: {
      infoModal: { isActive, title, msg, cb, closeBtnTitle },
    },
    dispatch,
  } = useContext(AppContext);
  const handelOnClick = () => {
    if (!cb) return dispatch({ type: HIDE_INFO_MODAL });
    cb();
  };

  return (
    <>
      <div
        className={`${
          isActive ? 'c-info-modal c-info-modal--active' : 'c-info-modal'
        }`}
      >
        <h5 className='c-info-modal__title'>{title}</h5>
        <div className='c-info-modal__msg'>{msg}</div>

        <button className='c-btn c-info-modal__btn' onClick={handelOnClick}>
          {closeBtnTitle}
        </button>
      </div>
      {isActive && <div className='c-info-modal__overlay' />}
    </>
  );
};

export default InfoModal;
