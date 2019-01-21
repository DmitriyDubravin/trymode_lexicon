import React, { useState } from 'react';
import Game from './../game';
import { Select } from './../forms';

const HomePage = ({
  categoriesList,
  changeView
}) => {

  const [ category, setCategory ] = useState('');

  return (
    <div className="wrapper">
      <div className="tools">
        <button onClick={() => changeView('add')}>
          <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
      </div>
      <form>
        <Select
          placeholder={'Select category'}
          list={categoriesList}
          chosen={category}
          onChange={setCategory}
        />
      </form>
      {category && <Game
        chosenCategory={category}
        changeView={changeView}
      />}
    </div>
  );
};

export default HomePage;
