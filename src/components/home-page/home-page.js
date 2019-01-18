import React, { useState } from 'react';
import Game from './../game';
import Select from './../select';

const HomePage = ({
  categoriesList,
  changeView
}) => {

  const [ chosenCategory, setChosenCategory ] = useState(null);

  function setCategory(e) {
    const { value } = e.target;
    let chosenCategory = value !== 'Select category' ? value : null;
    setChosenCategory(chosenCategory);
  }

  return (
    <div className="wrapper">
      <form>
        <Select
          placeholder={'Select category'}
          list={categoriesList}
          chosen={chosenCategory}
          set={setCategory}
        />
      </form>
      {chosenCategory && <Game
        chosenCategory={chosenCategory}
        changeView={changeView}
      />}
      <div className="tools">
        <button onClick={e => changeView('add', e)}><svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/> </svg></button>
      </div>
    </div>
  );
};

export default HomePage;
