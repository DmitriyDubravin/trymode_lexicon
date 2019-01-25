import React from 'react';
import src from './../../assets/preloader.gif';

const Preloader = () => {
  return <div className="loading"><img src={src} alt="" /></div>;
};

export default Preloader;