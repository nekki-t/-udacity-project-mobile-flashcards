import {
  DECK_LIST_LOADING,
  DECK_LIST_LOADED,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  decks: []
};

export default (state = initialState, action = {}) => {
  const {
    loading,
    decks,
  } = action;
  switch (action.type) {
    case DECK_LIST_LOADING:
    case DECK_LIST_LOADED:
      return {
        ...state,
        loading,
        decks,
      };
    default:
      return state;
  }
};