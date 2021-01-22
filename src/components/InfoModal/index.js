import React, { useContext } from 'react';
import { AppContext } from '../../state/AppContext';
import { HIDE_INFO_MODAL } from '../../state/AppReducer';

const InfoModal = () => {
  const { infoModal, dispatch } = useContext(AppContext);
  const handelOnClick = () => {
    if (!infoModal?.cb) return dispatch({ type: HIDE_INFO_MODAL });
    infoModal?.cb();
  };

  return (
    <>
      <div
        className={`${
          infoModal?.isActive
            ? 'c-info-modal c-info-modal--active'
            : 'c-info-modal'
        }`}
      >
        <h5 className='c-info-modal__title'>{infoModal?.title}</h5>
        <div className='c-info-modal__msg'>{infoModal?.msg}</div>

        <button className='c-btn c-info-modal__btn' onClick={handelOnClick}>
          {infoModal?.closeBtnTitle}
        </button>
      </div>
      {infoModal?.isActive && <div className='c-info-modal__overlay' />}
    </>
  );
};

export default InfoModal;
