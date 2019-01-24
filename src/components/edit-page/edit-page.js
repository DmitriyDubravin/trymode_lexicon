import React, { useState, useEffect } from 'react';
import { queryItem, queryEditTerm } from './../../queries';
import { Select, Input, Textarea, Button } from './../forms';
import { BtnIconBack } from './../icons';

const EditPage = ({
  changeView,
  getCategories,
  categoriesList,
  id
}) => {

  const [ error, setError ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ newCategory, setNewCategory ] = useState('');
  const [ term, setTerm ] = useState('');
  const [ definition, setDefinition ] = useState('');

  useEffect(() => {
    getItem();
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    if (category === 'Select category' && newCategory === '') {
      setError('Error: Choose category or add new one');
    } else if(term === '' || definition === '') {
      setError('Error: Fill in "Term" and "Definition" fields');
    } else {
      let cat = newCategory !== '' ? newCategory : category;
      queryEditTerm(id, cat, term, definition);
      getCategories();
    }
  }

  async function getItem() {
    const data = await queryItem(id);
    setCategory(data[0].category);
    setTerm(data[0].term);
    setDefinition(data[0].definition);
  }

  if(!term) {
    return <div className="loading"><img src="images/preloader.gif" alt="" /></div>;
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
          <Button value={'Edit'} />
        </div>
      </form>
    </div>
  );
};

export default EditPage;
