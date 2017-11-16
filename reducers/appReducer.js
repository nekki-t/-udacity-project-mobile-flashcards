import {
  APP_STARTING,
  APP_STARTED,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  decks: []
};


export default (state = initialState, action = {}) => {
  const {
    loading,
    decks
  } = action;
  switch(action.type) {
    case APP_STARTING:
      return {
        ...state,
        loading,
      };
    case APP_STARTED:
      return {
        ...state,
        decks,
        loading,
      };
    default:
      return state;
  }
};