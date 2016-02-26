if (process.env.RUNTIME === 'web') {
  module.exports = {
    component: require('../container/App'),
    childRoutes: [
      {
        path: '/',
        indexRoute: {
          getComponent(location, cb) {
            require.ensure([], (require) => {
              cb(null, require('../container/IndexContainer'));
            });
          },
        },
      },
    ],
  };
} else {
  module.exports = {
    component: require('../container/App'),
    childRoutes: [
      {
        path: '/',
        indexRoute: {
          component: require('../container/IndexContainer'),
        },
      },
    ],
  };
}
