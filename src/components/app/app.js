import React, { useState, useEffect } from 'react';
import { queryGetCategories } from './../../queries';

import HomePage from './../home-page';
import AddPage from './../add-page';
import EditPage from './../edit-page';
import DeletePage from './../delete-page';
import Preloader from './../preloader';



const App = ({
  setCategoriesListAction,
  categoriesList
}) => {

  const [ id, setId ] = useState(null);
  const [ view, setView ] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  function changeView(view, id) {
    let newId = id !== undefined ? id : null;
    setView(view);
    setId(newId);
  }
  async function getCategories() {

    const response = await queryGetCategories();
    if (response) {
      setView('game');
      setCategoriesListAction(response);
      setId(null);
    }

  }
  if (!categoriesList) {
    return null;
  }

  switch (view) {
  case 'game':
    return <HomePage changeView={changeView} />;
  case 'add':
    return <AddPage changeView={changeView} getCategories={getCategories} />;
  case 'edit':
    return <EditPage id={id} changeView={changeView} getCategories={getCategories} />;
  case 'delete':
    return <DeletePage id={id} changeView={changeView} getCategories={getCategories} />;
  default:
    return <Preloader />;
  }
};


export default App;
