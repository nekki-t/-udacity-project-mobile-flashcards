import { combineReducers } from 'redux';
import deck from './deckReducer';

const rootReducer = combineReducers({
  deck,
});

export default rootReducer;