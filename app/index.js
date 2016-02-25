import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import rootRoute from './route';

render(<Router history={browserHistory} routes={rootRoute} />, document.getElementById('app'));
