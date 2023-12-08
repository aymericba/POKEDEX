import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainContent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://pokedex-api.3rgo.tech/';
    
    axios.get(apiUrl)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erreur de requête API', error);
      });
  }, []);

  return (
    <main>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </main>
  );
};

export default MainContent;
