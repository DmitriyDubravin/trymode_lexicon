import query from './server';

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
  return query({
    data: {
      lexicon: 'delete_term',
      id
    }
  });
};
