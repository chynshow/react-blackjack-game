import React from 'react';

const ActionPanel = () => {
  return (
    <div className='c-action-panel'>
      <button
        className='c-btn c-action-panel__btn'
        //   onClick={() => hit()}
        //   disabled={!bet || !roundStarted}
      >
        Hit
      </button>
      <button
        className='c-btn c-action-panel__btn'
        //   onClick={() => stand()}
        //   disabled={!bet || !roundStarted}
      >
        Stand
      </button>
      <button
        className='c-btn c-action-panel__btn'
        //   onClick={() => doubleDown()}
        //   disabled={!bet || !roundStarted}
      >
        Double Down
      </button>
    </div>
  );
};

export default ActionPanel;
