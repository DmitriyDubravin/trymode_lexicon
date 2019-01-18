import actions from './actions';

export const categoriesList = (state = null, { type, payload }) => {
  switch (type) {
  case actions.setCategoriesList:
    return [ ...payload ];
  default:
    return state;
  }
};