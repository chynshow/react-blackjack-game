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
    gameRound,
  } = useContext(AppContext);

  return (
    <div className='c-main-action-panel'>
      {!gameStarted && gameRound <= 0 && (
        <button
          className='c-btn c-main-action-panel__start-btn'
          onClick={() => startGame()}
        >
          Start Game
        </button>
      )}

      {gameRound > 0 && !gameStarted && (
        <button
          className='c-btn c-main-action-panel__start-btn'
          onClick={() => resetGame()}
        >
          New Game
        </button>
      )}

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
