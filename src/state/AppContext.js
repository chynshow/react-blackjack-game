import Axios from 'axios';
import { createContext, useReducer } from 'react';
import AppReducer, {
  GET_CARDS_FAIL,
  GET_CARDS_REQUEST,
  GET_CARDS_SUCCESS,
  GET_STATE,
  SET_STATE,
  RESET_GAME,
  START_GAME,
  SAVE_GAME,
  LOAD_GAME,
  SET_BET,
  START_ROUND,
  NEW_DEAL,
  SET_SCORE,
} from './AppReducer';

const initState = {
  gameStarted: false,
  roundStarted: false,
  gameRound: 0,
  gameScore: [],
  deck: [],
  playerCards: [],
  dealerCards: [],
  credit: 1000,
  playerScore: 0,
  dealerScore: 0,
  bet: 0,
  gameHistory: [],
  roundHistory: [],
  finishRoundMsg: null,
  gameSave: {},
  stand: false,
  loading: false,
};

export const AppContext = createContext(initState);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initState);

  const getCards = async (deck = 6) => {
    dispatch({ type: GET_CARDS_REQUEST });
    try {
      const response1 = await Axios.get(
        `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deck}`
      );

      if (response1.status !== 200) return dispatch({ type: GET_CARDS_FAIL });

      const response2 = await Axios.get(
        `https://deckofcardsapi.com/api/deck/${response1.data.deck_id}/draw/?count=${response1.data.remaining}`
      );

      if (response2.status !== 200) return dispatch({ type: GET_CARDS_FAIL });

      dispatch({ type: GET_CARDS_SUCCESS, payload: response2.data.cards });
    } catch (error) {
      dispatch({ type: GET_CARDS_FAIL });
    }
  };

  const initApp = () => {
    if (localStorage.state)
      return dispatch({
        type: SET_STATE,
        payload: JSON.parse(localStorage.state),
      });
    getCards();
  };

  const startGame = () => {
    dispatch({ type: START_GAME });
  };

  const resetGame = () => {
    localStorage.removeItem('state');
    dispatch({ type: RESET_GAME });
    getCards();
  };

  const saveGame = () => {
    dispatch({ type: SAVE_GAME });
    console.log('Message Game was save!');
  };

  const loadGame = () => {
    dispatch({ type: LOAD_GAME });
    console.log('Message: Game was load!');
  };

  const setBet = (bet) => {
    dispatch({ type: SET_BET, payload: bet });
    dispatch({ type: START_ROUND });
    dispatch({ type: NEW_DEAL });
    dispatch({ type: SET_SCORE });
    dispatch({ type: GET_STATE });
  };

  return (
    <AppContext.Provider
      value={{
        initApp,
        getCards,
        state,
        startGame,
        resetGame,
        saveGame,
        loadGame,
        setBet,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
