import React, { useState, useEffect } from 'react';
import { queryItem, queryEditTerm } from './../../queries';
import { Select, Input, Textarea, Button } from './../forms';

const EditPage = ({
  id,
  changeView,
  categoriesList
}) => {

  const [ category, setCategory ] = useState('');
  const [ newCategory, setNewCategory ] = useState('');
  const [ term, setTerm ] = useState('');
  const [ definition, setDefinition ] = useState('');
  const [ error, setError ] = useState('');

  useEffect(() => {
    getItem();
  }, []);

  async function getItem() {
    const data = await queryItem(id);
    setCategory(data[0].category);
    setTerm(data[0].term);
    setDefinition(data[0].definition);
  }

  function submitHandler(e) {
    e.preventDefault();
    if(term === '' || definition === '') {
      setError('Error: Fill in "Term" and "Definition" fields');
    } else {
      let cat = newCategory !== '' ? newCategory : category;
      editTerm(cat, term, definition, id);
      changeView('game');
    }
  }

  async function editTerm(category, term, definition, id) {
    await queryEditTerm(id, category, term, definition);
  }

  if(term) {
    return (
      <div className="wrapper">
        <div className="back"><button onClick={e => changeView('game', e)}><svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/></svg></button></div>
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
              placeholder="or add new category"
              value={newCategory}
              onChange={setNewCategory}
            />
          </div>
          <div>
            <Input
              value={term}
              onChange={setTerm}
            />
          </div>
          <div>
            <Textarea
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
  } else {
    return <div className="loading"><img src="images/preloader.gif" alt="" /></div>;
  }
};

export default EditPage;