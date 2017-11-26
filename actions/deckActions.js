import {
  DECK_LIST_LOADING,
  DECK_LIST_LOADED,
  DECK_CREATING,
  DECK_CREATED,
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

export const createDeck = (newDeck) => {
  return dispatch => {
    dispatch({
      type: DECK_CREATING,
      loading: true,
    });
    return FlashcardApi.createDeck(newDeck)
      .then(
        () => {
          dispatch({
            type: DECK_CREATED,
            loading: false,
          });
          dispatch(loadDeckList())
        }
      )
  };
};