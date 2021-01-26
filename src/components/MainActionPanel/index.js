import React, { useContext } from 'react';
import { AppContext } from '../../state/AppContext';

const MainActionPanel = () => {
  const {
    startGame,
    resetGame,
    saveGame,
    loadGame,
    showGameScore,
    gameStarted,
    gameSave,
    gameScore,
  } = useContext(AppContext);

  return (
    <div className='c-main-action-panel'>
      <button
        className='c-btn c-main-action-panel__start-btn'
        onClick={() => startGame()}
        disabled={gameStarted}
      >
        Start Game
      </button>

      <button
        className='c-btn c-main-action-panel__btn'
        disabled={!gameStarted}
        onClick={() => resetGame()}
      >
        Reset Game
      </button>
      <button
        className='c-btn c-main-action-panel__btn'
        disabled={gameScore.length <= 0 || !gameStarted}
        onClick={() => showGameScore()}
      >
        Game Score
      </button>
      <button
        className='c-btn c-main-action-panel__btn'
        onClick={() => saveGame()}
        disabled={!gameStarted}
      >
        Save Game
      </button>
      <button
        className='c-btn c-main-action-panel__btn'
        onClick={() => loadGame()}
        disabled={!gameSave || !gameStarted}
      >
        Load Game
      </button>
    </div>
  );
};

export default MainActionPanel;
