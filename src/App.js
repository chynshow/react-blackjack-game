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

const App = () => {
  const {
    initApp,
    saveGame,
    state: { bet, roundStarted, gameStarted, loading, roundHistory },
  } = useContext(AppContext);
  useEffect(() => {
    initApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnClose = (e) => {
    e.preventDefault();
    e.returnValue = '';
    saveGame();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', (e) => handleOnClose(e));
    return () => {
      window.removeEventListener('beforeunload', (e) => handleOnClose(e));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

          {gameStarted && !roundStarted && bet <= 0 && <BetForm />}
          {bet > 0 && <ActionPanel />}
          <InfoModal />
        </main>
      )}
    </>
  );
};

export default App;
