import React, { useState, useEffect } from 'react';
import { queryData } from './../../queries';

const Game = ({
  chosenCategory: defaultChosenCategory,
  changeView
}) => {

  const [ chosenCategory, setChosenCategory ] = useState(defaultChosenCategory);
  const [ initialData, setInitialData ] = useState(null);
  const [ filteredData, setFilteredData ] = useState(null);
  const [ definition, setDefinition ] = useState(false);
  const [ current, setCurrent ] = useState(null);
  const [ id, setId ] = useState(null);

  useEffect(() => {
    getData();
  }, [ defaultChosenCategory ]);

  useEffect(() => {
    setChosenCategory(chosenCategory);
  }, [ chosenCategory ]);

  async function getData() {

    const data = await queryData(chosenCategory);
    const current = calcShowingItemIndex(data);
    const id = data[current].id;

    setInitialData(data);
    setFilteredData(data);
    setDefinition(false);
    setCurrent(current);
    setId(id);

  }

  function calcShowingItemIndex(itemsArray) {
    return itemsArray.length < 1 ? null : itemsArray.length > 1 ? Math.floor(Math.random() * itemsArray.length) : 0;
  }

  function resetHandler() {
    let current = calcShowingItemIndex(initialData);
    let id = initialData[current].id;
    setFilteredData(initialData);
    setDefinition(false);
    setCurrent(current);
    setId(id);
  }

  function rememberHandler() {
    let newBornData = filteredData.filter((item, i) => i !== current);
    let current = calcShowingItemIndex(newBornData);
    let id = newBornData.length > 0 ? newBornData[current].id : null;
    setFilteredData(newBornData);
    setDefinition(false);
    setCurrent(current);
    setId(id);
  }

  function definitionHandler() {
    setDefinition(true);
  }



  if(filteredData !== null) {
    if(current !== null) {
      let left = filteredData.length - 1;
      left = left === 0 ? 'last one' : left + ' left';
      return (
        <div>
          <div className="term">{filteredData[current].term}</div>
          {
            definition &&
              <div className="definition">
                <p>{filteredData[current].definition}</p>
                <div className="buttons">
                  <button onClick={rememberHandler}>Next</button>
                </div>
              </div>
          }
          {definition || <div className="buttons">
            <button className="alert" onClick={definitionHandler}>Forgot</button>
            <button className="success" onClick={rememberHandler}>Remember</button>
          </div>}
          <div className="tools2">
            <div className="left">{left}</div>
            {id && <button onClick={e => changeView('edit', e, id)} href="#"><svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg></button>}
            {id && <button onClick={e => changeView('delete', e, id)} href="#"><svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg></button>}
          </div>
        </div>
      );
    } else {
      return (
        <div className="centered">
          <p className="note">All items were shown</p>
          <div className="buttons">
            <button onClick={resetHandler}>Again</button>
          </div>
        </div>
      );
    }
  } else {
    return <div className="loading"><img src="images/preloader.gif" alt="" /></div>;
  }
};

export default Game;