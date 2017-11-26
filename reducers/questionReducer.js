import {
  QUESTIONS_LOADING,
  QUESTIONS_LOADED,
  QUESTION_CREATING,
  QUESTION_CREATED,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
};

export default (state=initialState, action={}) => {
  const {
    loading
  } = action;

  switch (action.type) {
    case QUESTION_CREATING:
    case QUESTION_CREATED:
      return {
        loading,
      };
    default:
      return state;
  }
}