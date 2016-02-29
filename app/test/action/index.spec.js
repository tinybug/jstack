/* global describe it */

import * as action from '../../action';

describe('test index action', () => {
  it('should return SAY_YOUR_NAME action', () => {
    action.sayYourName('jesse').should.eql({
      type: action.SAY_YOUR_NAME,
      payload: 'jesse',
    });
  });
});
