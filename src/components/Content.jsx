import React, { useState } from 'react';
import '../css/Content.css';

const Content = () => {
  const [comparisonType, setComparisonType] = useState('compareEquals'); 
  const [ingredientes1, setIngredients] = useState('');
  const [ingredientes2, setIngredients2] = useState('');
  const [tableTitle, setTableTitle] = useState('');

  const [showTable, setShowTable] = useState(false);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  

  const handleSelectChange = ({ target: { value } }) => {
    setComparisonType(value);
  }

  const handleInputChange = ({ target }) => {
    const { id, value } = target;
    
    if (id === 'ig1') {
      setIngredients(value);
    } else {
      setIngredients2(value);
    }
  }

  const formatIngredientString = (ingredients) => {
    const ingredientsByComma = ingredients.split(',');
    const ingredientsByCommaFormated = ingredientsByComma
          .map(item => item.trim().toLocaleLowerCase());
    return ingredientsByCommaFormated;
  }

  const getDifferentIngredients = (ing, arrayIng) => {
    const ingredientsByComma = formatIngredientString(ing);
    const differentsIngredients1 = arrayIng.filter(ing => !ingredientsByComma.includes(ing.toLocaleLowerCase()));
    const differentsIngredients2 = ingredientsByComma.filter(ing => !arrayIng.includes(ing.toLocaleLowerCase()));

    const alldifferentsIngredients = differentsIngredients1.concat(differentsIngredients2);

    return [... new Set(alldifferentsIngredients)];

  }

  const handleClick = () => {
    const ingredients1ByComma = formatIngredientString(ingredientes1);

    const equalsIngredients = [];
    let differentsIngredients = []
    if (comparisonType === 'compareEquals') {
      ingredients1ByComma.forEach(ingredient => {
        if (ingredientes2.toLocaleLowerCase().includes(ingredient.toLowerCase())) {
          equalsIngredients.push(ingredient);
        }
      });
      setArrayIngredients(equalsIngredients);
      setTableTitle("Ingredientes Iguais")
    } else if (comparisonType === 'compareDifferents'){
      differentsIngredients = getDifferentIngredients(ingredientes2, ingredients1ByComma);
      setArrayIngredients(differentsIngredients);
      setTableTitle("Ingredientes Diferentes")
    }
    setShowTable(true);
  };

  const handleClickClean = () => {
    setIngredients('');
    setIngredients2('')
    setShowTable(false);
  }

  const capitalize = str => {
    if (typeof str !== 'string') {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.substr(1);
  }

  console.log(arrayIngredients);


  return (
    <div className='main'>
      <textarea
        type="text"
        placeholder='Digite os ingredientes do 1º item'
        className='get-ingredients'
        wrap="hard"
        id='ig1'
        onChange={ handleInputChange }
        value={ ingredientes1 }
      />
      <textarea
        type="text"
        placeholder='Digite os ingredientes do 2º item'
        className='get-ingredients'
        wrap="hard"
        id='ig2'
        onChange={ handleInputChange }
        value={ ingredientes2 }
      />
      <select
        onChange={ handleSelectChange }
        defaultValue={ comparisonType }
        className='comparison-type'
      >
        <option value="compareEquals">Obter Ingredientes Semelhantes</option>
        <option value="compareDifferents">Obter Ingredientes Diferentes</option>
      </select>

      <div className='buttons'>
        <button
          className='compare-button'
          onClick={ handleClick }
        >
          Comparar
        </button>
        <button
        className='compare-button'
        style={ { backgroundColor: '#7cf863' } }
        onClick={ handleClickClean }
        >
        Limpar
        </button>
      </div>
      <table className= { showTable === false ? 'hidden' : 'showned'}>
        <thead>
          <th>
            { tableTitle }
          </th>
        </thead>
        <tbody>
          { arrayIngredients && arrayIngredients.map((ing) => (
            <tr key={ ing }>
              <td>{ capitalize(ing) }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Content;