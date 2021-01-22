import moment from 'moment';
import getCards from '../helpers/getCards';
import getCardsSum from '../helpers/getCardsSum';

export const GET_STATE = 'GET_STATE';
export const GET_CARDS_REQUEST = 'GET_CARDS_REQUEST';
export const GET_CARDS_SUCCESS = 'GET_CARDS_SUCCESS';
export const GET_CARDS_FAIL = 'GET_CARDS_FAIL';

export const START_GAME = 'START_GAME';
export const RESET_GAME = 'RESET_GAME';
export const FINISH_GAME = 'FINISH_GAME';
export const SAVE_GAME = 'SAVE_GAME';
export const LOAD_GAME = 'LOAD_GAME';

export const SET_BET = 'SET_BET';
export const START_ROUND = 'START_ROUND';
export const FINISH_ROUND = 'FINISH_ROUND';
export const RESET_ROUND = 'RESET_ROUND';
export const NEW_DEAL = 'NEW_DEAL';
export const SET_SCORE = 'SET_SCORE';

export const RESULT_PUSH = 'RESULT_PUSH';
export const RESULT_PLAYER_WON = 'RESULT_PLAYER_WON';
export const RESULT_DEALER_WON = 'RESULT_DEALER_WON';

export const HIT = 'HIT';
export const STAND = 'STAND';
export const DOUBLE_DOWN = 'DOUBLE_DOWN';
export const SET_DEALER_SCORE = 'SET_DEALER_SCORE';
export const SET_PLAYER_SCORE = 'SET_PLAYER_SCORE';

export const SHOW_ALERT = 'SHOW_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';

export const SHOW_INFO_MODAL = 'SHOW_INFO_MODAL';
export const HIDE_INFO_MODAL = 'HIDE_INFO_MODAL';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { type, payload } = action;
  console.log(`State type: ${type}`);
  switch (type) {
    case GET_CARDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        deck: [...payload],
      };
    case GET_CARDS_FAIL:
      return {
        ...state,
        loading: false,
        deck: [],
      };

    case START_GAME:
      return {
        ...state,
        gameStarted: true,
      };
    case RESET_GAME:
      return {
        ...state,
        gameStarted: false,
        roundStarted: false,
        gameRound: 0,
        deck: [],
        playerCards: [],
        dealerCards: [],
        credit: 1000,
        playerScore: 0,
        dealerScore: 0,
        bet: 0,
        stand: false,
        roundHistory: [],
        loading: false,
        finishRoundMsg: null,
      };
    case FINISH_GAME:
      return {
        ...state,
        gameScore: [
          ...state.gameScore,
          {
            score: state.credit,
            date: moment('2016-03-12 13:00:00').add(1, 'day').format('LLL'),
          },
        ],
        gameStarted: false,
      };
    case SAVE_GAME:
      return {
        ...state,
        gameSave: { ...state },
      };
    case LOAD_GAME:
      return {
        ...state,
        gameStarted: state.gameSave.gameStarted,
        gameRound: state.gameSave.gameRound,
        deck: state.gameSave.deck,
        playerCards: state.gameSave.playerCards,
        dealerCards: state.gameSave.dealerCards,
        playerScore: state.gameSave.playerScore,
        dealerScore: state.gameSave.dealerScore,
        credit: state.gameSave.credit,
        score: state.gameSave.score,
        bet: state.gameSave.bet,
        roundHistory: state.gameSave.roundHistory,
        loading: state.gameSave.loading,
        gameSave: { ...state.gameSave },
      };

    case SET_BET:
      return {
        ...state,
        credit: state.credit - payload,
        bet: state.bet + payload,
        showBetInput: false,
      };
    case START_ROUND:
      return {
        ...state,
        roundStarted: true,
        gameRound: state.gameRound + 1,
      };
    case FINISH_ROUND:
      return {
        ...state,
        roundHistory: [
          ...state.roundHistory,
          {
            cards: {
              playerCards: [...state.playerCards],
              dealerCards: [...state.dealerCards],
            },
            score: {
              playerScore: state.playerScore,
              dealerScore: state.dealerScore,
            },
            round: state.gameRound,
            credit: state.credit,
            bet: state.bet,
          },
        ],
        roundStarted: false,
      };
    case RESET_ROUND:
      return {
        ...state,
        playerCards: [],
        dealerCards: [],
        bet: 0,
        playerScore: 0,
        dealerScore: 0,
        finishRoundMsg: null,
        stand: false,
      };
    case NEW_DEAL:
      return {
        ...state,
        playerCards: [...state.playerCards, ...getCards(state.deck, 2)],
        dealerCards: [...state.dealerCards, ...getCards(state.deck, 2)],
      };
    case SET_SCORE:
      return {
        ...state,
        playerScore: getCardsSum(state.playerCards),
        dealerScore: getCardsSum(state.dealerCards),
      };

    case RESULT_PUSH:
      return {
        ...state,
        credit: state.credit,
      };
    case RESULT_PLAYER_WON:
      return {
        ...state,
        credit: state.credit + state.bet * 1.5,
      };
    case RESULT_DEALER_WON:
      return {
        ...state,
        credit: state.credit,
      };

    case HIT:
      return {
        ...state,
        playerCards: [...state.playerCards, ...getCards(state.deck, 1)],
      };
    case STAND:
      return {
        ...state,
        dealerCards: [...state.dealerCards, ...getCards(state.deck, 1)],
        stand: true,
      };
    case DOUBLE_DOWN:
      return {
        ...state,
        bet: state.bet * 2,
        credit: state.credit - state.bet * 2,
        playerCards: [...state.playerCards, ...getCards(state.deck, 1)],
        stand: true,
      };
    case SET_PLAYER_SCORE:
      return {
        ...state,
        playerScore: getCardsSum(state.playerCards),
      };
    case SET_DEALER_SCORE:
      return {
        ...state,
        dealerScore: getCardsSum(state.dealerCards),
      };

    case SHOW_ALERT:
      return {
        ...state,
        alert: { msg: payload.msg, state: payload.state },
      };
    case HIDE_ALERT:
      return {
        ...state,
        alert: { msg: null, state: null },
      };
    case SHOW_INFO_MODAL:
      return {
        ...state,
        infoModal: {
          isActive: true,
          title: payload.title,
          msg: payload.msg,
          cb: payload.cb,
          closeBtnTitle: payload.closeBtnTitle,
        },
      };

    case HIDE_INFO_MODAL:
      return {
        ...state,
        infoModal: {
          isActive: false,
          title: null,
          msg: null,
          cb: null,
          closeBtnTitle: null,
        },
      };

    case GET_STATE:
      console.log(state);
      return {
        ...state,
      };
    default:
      return state;
  }
};
