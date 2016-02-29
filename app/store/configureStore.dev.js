import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducer';
import DevTools from '../container/DevTools';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(createLogger()),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    module.hot.accept('../reducer', () => {
      const nextRootReducer = require('../reducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
