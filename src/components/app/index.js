import { compose } from 'redux';
import { connect as withStore } from 'react-redux';
import storeProps from './connector';
import App from './app';

export default compose(
  withStore(...storeProps)
)(App);