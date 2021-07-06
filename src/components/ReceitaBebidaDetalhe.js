import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import RecomendacoesCard from './RecomendacoesCard';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/DetalhesPaginas.css';
import { btn } from '../styles/login';

const copy = require('clipboard-copy');

function ReceitaBebidaDetalhe({ props }) {
  const [clipboardStatus, setClipboardStatus] = useState();
  const [favoriteDrink, setFavoriteDrink] = useState(false);

  const history = useHistory();

  const { acctualyDrink, drinkRecomendation, id } = props;

  const shareClick = (e) => {
    e.preventDefault();
    const { location: { pathname } } = history;

    copy(`http://localhost:3000${pathname}`);
    setClipboardStatus('copied');
  };

  const favoriteClick = (e) => {
    e.preventDefault();

    return !favoriteDrink ? setFavoriteDrink(true) : setFavoriteDrink(false);
  };

  const handleClick = (e) => {
    e.preventDefault();

    history.push(`/bebidas/${id}/in-progress`);
  };

  const createRecipe = () => {
    if (acctualyDrink) {
      const {
        strDrink,
        strAlcoholic,
        strCategory,
        strInstructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
        strMeasure9,
        strMeasure10,
        strMeasure11,
        strMeasure12,
        strMeasure13,
        strDrinkThumb,
      } = acctualyDrink.drinks[0];

      const ingredients = [
        `${strIngredient1} ${strMeasure1}`,
        `${strIngredient2} ${strMeasure2}`,
        `${strIngredient3} ${strMeasure3}`,
        `${strIngredient4} ${strMeasure4}`,
        `${strIngredient5} ${strMeasure5}`,
        `${strIngredient6} ${strMeasure6}`,
        `${strIngredient7} ${strMeasure7}`,
        `${strIngredient8} ${strMeasure8}`,
        `${strIngredient9} ${strMeasure9}`,
        `${strIngredient10} ${strMeasure10}`,
        `${strIngredient11} ${strMeasure11}`,
        `${strIngredient12} ${strMeasure12}`,
        `${strIngredient13} ${strMeasure13}`,
      ];

      return (
        <div className="recipe-container">
          <img
            alt="Produto"
            className="img-details-main"
            data-testid="recipe-photo"
            src={ strDrinkThumb }
          />

          <h2 data-testid="recipe-title">{ strDrink }</h2>

          <div>
            <button type="button" data-testid="share-btn" onClick={ shareClick }>
              <img alt="Share link" src={ shareIcon } />
            </button>
            <button type="button" onClick={ favoriteClick }>
              <img
                alt="Favorite button"
                data-testid="favorite-btn"
                src={ !favoriteDrink ? whiteHeartIcon : blackHeartIcon }
              />
            </button>
          </div>

          {!clipboardStatus ? null : (<h5>Link copiado!</h5>)}

          <p data-testid="recipe-category">{ `${strCategory} - ${strAlcoholic}` }</p>

          <ul>
            { ingredients.map((ingredient, index) => {
              console.log(ingredients);
              if (ingredient !== null
                && ingredient !== ' '
                && ingredient !== '  '
                && ingredient !== 'null null') {
                return (
                  <li
                    key={ ingredient }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { ingredient }
                  </li>);
              }
              return '';
            })}
          </ul>

          <p data-testid="instructions">{ strInstructions }</p>

          <h3>Receitas Recomendadas:</h3>

          <div className="recomendation-container">

            { drinkRecomendation.map((drink, index) => {
              const cardLength = 5;
              if (index <= cardLength) {
                return (
                  <RecomendacoesCard
                    key={ drink.idDrink }
                    props={ drink }
                    type="drink"
                    index={ index }
                  />
                );
              }
              return null;
            }) }
          </div>

          <Button
            variant="success"
            type="button"
            onClick={ handleClick }
            data-testid="start-recipe-btn"
            className={ `${btn} button-recipe` }
          >
            Start recipe
          </Button>
        </div>
      );
    }
    return null;
  };

  return createRecipe();
}

export default ReceitaBebidaDetalhe;
