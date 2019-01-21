import React from 'react';
import { queryDeleteTerm } from './../../queries';
import { Button } from './../forms';
import ButtonBack from './../button-back';

const DeletePage = ({
  id,
  changeView,
  getCategories
}) => {

  function deleteTerm() {
    queryDeleteTerm(id);
    getCategories();
  }

  return (
    <div className="wrapper">
      <ButtonBack onClick={() => changeView('game')} />
      <p className="note">Delete? Are you sure?</p>
      <div className="buttons">
        <Button onClick={() => deleteTerm()} className="alert">Yes</Button>
      </div>
    </div>
  );
};

export default DeletePage;
