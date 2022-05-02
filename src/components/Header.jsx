import React from 'react';
import '../css/Header.css';

const Header = () => {
  return (
    <div className='header'>
      <div className='title'><h1>Compara Ingredientes</h1></div>
      <div className='description'>
        <p>Você deve colocar os Ingredientes dos dois Items a serem comparados, separados por vírgula, dentro da caixa de texto. Depois é escolher se quer os ingredientes iguais ou diferentes, e clicar em "Comparar"</p>
      </div>
    </div>
  );
};

export default Header;