import React, { useContext } from 'react';
import { AppContext } from '../../state/AppContext';

const ActionPanel = () => {
  const {
    hitAction,
    doubleDownAction,
    standAction,
    state: { stand },
  } = useContext(AppContext);
  return (
    <div className='c-action-panel'>
      <button
        className='c-btn c-action-panel__btn'
        disabled={stand}
        onClick={() => hitAction()}
      >
        Hit
      </button>
      <button
        className='c-btn c-action-panel__btn'
        onClick={() => standAction()}
      >
        {stand ? 'Next' : 'Stand'}
      </button>
      <button
        className='c-btn c-action-panel__btn'
        onClick={() => doubleDownAction()}
        disabled={stand}
      >
        Double Down
      </button>
    </div>
  );
};

export default ActionPanel;
