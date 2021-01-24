import AppReducer, {
  GET_CARDS_FAIL,
  GET_CARDS_REQUEST,
  GET_CARDS_SUCCESS,
  RESET_GAME,
  START_GAME,
  SAVE_GAME,
  SET_BET,
  START_ROUND,
  SET_SCORE,
  FINISH_ROUND,
  RESULT_PLAYER_WON,
  RESULT_DEALER_WON,
  RESET_ROUND,
  FINISH_GAME,
  HIT,
  NEW_DEAL,
  STAND,
  DOUBLE_DOWN,
  SET_PLAYER_SCORE,
  SET_DEALER_SCORE,
  SHOW_INFO_MODAL,
  HIDE_INFO_MODAL,
  RESULT_DRAW,
} from './AppReducer';
import getCardsSum from './../helpers/getCardsSum';
import getCards from '../helpers/getCards';
import { initState } from './AppContext';

describe('test app reducer', () => {
  const cards = [
    {
      code: '2D',
      image: 'https://deckofcardsapi.com/static/img/2D.png',
      images: {
        png: 'https://deckofcardsapi.com/static/img/2D.png',
        svg: 'https://deckofcardsapi.com/static/img/2D.svg',
      },
      suit: 'DIAMONDS',
      value: '2',
    },
    {
      code: '9H',
      image: 'https://deckofcardsapi.com/static/img/9H.png',
      images: {
        png: 'https://deckofcardsapi.com/static/img/9H.svg',
        svg: 'https://deckofcardsapi.com/static/img/9H.svg',
      },
      suit: 'HEARTS',
      value: '9',
    },
    {
      code: '2D',
      image: 'https://deckofcardsapi.com/static/img/2D.png',
      images: {
        png: 'https://deckofcardsapi.com/static/img/2D.png',
        svg: 'https://deckofcardsapi.com/static/img/2D.svg',
      },
      suit: 'DIAMONDS',
      value: '2',
    },
    {
      code: '9H',
      image: 'https://deckofcardsapi.com/static/img/9H.png',
      images: {
        png: 'https://deckofcardsapi.com/static/img/9H.svg',
        svg: 'https://deckofcardsapi.com/static/img/9H.svg',
      },
      suit: 'HEARTS',
      value: '9',
    },
  ];

  it('test reducer with default parameters', () => {
    const res = AppReducer([], {});
    expect(res).toEqual([]);
  });
  it('test reducer with initial state parameters', () => {
    const res = AppReducer(initState, {});
    expect(res).toEqual(initState);
  });
  it('test reducer with GET_CARDS_REQUEST action', () => {
    const action = { type: GET_CARDS_REQUEST };
    const res = AppReducer(initState, action);
    expect(res).toEqual({ ...initState, loading: true });
  });
  it('test reducer with GET_CARDS_FAIL action', () => {
    const action = { type: GET_CARDS_FAIL };
    const res = AppReducer(initState, action);
    expect(res).toEqual({ ...initState, loading: false });
  });
  it('test reducer with GET_CARDS_SUCCESS action', () => {
    const action = {
      type: GET_CARDS_SUCCESS,
      payload: [...cards],
    };

    const output = {
      ...initState,
      deck: [...action.payload],
      loading: false,
    };

    const res = AppReducer(initState, action);
    expect(res).toEqual(output);
  });
  it('test reducer with RESET_GAME action', () => {
    const action = { type: RESET_GAME };
    const res = AppReducer(initState, action);
    const output = {
      ...initState,
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
      infoModal: {
        isActive: false,
        title: null,
        msg: null,
        cb: null,
      },
    };
    expect(res).toEqual(output);
  });
  it('test reducer with START_GAME action', () => {
    const action = { type: START_GAME };
    const res = AppReducer(initState, action);
    expect(res).toEqual({ ...initState, gameStarted: true });
  });
  it('test reducer with SAVE_GAME action', () => {
    const action = { type: SAVE_GAME };
    const res = AppReducer(initState, action);
    expect(res).toEqual({ ...initState, gameSave: { ...initState } });
  });
  it('test reducer with SET_BET action', () => {
    const action = { type: SET_BET, payload: 5 };
    const res = AppReducer(initState, action);
    expect(res).toEqual({
      ...initState,
      bet: action.payload,
      credit: initState.credit - action.payload,
    });
  });
  it('test reducer with START_ROUND action', () => {
    const action = { type: START_ROUND };
    const res = AppReducer(initState, action);
    expect(res).toEqual({
      ...initState,
      roundStarted: true,
      gameRound: initState.gameRound + 1,
    });
  });
  it('test reducer with SET_SCORE action', () => {
    const action = { type: SET_SCORE };

    const res = AppReducer(
      {
        ...initState,
        dealerCards: [...cards],
        playerCards: [...cards],
      },
      action
    );

    const output = {
      ...initState,
      dealerCards: [...cards],
      playerCards: [...cards],
      playerScore: getCardsSum(cards),
      dealerScore: getCardsSum(cards),
    };
    expect(res).toEqual(output);
  });
  it('test reducer with RESET_ROUND action', () => {
    const action = { type: RESET_ROUND };

    const res = AppReducer(initState, action);

    const output = {
      ...initState,
      playerCards: [],
      dealerCards: [],
      bet: 0,
      playerScore: 0,
      dealerScore: 0,
      stand: false,
    };
    expect(res).toEqual(output);
  });
  it('test reducer with RESULT_PLAYER_WON action', () => {
    const action = { type: RESULT_PLAYER_WON };

    const res = AppReducer({ ...initState, bet: 5 }, action);

    const output = {
      ...initState,
      credit: 1007.5,
      bet: 5,
    };
    expect(res).toEqual(output);
  });
  it('test reducer with RESULT_DEALER_WON action', () => {
    const action = { type: RESULT_DEALER_WON };

    const res = AppReducer({ ...initState, bet: 5 }, action);

    const output = {
      ...initState,
      credit: initState.credit,
      bet: 5,
    };
    expect(res).toEqual(output);
  });
  it('test reducer with RESULT_DRAW action', () => {
    const action = { type: RESULT_DRAW };
    const bet = 5;

    const res = AppReducer(
      { ...initState, bet, credit: initState.credit - bet },
      action
    );

    const output = {
      ...initState,
      credit: initState.credit + initState.bet,
      bet: 5,
    };
    expect(res).toEqual(output);
  });
  it('test reducer with HIT action', () => {
    const action = { type: HIT, payload: getCards(cards, 1) };

    const res = AppReducer(initState, action);

    const output = {
      ...initState,
      playerCards: [...initState.playerCards, ...action.payload],
    };
    expect(res).toEqual(output);
  });
  it('test reducer with NEW_DEAL action', () => {
    const action = {
      type: NEW_DEAL,
      payload: {
        playerCards: [...initState.playerCards, ...getCards(cards, 2)],
        dealerCards: [...initState.dealerCards, ...getCards(cards, 2)],
      },
    };

    const res = AppReducer(initState, action);

    const output = {
      ...initState,
      playerCards: action.payload.playerCards,
      dealerCards: action.payload.dealerCards,
    };
    expect(res).toEqual(output);
  });
  it('test reducer with STAND action', () => {
    const action = { type: STAND, payload: getCards(cards, 1) };

    const res = AppReducer(initState, action);

    const output = {
      ...initState,
      dealerCards: [...initState.dealerCards, ...action.payload],
      stand: true,
    };
    expect(res).toEqual(output);
  });
  it('test reducer with DOUBLE_DOWN action', () => {
    const action = { type: DOUBLE_DOWN, payload: getCards(cards, 1) };

    const res = AppReducer(initState, action);

    const output = {
      ...initState,
      playerCards: [...initState.playerCards, ...action.payload],
      stand: true,
      bet: initState.bet * 2,
      credit: initState.credit - initState.bet * 2,
    };
    expect(res).toEqual(output);
  });
  it('test reducer with SET_PLAYER_SCORE action', () => {
    const action = { type: SET_PLAYER_SCORE };

    const res = AppReducer(
      {
        ...initState,
        playerCards: [...initState.playerCards, ...getCards(cards, 2)],
      },
      action
    );

    const output = {
      ...initState,
      playerScore: getCardsSum(initState.playerCards),
    };
    expect(res).toEqual(output);
  });
  it('test reducer with SET_DEALER_SCORE action', () => {
    const action = { type: SET_DEALER_SCORE };

    const res = AppReducer(
      {
        ...initState,
        dealerCards: [...initState.dealerCards, ...getCards(cards, 2)],
      },
      action
    );

    const output = {
      ...initState,
      dealerScore: getCardsSum(initState.dealerCards),
    };
    expect(res).toEqual(output);
  });
  it('test reducer with SHOW_INFO_MODAL action', () => {
    const payload = {
      title: 'Modal title',
      msg: 'Modal message',
      cb: () => console.log('Modal callBack'),
      closeBtnTitle: 'Close modal',
    };
    const action = { type: SHOW_INFO_MODAL, payload };

    const res = AppReducer(initState, action);

    const output = {
      ...initState,
      infoModal: {
        isActive: true,
        title: payload.title,
        msg: payload.msg,
        cb: payload.cb,
        closeBtnTitle: payload.closeBtnTitle,
      },
    };
    expect(res).toEqual(output);
  });
  it('test reducer with HIDE_INFO_MODAL action', () => {
    const action = { type: HIDE_INFO_MODAL };

    const res = AppReducer(initState, action);

    const output = {
      ...initState,
      infoModal: {
        isActive: false,
        title: null,
        msg: null,
        cb: null,
        closeBtnTitle: null,
      },
    };
    expect(res).toEqual(output);
  });
  it('test reducer with FINISH_ROUND action', () => {
    const action = { type: FINISH_ROUND };

    const res = AppReducer(initState, action);

    const output = {
      ...initState,
      roundHistory: [
        ...initState.roundHistory,
        {
          cards: {
            playerCards: [...initState.playerCards],
            dealerCards: [...initState.dealerCards],
          },
          score: {
            playerScore: initState.playerScore,
            dealerScore: initState.dealerScore,
          },
          round: initState.gameRound,
          credit: initState.credit,
          bet: initState.bet,
        },
      ],
      roundStarted: false,
    };
    expect(res).toEqual(output);
  });
  it('test reducer with FINISH_GAME action', () => {
    const action = { type: FINISH_GAME };

    const res = AppReducer(initState, action);

    const output = {
      ...initState,
      gameScore: [
        ...initState.gameScore,
        { gameRound: initState.gameScore.length + 1, credit: initState.credit },
      ],
      gameStarted: false,
    };
    expect(res).toEqual(output);
  });
});
