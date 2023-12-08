import React from 'react';
import Header from './components/header';
import Main from './components/main';
import SearchBar from './components/searchbar'

function App() {
  return (
    <div className="body">
      <Header />
      {/* <SearchBar/> */}
      <Main />
    </div>
  );
}

export default App;
