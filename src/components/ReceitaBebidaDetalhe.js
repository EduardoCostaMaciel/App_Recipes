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

    const date = new Date().toString();

    const favoriteRecipe = {
      id,
      type: 'bebida',
      area: '',
      category: acctualyDrink.drinks[0].strCategory,
      alcoholicOrNot: acctualyDrink.drinks[0].strAlcoholic,
      name: acctualyDrink.drinks[0].strDrink,
      image: acctualyDrink.drinks[0].strDrinkThumb,
      // doneDate: date,
      // tags: acctualyDrink.drinks[0].strTags,
    };

    if (JSON.parse(localStorage.getItem('favoriteRecipes') !== null)) {
      const oldRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

      console.log(oldRecipes);

      const newRecipes = [...oldRecipes, favoriteRecipe];

      console.log('New Recipe', newRecipes);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipe]));
    }

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
        strDrinkThumb,
      } = acctualyDrink.drinks[0];

      const drinkRendering = acctualyDrink.drinks[0];

      const ingredients = [
        `${drinkRendering.strIngredient1} ${drinkRendering.strMeasure1}`,
        `${drinkRendering.strIngredient2} ${drinkRendering.strMeasure2}`,
        `${drinkRendering.strIngredient3} ${drinkRendering.strMeasure3}`,
        `${drinkRendering.strIngredient4} ${drinkRendering.strMeasure4}`,
        `${drinkRendering.strIngredient5} ${drinkRendering.strMeasure5}`,
        `${drinkRendering.strIngredient6} ${drinkRendering.strMeasure6}`,
        `${drinkRendering.strIngredient7} ${drinkRendering.strMeasure7}`,
        `${drinkRendering.strIngredient8} ${drinkRendering.strMeasure8}`,
        `${drinkRendering.strIngredient9} ${drinkRendering.strMeasure9}`,
        `${drinkRendering.strIngredient10} ${drinkRendering.strMeasure10}`,
        `${drinkRendering.strIngredient11} ${drinkRendering.strMeasure11}`,
        `${drinkRendering.strIngredient12} ${drinkRendering.strMeasure12}`,
        `${drinkRendering.strIngredient13} ${drinkRendering.strMeasure13}`,
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
