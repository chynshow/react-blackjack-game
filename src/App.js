import React, { useContext, useEffect } from 'react';
import GameTitle from './components/GameTitle';
import MainActionPanel from './components/MainActionPanel';
import InfoPanel from './components/InfoPanel';
import GameTable from './components/GameTable';
import ActionPanel from './components/ActionPanel';
import { AppContext } from './state/AppContext';
import BetForm from './components/BetForm';
import Loader from './components/Loader';
import InfoModal from './components/InfoModal/index';
import RoundHistory from './components/InfoPanel/RoundHistory';
// import useUnload from './hooks/useUnload';

const App = () => {
  const {
    initApp,
    // saveGame,
    playerBet,
    roundStarted,
    gameStarted,
    loading,
    roundHistory,
  } = useContext(AppContext);
  useEffect(() => {
    initApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* This is the implementation of this functionality:

  "The game saves when the tab/window is closed and a prompt appears to inform the player about this"

  The problem which I had I can't find the approach in order to change default browser message. For now :)

  useUnload((e) => {
    e.preventDefault();
    saveGame();
    e.returnValue = 'Game was saved!';
  });
  */

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className='c-main-container'>
          {!gameStarted && <GameTitle />}
          <MainActionPanel />
          {gameStarted && <InfoPanel />}

          <div className='c-main-container__aligner'>
            <RoundHistory roundHistory={roundHistory} />
            <GameTable />
          </div>

          {gameStarted && !roundStarted && playerBet <= 0 && <BetForm />}
          {playerBet > 0 && <ActionPanel />}
          <InfoModal />
        </main>
      )}
    </>
  );
};

export default App;
