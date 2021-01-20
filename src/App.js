import React, { useContext, useEffect } from 'react';
import GameTitle from './components/GameTitle';
import MainActionPanel from './components/MainActionPanel';
import InfoPanel from './components/InfoPanel';
import GameTable from './components/GameTable';
import ActionPanel from './components/ActionPanel';
import GameResult from './components/GameResult';
import { AppContext } from './state/AppContext';
import BetForm from './components/BetForm';
import Loader from './components/Loader';

const App = () => {
  const {
    initApp,
    state: { bet, roundStarted, gameStarted, loading, deck },
  } = useContext(AppContext);
  useEffect(() => {
    initApp();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className='c-main-container'>
          <GameTitle />
          <MainActionPanel />
          {gameStarted && <InfoPanel />}
          {gameStarted && <BetForm />}
          <GameTable />
          <GameResult />
          {roundStarted && bet && <ActionPanel />}
        </main>
      )}
    </>
  );
};

export default App;
