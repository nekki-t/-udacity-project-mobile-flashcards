import { combineReducers } from 'redux';
import deck from './deckReducer';
import question from './questionReducer';

const rootReducer = combineReducers({
  deck,
  question,
});

export default rootReducer;