import React from 'react'
import ReactDOM from 'react-dom'
import EditRecipe from './EditRecipe'
import {BrowserRouter} from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BrowserRouter ><EditRecipe /></BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})