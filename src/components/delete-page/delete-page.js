import React from 'react';
import { queryDeleteTerm } from './../../queries';
import { Button } from './../forms';
import { BtnIconBack } from './../icons';

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
      <BtnIconBack onClick={() => changeView('game')} className='back' />
      <p className="note">Delete? Are you sure?</p>
      <div className="buttons">
        <Button onClick={() => deleteTerm()} className="alert" value="Yes" />
      </div>
    </div>
  );
};

export default DeletePage;
