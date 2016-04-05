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
    {
      path: '/dashboard',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../container/DashboardContainer'));
        });
      },
    },
  ],
};
