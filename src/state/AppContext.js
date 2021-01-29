import Axios from 'axios';
import { createContext, useEffect, useReducer } from 'react';
import AppReducer, {
  GET_CARDS_FAIL,
  GET_CARDS_REQUEST,
  GET_CARDS_SUCCESS,
  RESET_GAME,
  START_GAME,
  SAVE_GAME,
  LOAD_GAME,
  SET_BET,
  START_ROUND,
  NEW_DEAL,
  SET_SCORE,
  FINISH_ROUND,
  RESULT_PLAYER_WON,
  RESULT_DEALER_WON,
  RESET_ROUND,
  FINISH_GAME,
  HIT,
  STAND,
  DOUBLE_DOWN,
  SET_PLAYER_SCORE,
  SET_DEALER_SCORE,
  SHOW_INFO_MODAL,
  HIDE_INFO_MODAL,
  RESULT_DRAW,
} from './AppReducer';
import getCardsFromDeck from './../helpers/getCards';

export const initState = {
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

  const getCards = async (deck = 6) => {
    dispatch({ type: GET_CARDS_REQUEST });
    try {
      const response1 = await Axios.get(
        `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deck}`
      );
      if (response1.status > 200) {
        dispatch({ type: GET_CARDS_FAIL });
        return dispatch({
          type: SHOW_INFO_MODAL,
          title: 'Server Error!',
          closeBtnTitle: 'Reload Game!',
          cb: () => resetGame(),
        });
      }

      const response2 = await Axios.get(
        `https://deckofcardsapi.com/api/deck/${response1.data.deck_id}/draw/?count=${response1.data.remaining}`
      );

      if (response2.status > 200) {
        dispatch({ type: GET_CARDS_FAIL });
        return dispatch({
          type: SHOW_INFO_MODAL,
          title: 'Server Error!',
          closeBtnTitle: 'Reload Game!',
          cb: () => resetGame(),
        });
      }

      dispatch({ type: GET_CARDS_SUCCESS, payload: response2.data.cards });
    } catch (error) {
      dispatch({ type: GET_CARDS_FAIL });
    }
  };

  const startGame = () => dispatch({ type: START_GAME });

  const resetGame = () => {
    if (state.infoModal) {
      dispatch({ type: HIDE_INFO_MODAL });
    }
    dispatch({ type: RESET_GAME });
    getCards();
  };

  const resetRound = () => {
    dispatch({ type: RESET_ROUND });
    dispatch({ type: HIDE_INFO_MODAL });
  };

  const saveGame = () => {
    dispatch({ type: SAVE_GAME });
    dispatch({
      type: SHOW_INFO_MODAL,
      payload: {
        title: 'Game was save!',
        closeBtnTitle: 'Back to game',
      },
    });
  };

  const loadGame = () => {
    dispatch({ type: LOAD_GAME });
    dispatch({
      type: SHOW_INFO_MODAL,
      payload: {
        title: 'Game was load!',
        closeBtnTitle: 'Back to game',
      },
    });
  };

  const setBet = (bet) => {
    const playerCards = getCardsFromDeck(state.deck, 2);
    const dealerCards = getCardsFromDeck(state.deck, 2);
    dispatch({ type: SET_BET, payload: bet });
    dispatch({ type: START_ROUND });
    dispatch({ type: NEW_DEAL, payload: { playerCards, dealerCards } });
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
          msg: 'You win! You got blackjack.',
          cb: () => resetRound(),
          closeBtnTitle: 'New Deal',
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
          msg: 'You lost. Dealer got blackjack.',
          cb: () => resetRound(),
          closeBtnTitle: 'New Deal',
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
          msg: 'You went over 21! The dealer wins.',
          cb: () => resetRound(),
          closeBtnTitle: 'New Deal',
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
          msg: 'Dealer went over 21! You win!',
          cb: () => resetRound(),
          closeBtnTitle: 'New Deal',
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
            msg: 'You win! You beat the dealer.',
            cb: () => resetRound(),
            closeBtnTitle: 'New Deal',
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
            msg: 'You lost. Dealer had the higher score.',
            cb: () => resetRound(),
            closeBtnTitle: 'New Deal',
          },
        });
      }
    }
    if (dealerScore >= 17 && playerScore === dealerScore && dealerScore < 21) {
      dispatch({ type: RESULT_DRAW });
      dispatch({ type: FINISH_ROUND });
      dispatch({
        type: SHOW_INFO_MODAL,
        payload: {
          title: 'Finish Round!',
          msg: 'Draw!',
          cb: () => resetRound(),
          closeBtnTitle: 'New Deal',
        },
      });
    }

    if (
      (state.gameRound > 4 && !state.roundStarted) ||
      (state.credit <= 0 && !state.roundStarted)
    ) {
      dispatch({ type: FINISH_GAME });
      const gameOverMsg = `Your score: ${state.credit}$`;
      return dispatch({
        type: SHOW_INFO_MODAL,
        payload: {
          title: 'Game Over!',
          msg: gameOverMsg,
          closeBtnTitle: 'Bak to Game!',
        },
      });
    }
  };

  const hitAction = () => {
    const playerCards = getCardsFromDeck(state.deck, 1);
    dispatch({ type: HIT, payload: playerCards });
    dispatch({ type: SET_PLAYER_SCORE });
  };

  const standAction = () => {
    const dealerCards = getCardsFromDeck(state.deck, 1);
    dispatch({ type: STAND, payload: dealerCards });
    dispatch({ type: SET_DEALER_SCORE });
  };

  const doubleDownAction = () => {
    /*
    One more option to inform player about invalid bet.
    if ( state.bet > state.credit) {
      return dispatch({
        type: SHOW_INFO_MODAL,
        payload: {
          title: 'Oops!',
          msg: 'Not enough funds to bet.',
          closeBtnTitle: 'Back to game',
        },
      });
    }
    */
    const playerCards = getCardsFromDeck(state.deck, 1);
    dispatch({ type: DOUBLE_DOWN, payload: playerCards });
    dispatch({ type: SET_PLAYER_SCORE });
  };

  const showGameScore = () => {
    const msg = (
      <div>
        {state.gameScore.length > 0 &&
          state.gameScore
            .sort((a, b) => a.credit - b.credit)
            .reverse()
            .map((item, idx) => (
              <div key={idx}>
                <span>Game-{item.gameRound}:&nbsp;&nbsp;</span>
                <span>{item.credit}$</span>
              </div>
            ))}
      </div>
    );
    dispatch({
      type: SHOW_INFO_MODAL,
      payload: {
        title: 'Game Score!',
        msg,
        closeBtnTitle: 'Back to Game',
      },
    });
  };

  return (
    <AppContext.Provider
      value={{
        getCards,
        startGame,
        resetGame,
        saveGame,
        loadGame,
        setBet,
        getResult,
        resetRound,
        hitAction,
        standAction,
        doubleDownAction,
        dispatch,
        showGameScore,
        deck: state.deck,
        stand: state.stand,
        playerCredit: state.credit,
        gameStarted: state.gameStarted,
        gameSave: state.gameSave,
        playerCards: state.playerCards,
        dealerCards: state.dealerCards,
        playerScore: state.playerScore,
        dealerScore: state.dealerScore,
        gameScore: state.gameScore,
        infoModal: state.infoModal,
        playerBet: state.bet,
        roundStarted: state.roundStarted,
        gameRound: state.gameRound,
        roundHistory: state.roundHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
