import React from 'react'
import ReactDOM from 'react-dom'
import EditRecipe from './EditRecipe'
import {BrowserRouter} from 'react-router-dom'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import App from '../App'
describe('EditRecipe Component', () => { 
  const state = {
  
      savedRecipeInfo:[]

  }
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter >
       <Switch>
         <App>
         <EditRecipe  
         {...state}
            savedRecipeInfo={state.savedRecipeInfo}
            
          />
         </App>
       </Switch>
    </BrowserRouter>
    , div)
  ReactDOM.unmountComponentAtNode(div)
});
});