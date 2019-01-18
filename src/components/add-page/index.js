import { compose } from 'redux';
import { connect as withStore } from 'react-redux';
import storeProps from './connector';
import AddPage from './add-page';

export default compose(
  withStore(...storeProps)
)(AddPage);