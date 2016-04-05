if (process.env.RUNTIME === 'web') {
  const { browserHistory } = require('react-router');
  module.exports = browserHistory;
} else {
  const { hashHistory } = require('react-router');
  module.exports = hashHistory;
}
