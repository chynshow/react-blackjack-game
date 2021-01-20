export const GET_STATE = 'GET_STATE';

export const SET_STATE = 'SET_STATE';
export const GET_CARDS_REQUEST = 'GET_CARDS_REQUEST';
export const GET_CARDS_SUCCESS = 'GET_CARDS_SUCCESS';
export const GET_CARDS_FAIL = 'GET_CARDS_FAIL';

export const START_GAME = 'START_GAME';
export const RESET_GAME = 'RESET_GAME';
export const FINISH_GAME = 'FINISH_GAME';
export const SAVE_GAME = 'SAVE_GAME';
export const LOAD_GAME = 'LOAD_GAME';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { type, payload } = action;
  localStorage.setItem('state', JSON.stringify(state));
  switch (type) {
    case SET_STATE:
      return {
        ...payload,
      };
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
        showBetInput: true,
      };
    case RESET_GAME:
      console.clear();
      return {
        ...state,
        gameStarted: false,
        roundStarted: false,
        showBetInput: false,
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
        gameHistory: [...state.gameHistory, { score: state.credit }],
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

    case GET_STATE:
      console.log(state);
      return {
        ...state,
      };
    default:
      return state;
  }
};
