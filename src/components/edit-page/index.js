import { compose } from 'redux';
import { connect as withStore } from 'react-redux';
import storeProps from './connector';
import EditPage from './edit-page';

export default compose(
  withStore(...storeProps)
)(EditPage);