import React from 'react';
// import {render} from 'react-dom';
import {render} from 'react-snapshot';
import {Provider} from 'react-redux';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import {renderRoutes} from 'react-router-config';

import store from './store/index';
import routes from './routes';

import './App.css';
// import registerServiceWorker from './registerServiceWorker';

const AppRouter = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  );
};

render(<AppRouter />, document.querySelector('#root'));
// registerServiceWorker();