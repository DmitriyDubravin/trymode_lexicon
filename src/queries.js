import query from './server';
import { getType } from './functions';

export const queryGetCategories = () => {
  return query({
    data: {
      lexicon: 'get_categories'
    }
  });
};

export const queryData = category => {
  return query({
    data: {
      lexicon: 'get_data',
      category,
    }
  });
};

export const queryItem = id => {
  return query({
    data: {
      lexicon: 'get_item',
      id,
    }
  });
};

export const queryAddTerm = (category, term, definition) => {

  if (getType(category) !== 'String') {
    throw new Error('"Category" parameter should be "String" ! \n');
  }
  if (category.length === 0) {
    throw new Error('"Category" argument should not be empty ! \n');
  }
  if (getType(term) !== 'String') {
    throw new Error('"Term" parameter should be "String" ! \n');
  }
  if (term.length === 0) {
    throw new Error('"Term" argument should not be empty ! \n');
  }
  if (getType(definition) !== 'String') {
    throw new Error('"Definition" parameter should be "String" ! \n');
  }
  if (definition.length === 0) {
    throw new Error('"Definition" argument should not be empty ! \n');
  }

  query({
    data: {
      lexicon: 'add_term',
      category,
      term,
      definition
    }
  });
};

export const queryEditTerm = (id, category, term, definition) => {
  query({
    data: {
      lexicon: 'edit_term',
      id: id,
      category,
      term,
      definition
    }
  });
};

export const queryDeleteTerm = id => {
  query({
    data: {
      lexicon: 'delete_term',
      id
    }
  });
};
