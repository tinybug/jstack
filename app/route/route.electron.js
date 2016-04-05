import React from 'react';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="/" component={require('../container/App')}>
    <IndexRoute component={require('../container/IndexContainer')} />
  </Route>
);
