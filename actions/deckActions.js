import {
  DECK_LIST_LOADING,
  DECK_LIST_LOADED,
  DECK_CREATING,
  DECK_CREATED,
  DECK_UPDATING,
  DECK_UPDATED,
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

export const updateDeck = (targetDeck) => {
  return dispatch => {
    dispatch({
      type: DECK_UPDATING,
      loading: true,
    });
    return FlashcardApi.updateDeck(targetDeck)
      .then(
        () => {
          dispatch({
            type: DECK_UPDATED,
            loading: false,
          });
          dispatch(loadDeckList());
        }
      )
  };
};

