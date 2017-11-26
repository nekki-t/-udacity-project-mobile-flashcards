import {
  DECK_LIST_LOADING,
  DECK_LIST_LOADED,
  DECK_CREATING,
  DECK_CREATED,
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
    case DECK_CREATING:
    case DECK_CREATED:
      return {
        loading,
      };
    default:
      return state;
  }
};