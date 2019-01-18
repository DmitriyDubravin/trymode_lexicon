import React from 'react';
import {render} from 'react-snapshot';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { Provider } from 'react-redux';

import store from './store';
import './App.css';

import App from './components/app';

// troubles
// after adding new term categories are not reloading
// after deleting last term of category error...
// no categories reload after new term added

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);