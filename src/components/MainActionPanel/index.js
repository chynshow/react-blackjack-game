import React from 'react';

const MainActionPanel = () => {
  return (
    <div className='c-main-action-panel'>
      <button
        className='c-btn c-main-action-panel__btn'
        // disabled={gameStarted}
        // onClick={() => startGame()}
      >
        Start Game
      </button>
      <button
        className='c-btn c-main-action-panel__btn'
        // disabled={!gameStarted}
        // onClick={() => resetGame()}
      >
        Reset Game
      </button>
      <button
        className='c-btn c-main-action-panel__btn'
        // disabled={!gameStarted}
        // onClick={() => resetGame()}
      >
        Score
      </button>
      <button
        className='c-btn c-main-action-panel__btn'
        // disabled={!gameStarted}
        // onClick={() => saveGame()}
      >
        Save Game
      </button>
      <button
        className='c-btn c-main-action-panel__btn'
        // disabled={!saveGames.length > 0}
        // onClick={() => loadGame()}
      >
        Load Game
      </button>
    </div>
  );
};

export default MainActionPanel;
