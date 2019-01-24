import React, { useState } from 'react';
import Game from './../game';
import { Select } from './../forms';
import { BtnIconAdd } from './../icons';

const HomePage = ({
  categoriesList,
  changeView
}) => {

  const [ chosenCategory, setChosenCategory ] = useState('');

  return (
    <div className="wrapper">
      <div className="tools">
        <BtnIconAdd onClick={() => changeView('add')} />
      </div>
      <Select
        placeholder={'Select category'}
        list={categoriesList}
        chosen={chosenCategory}
        onChange={setChosenCategory}
      />
      {chosenCategory && <Game
        chosenCategory={chosenCategory}
        changeView={changeView}
      />}
    </div>
  );
};

export default HomePage;
