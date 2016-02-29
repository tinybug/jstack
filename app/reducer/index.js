import * as ActionTypes from '../action';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

function reducer(state = { name: '' }, action) {
  switch (action.type) {
    case ActionTypes.SAY_YOUR_NAME:
      return Object.assign({}, state, { name: action.payload });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  reducer,
  routing,
});

export default rootReducer;
