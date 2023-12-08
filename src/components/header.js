import React from 'react';
import logo from '../pokedex.png'

const Header = () => {
  return (
    <header>
      <img src={logo} alt='Logo pokedex'></img>
    </header>
  );
};

export default Header;