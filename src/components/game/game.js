import React, { useState, useEffect } from 'react';
import { queryData } from './../../queries';

const Game = ({
  chosenCategory,
  changeView
}) => {

  const [ initialList, setInitialList ] = useState(null);
  const [ filteredList, setFilteredList ] = useState(null);
  const [ definitionIsOpen, setDefinitionIsOpen ] = useState(false);
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
    setDefinitionIsOpen(false);
    setCurrent(calcCurrent(data));
  }

  function definitionHandler() {
    setDefinitionIsOpen(true);
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
          <button onClick={resetHandler}>Again</button>
        </div>
      </div>
    );
  }


  let left = filteredList.length - 1;
  left = left === 0 ? 'last one' : left + ' left';

  return (
    <div>
      <div className="tools2">
        <div className="left">{left}</div>
        <button onClick={e => changeView('edit', e, current.id)} href="#">
          <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
        <button onClick={e => changeView('delete', e, current.id)} href="#">
          <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
      </div>
      <div className="term">{current.term}</div>
      {
        definitionIsOpen ? (
          <div className="definition">
            <p>{current.definition}</p>
            <div className="buttons">
              <button onClick={filterList}>Next</button>
            </div>
          </div>
        ) : (
          <div className="buttons">
            <button className="alert" onClick={definitionHandler}>Forgot</button>
            <button className="success" onClick={filterList}>Remember</button>
          </div>
        )
      }
    </div>
  );
};

export default Game;