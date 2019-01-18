import React from 'react';
import query from './../../server';

const DeletePage = ({
  id,
  changeView,
  getCategories
}) => {

  async function deleteTerm(e) {
    e.preventDefault();
    let options = {
      lexicon: 'delete_term',
      id: id
    };

    await query({ data: options });
    getCategories();

  }

  return (
    <div className="wrapper">
      <div className="back"><button onClick={e => changeView('game', e)}><svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/></svg></button></div>
      <p className="note">Delete? Are you sure?</p>
      <div className="buttons">
        <button onClick={e => deleteTerm(e)} className="alert">Yes</button>
      </div>
    </div>
  );
};

export default DeletePage;
