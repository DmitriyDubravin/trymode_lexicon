import { setCategoriesListAction } from './../../store/actions-creators';

export default [
  state => ({
    categoriesList: state.categoriesList
  }),
  dispatch => ({
    setCategoriesListAction(payload) {
      dispatch(setCategoriesListAction(payload));
    }
  })
];
