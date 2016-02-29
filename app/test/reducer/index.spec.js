/* global describe it */

import reducer from '../../reducer';
import * as ActionType from '../../action';

describe('test index reducer', () => {
  it('should return state that contains name state', () => {
    const preState = {};
    const action = {
      type: ActionType.SAY_YOUR_NAME,
      payload: 'jesse',
    };

    Object.freeze(preState);

    reducer(preState, action).reducer.should.eql({
      name: 'jesse',
    });
  });
});
