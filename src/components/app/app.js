import React, { useState, useEffect } from 'react';

import query from './../../server';

import HomePage from './../home-page';
import AddPage from './../add-page';
import EditPage from './../edit-page';
import DeletePage from './../delete-page';

const App = ({
  setCategoriesListAction,
  categoriesList
}) => {

  const [ id, setId ] = useState(null);
  const [ view, setView ] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  function changeView(view, e, id) {
    if(e !== undefined) { 
      e.preventDefault(); 
    }
    let newId = id !== undefined ? id : null;
    setView(view);
    setId(newId);
  }
  async function getCategories() {
    let options = {
      lexicon: 'get_categories'
    };

    const response = await query({ data: options });
    setView('game');
    setCategoriesListAction(response);
    setId(null);

  }
  if (!categoriesList) {
    return null;
  }

  if(view === 'game') {
    return <HomePage changeView={changeView} />;
  } else if(view === 'add') {
    return <AddPage changeView={changeView} getCategories={getCategories} />;
  } else if(view === 'edit') {
    return <EditPage id={id} changeView={changeView} />;
  } else if(view === 'delete') {
    return <DeletePage id={id} changeView={changeView} getCategories={getCategories} />;
  } else {
    return <div className="loading"><img src="images/preloader.gif" alt="" /></div>;
  }
};


export default App;
