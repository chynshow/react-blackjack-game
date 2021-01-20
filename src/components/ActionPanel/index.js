import React, { useContext } from 'react';
import { AppContext } from '../../state/AppContext';

const ActionPanel = () => {
  const { hit, stand, doubleDown } = useContext(AppContext);
  return (
    <div className='c-action-panel'>
      <button className='c-btn c-action-panel__btn' onClick={() => hit()}>
        Hit
      </button>
      <button className='c-btn c-action-panel__btn' onClick={() => stand()}>
        Stand
      </button>
      <button
        className='c-btn c-action-panel__btn'
        onClick={() => doubleDown()}
      >
        Double Down
      </button>
    </div>
  );
};

export default ActionPanel;
