if (process.env.RUNTIME === 'web') {
  module.exports = require('./route.web');
} else {
  module.exports = require('./route.electron');
}
