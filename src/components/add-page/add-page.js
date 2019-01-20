import React, { useState } from 'react';
import { queryAddTerm } from './../../queries';
import { Select, Input, Textarea, Button } from './../forms';

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

  async function addHandler(e) {
    e.preventDefault();
    if(category === 'Select category' && newCategory === '') {
      setError('Error: Choose category or add new one');
    } else if(term === '' || definition === '') {
      setError('Error: Fill in "Term" and "Definition" fields');
    } else {
      let cat = newCategory !== '' ? newCategory : category;
      await queryAddTerm(cat, term, definition);
      getCategories();
    }
  }

  return (
    <div className="wrapper">
      <form onSubmit={addHandler}>
        {error && <div className="msg alert">{error}</div>}
        <div>
          <Select
            placeholder={'Select category'}
            list={categoriesList}
            chosen={category}
            onChange={setCategory}
          />
          <Input
            placeholder={'or add new category'}
            value={newCategory}
            onChange={setNewCategory}
          />
        </div>
        <div>
          <Input
            placeholder={'term'}
            value={term}
            onChange={setTerm}
          />
        </div>
        <div>
          <Textarea
            placeholder={'definition'}
            value={definition}
            onChange={setDefinition}
          />
        </div>
        <div className="centered">
          <Button value={'Add'} />
        </div>
      </form>
      <div className="back"><button onClick={e => changeView('game', e)}><svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/></svg></button></div>
    </div>
  );
};

export default AddPage;
