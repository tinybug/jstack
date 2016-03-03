import * as ActionTypes from '../action/application';

export function application(state = { name: '', locale: '' }, action) {
  switch (action.type) {
    case ActionTypes.SAY_YOUR_NAME:
      return Object.assign({}, state, { name: action.payload });
    case ActionTypes.SWITCH_LOCALE:
      return Object.assign({}, state, { locale: action.payload });
    default:
      return state;
  }
}
