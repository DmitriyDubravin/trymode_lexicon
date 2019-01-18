import React, { useState } from 'react';
import query from './../../server';

const AddPage = ({
  categoriesList,
  changeView,
  getCategories
}) => {

  const [ error, setError ] = useState(null);

  function addHandler(e, obj) {
    e.preventDefault();
    if(obj.category.value === 'Select category' && obj.newCategory.value === '') {
      setError('Error: Choose category or add new one');
    } else if(obj.term.value === '' || obj.definition.value === '') {
      setError('Error: Fill in "Term" and "Definition" fields');
    } else {
      let category = obj.category.value;
      if(obj.newCategory.value !== '') {
        category = obj.newCategory.value;
      }
      let term = obj.term.value;
      let definition = obj.definition.value;
      addTerm(category, term, definition);
      getCategories();
    }
  }

  async function addTerm(category, term, definition) {

    const options = {
      lexicon: 'add_term',
      category: category,
      term: term,
      definition: definition
    };

    await query({ data: options });

  }

  return (
    <div className="wrapper">
      <form onSubmit={e => addHandler(e, this)}>
        {error && <div className="msg alert">{error}</div>}
        <div>
          <select ref={category => (this.category = category)}>
            <option>Select category</option>
            {categoriesList.map((item, i) => <option key={i}>{item}</option>)}
          </select>
          <input ref={newCategory => (this.newCategory = newCategory)} type="text" placeholder="or add new category" />
        </div>
        <div>
          <input ref={term => (this.term = term)} type="text" placeholder="term" />
        </div>
        <div>
          <textarea ref={definition => (this.definition = definition)} placeholder="definition"></textarea>
        </div>
        <div className="centered">
          <input type="submit" value="Add" />
        </div>
      </form>
      <div className="back"><button onClick={e => changeView('game', e)}><svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/></svg></button></div>
    </div>
  );
};

export default AddPage;
