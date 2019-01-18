import React, { useState, useEffect } from 'react';
import query from './../../server';

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
    let options = {
      lexicon: 'get_item',
      id: id
    };
    const data = await query({ data: options });
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
    let options = {
      lexicon: 'edit_term',
      id: id,
      category: category,
      term: term,
      definition: definition
    };

    await query({ data: options });

  }


  function handleCategory(e) {
    const { value } = e.target;
    setCategory(value);
  }
  function handleNewCategory(e) {
    const { value } = e.target;
    setNewCategory(value);
  }
  function handleTerm(e) {
    const { value } = e.target;
    setTerm(value);
  }
  function handleDefinition(e) {
    const { value } = e.target;
    setDefinition(value);
  }

  if(term) {
    return (
      <div className="wrapper">
        <div className="back"><button onClick={e => changeView('game', e)}><svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/></svg></button></div>
        <form onSubmit={submitHandler}>
          {error && <div className="msg alert">{error}</div>}
          <div>
            <select onChange={handleCategory} value={category}>
              {categoriesList.map((item, i) => <option key={i}>{item}</option>)}
            </select>
            <input onChange={handleNewCategory} placeholder="or add new category" type="text" />
          </div>
          <div>
            <input onChange={handleTerm} value={term} type="text" />
          </div>
          <div>
            <textarea onChange={handleDefinition} value={definition}></textarea>
          </div>
          <div className="centered">
            <input type="submit" value="Edit" />
          </div>
        </form>
      </div>
    );
  } else {
    return <div className="loading"><img src="images/preloader.gif" alt="" /></div>;
  }
};

export default EditPage;