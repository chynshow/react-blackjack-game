import React from 'react';
import GameTitle from './components/GameTitle';
import MainActionPanel from './components/MainActionPanel';
import ResultPanel from './components/InfoPanel';
import GameTable from './components/GameTable';
import ActionPanel from './components/ActionPanel';
import GameResult from './components/GameResult';
// import BetForm from './components/BetInput';
// import Loader from './components/Loader';

const App = () => {
  return (
    <>
      {/* <Loader /> */}
      <main className='c-main-container'>
        <GameTitle />
        <MainActionPanel />
        <ResultPanel />
        {/* <BetForm /> */}
        <GameTable />
        <GameResult />
        <ActionPanel />
      </main>
    </>
  );
};

export default App;
