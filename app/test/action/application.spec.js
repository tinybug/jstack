/* global describe it */
import * as action from '../../action/application';

describe('test index action', () => {
  it('should return SAY_YOUR_NAME action', () => {
    action.sayYourName('jesse').should.eql({
      type: action.SAY_YOUR_NAME,
      payload: 'jesse',
    });
  });

  it('should return SWITCH_LOCALE action', () => {
    action.switchLocale('zh').should.eql({
      type: action.SWITCH_LOCALE,
      payload: 'zh',
    });
  });
});
