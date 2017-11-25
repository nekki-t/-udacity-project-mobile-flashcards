import {
  DECK_LIST_LOADING,
  DECK_LIST_LOADED
} from './actionTypes';
import FlashcardApi from '../utils/flashcardApi';

export const loadDeckList = () => {
  return dispatch => {
    dispatch({
      type: DECK_LIST_LOADING,
      loading: true,
    });
    return FlashcardApi.getDecks()
      .then(
        response => {
          dispatch({
            type: DECK_LIST_LOADED,
            loading: false,
            decks: response,
          })
        }
      )
  }
};

export const createDeck = (id, title) => {
  return dispatch => {
    dispatch(loadDeckList())
  };
};