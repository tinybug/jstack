/* global describe it */
import { application } from '../../reducer/application';
import * as ActionType from '../../action/application';

describe('test index reducer', () => {
  it('should return state that contains name state', () => {
    const preState = {};
    const action = {
      type: ActionType.SAY_YOUR_NAME,
      payload: 'jesse',
    };

    Object.freeze(preState);

    application(preState, action).should.eql({
      name: 'jesse',
    });
  });

  it('should return state that contains locale state', () => {
    const preState = {};
    const action = {
      type: ActionType.SWITCH_LOCALE,
      payload: 'zh',
    };

    Object.freeze(preState);

    application(preState, action).should.eql({
      locale: 'zh',
    });
  });
});
