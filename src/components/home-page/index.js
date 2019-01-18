import { compose } from 'redux';
import { connect as withStore } from 'react-redux';
import storeProps from './connector';
import HomePage from './home-page';

export default compose(
  withStore(...storeProps)
)(HomePage);