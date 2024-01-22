import React from 'react';
import Header from './components/header';
import Main from './components/main';
import { PokemonProvider } from './PokemonContext.js';
import './App.css';
import './components/header.css';
import './components/main.css';

function App() {
  return (
    <PokemonProvider>
      <div className="App">
        <Header />
        <Main />
      </div>
    </PokemonProvider>
  );
}

export default App;
