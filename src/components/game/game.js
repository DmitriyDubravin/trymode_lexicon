import React, { useState, useEffect } from 'react';
import { queryData } from './../../queries';
import { Button } from './../forms';
import { BtnIconEdit, BtnIconDelete } from './../icons';

const Game = ({
  chosenCategory,
  changeView
}) => {

  const [ initialList, setInitialList ] = useState(null);
  const [ filteredList, setFilteredList ] = useState(null);
  const [ isDefinitionOpen, setIsDefinitionOpen ] = useState(false);
  const [ current, setCurrent ] = useState(null);

  useEffect(() => {
    setInitialList(null);
    getList();
  }, [ chosenCategory ]);

  async function getList() {
    const initialList = await queryData(chosenCategory);
    setInitialList(initialList);
    resetList(initialList);
  }

  function filterList() {
    const list = filteredList.filter(({id}) => id !== current.id);
    resetList(list);
  }

  function resetList(data) {
    setFilteredList(data);
    setIsDefinitionOpen(false);
    setCurrent(calcCurrent(data));
  }

  function definitionHandler() {
    setIsDefinitionOpen(true);
  }
  function resetHandler() {
    resetList(initialList);
  }

  function calcCurrent(arr) {
    if (!arr.length) {
      return null;
    }
    return arr[Math.floor(Math.random() * arr.length)];
  }

  if (!initialList) {
    return <div className="loading"><img src="images/preloader.gif" alt="" /></div>;
  }

  if (!current) {
    return (
      <div className="centered">
        <p className="note">All items were shown</p>
        <div className="buttons">
          <Button onClick={resetHandler} value={'Again'} />
        </div>
      </div>
    );
  }

  const left = filteredList.length - 1 === 0 ? 'last one' : filteredList.length + ' left';

  return (
    <div>
      <div className="tools2">
        <div className="left">{left}</div>
        <BtnIconEdit onClick={e => changeView('edit', current.id)} />
        <BtnIconDelete onClick={e => changeView('delete', current.id)} />
      </div>
      <div className="term">{current.term}</div>
      {
        isDefinitionOpen ? (
          <div className="definition">
            <p>{current.definition}</p>
            <div className="buttons">
              <button onClick={filterList}>Next</button>
            </div>
          </div>
        ) : (
          <div className="buttons">
            <Button className={'alert'} onClick={definitionHandler} value={'Forgot'} />
            <Button className={'success'} onClick={filterList} value={'Remember'} />
          </div>
        )
      }
    </div>
  );
};

export default Game;