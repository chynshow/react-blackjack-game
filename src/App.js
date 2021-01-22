import React, { useContext, useEffect } from 'react';
import GameTitle from './components/GameTitle';
import MainActionPanel from './components/MainActionPanel';
import InfoPanel from './components/InfoPanel';
import GameTable from './components/GameTable';
import ActionPanel from './components/ActionPanel';
import { AppContext } from './state/AppContext';
import BetForm from './components/BetForm';
import Loader from './components/Loader';
import Alert from './components/Alert';
import { GET_STATE } from './state/AppReducer';
import InfoModal from './components/InfoModal/index';

const App = () => {
  const {
    initApp,
    // saveGame,
    dispatch,
    state: { bet, roundStarted, gameStarted, loading },
  } = useContext(AppContext);
  useEffect(() => {
    initApp();
    dispatch({ type: GET_STATE });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleOnClose = (e) => {
  //   e.preventDefault();
  //   e.returnValue = '';
  //   saveGame();
  // };

  // useEffect(() => {
  //   window.addEventListener('beforeunload', (e) => handleOnClose(e));
  //   return () => {
  //     window.removeEventListener('beforeunload', (e) => handleOnClose(e));
  //   };
  // }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className='c-main-container'>
          <Alert />
          <GameTitle />
          <MainActionPanel />
          {gameStarted && <InfoPanel />}
          {gameStarted && !roundStarted && bet <= 0 && <BetForm />}
          <GameTable />
          {bet > 0 && <ActionPanel />}
          <InfoModal />
        </main>
      )}
    </>
  );
};

export default App;
