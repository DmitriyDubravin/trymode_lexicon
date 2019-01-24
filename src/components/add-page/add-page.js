import React, { useState } from 'react';
import { queryAddTerm } from './../../queries';
import { Select, Input, Textarea, Button } from './../forms';
import { BtnIconBack } from './../icons';

const AddPage = ({
  changeView,
  getCategories,
  categoriesList
}) => {

  const [ error, setError ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ newCategory, setNewCategory ] = useState('');
  const [ term, setTerm ] = useState('');
  const [ definition, setDefinition ] = useState('');

  function submitHandler(e) {
    e.preventDefault();
    if (category === 'Select category' && newCategory === '') {
      setError('Error: Choose category or add new one');
    } else if(term === '' || definition === '') {
      setError('Error: Fill in "Term" and "Definition" fields');
    } else {
      let cat = newCategory !== '' ? newCategory : category;
      queryAddTerm(cat, term, definition);
      getCategories();
    }
  }

  return (
    <div className="wrapper">
      <BtnIconBack onClick={() => changeView('game')} className='back' />
      <form onSubmit={submitHandler}>
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
    </div>
  );
};

export default AddPage;
