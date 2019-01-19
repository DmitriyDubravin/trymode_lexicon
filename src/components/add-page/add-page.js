import React, { useState } from 'react';
import query from './../../server';
import Select from './../select';
import { handleFormEventValue } from './../../functions';

const AddPage = ({
  categoriesList = [],
  changeView,
  getCategories
}) => {

  const [ error, setError ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ newCategory, setNewCategory ] = useState('');
  const [ term, setTerm ] = useState('');
  const [ definition, setDefinition ] = useState('');

  function addHandler(e) {
    e.preventDefault();
    if(category === 'Select category' && newCategory === '') {
      setError('Error: Choose category or add new one');
    } else if(term === '' || definition === '') {
      setError('Error: Fill in "Term" and "Definition" fields');
    } else {
      let cat = newCategory !== '' ? newCategory : category;
      addTerm(cat, term, definition);
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

  const handleCategory = e => setCategory(handleFormEventValue(e));
  const handleNewCategory = e => setNewCategory(handleFormEventValue(e));
  const handleTerm = e => setTerm(handleFormEventValue(e));
  const handleDefinition = e => setDefinition(handleFormEventValue(e));

  return (
    <div className="wrapper">
      <form onSubmit={addHandler}>
        {error && <div className="msg alert">{error}</div>}
        <div>
          <Select
            placeholder={'Select category'}
            list={categoriesList}
            chosen={category}
            set={handleCategory}
          />
          <input onChange={handleNewCategory} value={newCategory} type="text" placeholder="or add new category" />
        </div>
        <div>
          <input onChange={handleTerm} value={term} type="text" placeholder="term" />
        </div>
        <div>
          <textarea onChange={handleDefinition} value={definition} placeholder="definition"></textarea>
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
