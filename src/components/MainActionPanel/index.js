import React, { useContext } from 'react';
import { AppContext } from '../../state/AppContext';

const MainActionPanel = () => {
  const {
    startGame,
    resetGame,
    saveGame,
    loadGame,
    showGameScore,
    state: { gameStarted, gameSave, gameScore },
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

      {gameStarted && (
        <>
          <button
            className='c-btn c-main-action-panel__btn'
            disabled={!gameStarted}
            onClick={() => resetGame()}
          >
            Reset Game
          </button>
          {!gameScore.length <= 0 && (
            <button
              className='c-btn c-main-action-panel__btn'
              disabled={gameScore.length <= 0}
              onClick={() => showGameScore()}
            >
              Score
            </button>
          )}
          <button
            className='c-btn c-main-action-panel__btn'
            onClick={() => saveGame()}
          >
            Save Game
          </button>
          {gameSave && (
            <button
              className='c-btn c-main-action-panel__btn'
              onClick={() => loadGame()}
            >
              Load Game
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default MainActionPanel;
