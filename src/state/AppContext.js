import Axios from 'axios';
import { createContext, useEffect, useReducer } from 'react';
import AppReducer, {
  GET_CARDS_FAIL,
  GET_CARDS_REQUEST,
  GET_CARDS_SUCCESS,
  SET_STATE,
  RESET_GAME,
  START_GAME,
  SAVE_GAME,
  LOAD_GAME,
  SET_BET,
  START_ROUND,
  NEW_DEAL,
  SET_SCORE,
  FINISH_ROUND,
  RESULT_PUSH,
  RESULT_PLAYER_WON,
  RESULT_DEALER_WON,
  RESET_ROUND,
  FINISH_GAME,
  HIT,
  STAND,
  DOUBLE_DOWN,
  SET_PLAYER_SCORE,
  SET_DEALER_SCORE,
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_INFO_MODAL,
  GET_STATE,
  HIDE_INFO_MODAL,
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
  roundHistory: [],
  gameSave: null,
  stand: false,
  loading: false,
  alert: { msg: null, state: null },
  infoModal: {
    isActive: false,
    title: null,
    msg: null,
    cb: null,
  },
};

export const AppContext = createContext(initState);

const init = (initValue = initState) =>
  JSON.parse(localStorage.getItem('state')) || initValue;

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initState, init);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    getResult(state.playerScore, state.dealerScore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.playerScore, state.dealerScore]);

  const showAlert = (msg, state, time = 2000) => {
    dispatch({ type: SHOW_ALERT, payload: { msg, state } });
    setTimeout(() => {
      dispatch({ type: HIDE_ALERT });
    }, time);
  };

  const getCards = async (deck = 6) => {
    dispatch({ type: GET_CARDS_REQUEST });
    try {
      const response1 = await Axios.get(
        `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deck}`
      );

      if (response1.status !== 200) {
        dispatch({ type: GET_CARDS_FAIL });
        return showAlert('Server Error!', 'warn');
      }

      const response2 = await Axios.get(
        `https://deckofcardsapi.com/api/deck/${response1.data.deck_id}/draw/?count=${response1.data.remaining}`
      );

      if (response2.status !== 200) {
        dispatch({ type: GET_CARDS_FAIL });
        return showAlert('Server Error!', 'warn');
      }

      dispatch({ type: GET_CARDS_SUCCESS, payload: response2.data.cards });
    } catch (error) {
      dispatch({ type: GET_CARDS_FAIL });
    }
  };

  const initApp = () => getCards();

  const startGame = () => dispatch({ type: START_GAME });

  const resetGame = () => {
    if (state.infoModal) {
      dispatch({ type: HIDE_INFO_MODAL });
    }
    dispatch({ type: RESET_GAME });
    getCards();
  };

  const resetRound = () => {
    if (state.gameRound > 4 || state.credit <= 0) {
      dispatch({ type: FINISH_GAME });
      return dispatch({
        type: SHOW_INFO_MODAL,
        payload: {
          title: 'Finish Game!',
          msg: `Your score ${state.credit}$`,
          cb: () => resetGame(),
          closeBtnTitle: 'New Game!',
        },
      });
    }
    dispatch({ type: RESET_ROUND });
    dispatch({ type: HIDE_INFO_MODAL });
  };

  const saveGame = () => {
    dispatch({ type: SAVE_GAME });
    showAlert('Game was save!', 'success');
  };

  const loadGame = () => {
    dispatch({ type: LOAD_GAME });
    showAlert('Game was load!', 'success');
  };

  const setBet = (bet) => {
    dispatch({ type: SET_BET, payload: bet });
    dispatch({ type: START_ROUND });
    dispatch({ type: NEW_DEAL });
    dispatch({ type: SET_SCORE });
  };

  const getResult = (playerScore, dealerScore) => {
    if (playerScore === 21) {
      dispatch({ type: RESULT_PLAYER_WON });
      dispatch({ type: FINISH_ROUND });
      dispatch({
        type: SHOW_INFO_MODAL,
        payload: {
          title: 'Finish Round!',
          msg: 'You won! You got Blackjack!',
          cb: () => resetRound(),
          closeBtnTitle: 'New Deal!',
        },
      });
    }
    if (dealerScore === 21) {
      dispatch({ type: RESULT_DEALER_WON });
      dispatch({ type: FINISH_ROUND });
      dispatch({
        type: SHOW_INFO_MODAL,
        payload: {
          title: 'Finish Round!',
          msg: 'You lose! Dealer got Blackjack',
          cb: () => resetRound(),
          closeBtnTitle: 'New Deal!',
        },
      });
    }
    if (playerScore > 21) {
      dispatch({ type: RESULT_DEALER_WON });
      dispatch({ type: FINISH_ROUND });
      dispatch({
        type: SHOW_INFO_MODAL,
        payload: {
          title: 'Finish Round!',
          msg: 'You went over 21! The dealer wins!',
          cb: () => resetRound(),
          closeBtnTitle: 'New Deal!',
        },
      });
    }
    if (dealerScore > 21) {
      dispatch({ type: RESULT_PLAYER_WON });
      dispatch({ type: FINISH_ROUND });
      dispatch({
        type: SHOW_INFO_MODAL,
        payload: {
          title: 'Finish Round!',
          msg: 'Dealer went over 21! The dealer you went!',
          cb: () => resetRound(),
          closeBtnTitle: 'New Deal!',
        },
      });
    }
    if (state.stand) {
      if (dealerScore >= 17 && playerScore > dealerScore && playerScore < 21) {
        dispatch({ type: RESULT_PLAYER_WON });
        dispatch({ type: FINISH_ROUND });
        dispatch({
          type: SHOW_INFO_MODAL,
          payload: {
            title: 'Finish Round!',
            msg: 'You win! You beat the dealer!',
            cb: () => resetRound(),
            closeBtnTitle: 'New Deal!',
          },
        });
      }
      if (dealerScore >= 17 && playerScore < dealerScore && dealerScore < 21) {
        dispatch({ type: RESULT_DEALER_WON });
        dispatch({ type: FINISH_ROUND });
        dispatch({
          type: SHOW_INFO_MODAL,
          payload: {
            title: 'Finish Round!',
            msg: 'You lost. Dealer had the higher score!',
            cb: () => resetRound(),
            closeBtnTitle: 'New Deal!',
          },
        });
      }
    }
    if (dealerScore >= 17 && playerScore === dealerScore && dealerScore < 21) {
      dispatch({ type: RESULT_PUSH });
      dispatch({ type: FINISH_ROUND });
      dispatch({
        type: SHOW_INFO_MODAL,
        payload: {
          title: 'Finish Round!',
          msg: 'Draw!',
          cb: () => resetRound(),
          closeBtnTitle: 'New Deal!',
        },
      });
    }
  };

  const hit = () => {
    dispatch({ type: HIT });
    dispatch({ type: SET_PLAYER_SCORE });
  };

  const stand = () => {
    dispatch({ type: STAND });
    dispatch({ type: SET_DEALER_SCORE });
  };

  const doubleDown = () => {
    dispatch({ type: DOUBLE_DOWN });
    dispatch({ type: SET_PLAYER_SCORE });
  };

  const showGameScore = () => {
    const msg = (
      <div>
        {state.gameScore.length > 0 &&
          state.gameScore.sort().map((item, idx) => (
            <div key={idx}>
              {item.date}
              {item.score}
            </div>
          ))}
      </div>
    );
    dispatch({
      type: SHOW_INFO_MODAL,
      payload: {
        title: 'Game Score!',
        msg,
        closeBtnTitle: 'Back to Game!',
      },
    });
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
        getResult,
        resetRound,
        hit,
        stand,
        doubleDown,
        dispatch,
        showGameScore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
