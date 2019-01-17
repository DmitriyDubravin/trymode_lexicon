import App from './app';
import { compose } from 'redux';
import { connect as withStore } from 'react-redux';
import storeProps from './connector';

console.log(storeProps);

export default compose(
    withStore(...storeProps)
)(App);