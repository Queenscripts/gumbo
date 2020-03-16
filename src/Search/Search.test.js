import React from 'react'
import ReactDOM from 'react-dom'
import Recipes from '../Recipes/Recipes'
import Search from './Search'
import {BrowserRouter} from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const results=[]
  const getRecipe = (e) => {
    e.preventDefault();
    if (navigator.onLine === false) {
      alert("You are offline, cannot search for recipes now")
    } else {
      const ingredients = e.target.elements.ingredients.value
      fetch(`${config.API_ENDPOINT}/recipes`)
        .then(response => response.json())
        .then(data => {
          const recipeRow = []
          const nomatch = []
          // LOOP THRU RECIPES ARRAY
          data.map(
            data => {
              const searchedData = data.ingredients.indexOf(ingredients)
              if (searchedData > -1) {
                const recipeRows = <Recipes key={data.id} recipe={data} addRecipe={this.addRecipe} />
                recipeRow.push(recipeRows)
                this.setState({ recipes: recipeRow })
              }
              else {
                nomatch.push('no')
              }
            }
          )
          if (nomatch.length === data.length) {
            alert('No recipe was found, search another ingredient!')
          }
          return;
      })
      e.target.reset();
    }
   }
  ReactDOM.render(
  <BrowserRouter >
    <Search
      getRecipe={getRecipe}
      results={results}
    />
  </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})