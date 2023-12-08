import React from 'react';
import logo from '../pokedex.png'
import './main.css'
const Header = () => {
  return (
    <header class='header.flex'>
      <img src={logo} class='img' alt='Logo pokedex'></img>
    </header>
  );
};

export default Header;