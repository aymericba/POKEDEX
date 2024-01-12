import React from 'react';
import logo from '../pokedex.png'
import './main.css'
const Header = () => {
  return (
    <header className='header.flex'>
      <img src={logo} className='img' alt='Logo pokedex'></img>
    </header>
  );
};

export default Header;