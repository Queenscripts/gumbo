import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import SignUp from "./SignUp/SignUp"
import Login from "./Login/Login"
import About from "./About/About"
import Search from "./Search/Search"
import SavedSearches from './SavedSearches/SavedSearches';
import Recipes from './Recipes/Recipes';
import config from './config'
import NewRecipe from './NewRecipe/NewRecipe';
import EditRecipe from './EditRecipe/EditRecipe'

class App extends Component {
  constructor(props) {
    super(props);
    //EVENT HANDLER FOR FLAVOR PROFILE SELECTION
    this.state = {
      ingredients: [],
      flavor: [],
      recipes: [],
      email: '',
      password: '',
      savedRecipeInfo: [],
      editRecipeTitle: '',
      editRecipeIngredients: '',
      thumbnail: null,
      error: ''
    }
  this.Footer = this.Footer.bind(this)
  this.addRecipe = this.addRecipe.bind(this)
  this.updateRecipe = this.updateRecipe.bind(this)
  this.imageInput=React.createRef()
  this.titleInput=React.createRef()
  this.ingredInput=React.createRef()
  }

  updateComponentValue = (e) => {
    e.preventDefault();
    this.setState({
      editRecipeTitle: this.titleInput.current.value, 
      editRecipeIngredients: this.ingredInput.current.value, 
      thumbnail: this.imageInput.current.value
    })
  }

  //UPDATE EDIT FORM STATE

  // MAKE FETCH REQUESTS - GET, POST, PUT
  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/userrecipes`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + localStorage.getItem("authToken")
        }
      })
      .then(
        response => {
          if (!response) {
          }
          return response.json()
        }
      )
      .then((savedRecipeInfo) => {
        this.setState({ savedRecipeInfo })
      })
  }

  addRecipe = (e, recipe) => {
    e.preventDefault();
    if (localStorage.length === 0) {
      alert("You must be logged in to save recipes!")
    } else {
      // ${config.API_ENDPOINT}/userrecipes
      //add error checking refer to signup.js
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', "bearer " + localStorage.getItem("authToken"))
      const options = {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: recipe.recipe.title,
          thumbnail: recipe.recipe.thumbnail,
          ingredients: recipe.recipe.ingredients,
          recipeurl: recipe.recipe.recipeurl
        }),
      };
      const request = new Request(`${config.API_ENDPOINT}/userrecipes`, options)
      //add error checking refer to signup.js
      fetch(request)
        .then(res => {
          if (!res.ok) {
            throw res
          }
          return res.json()
        })
        .then(data => {
          alert(data.title + " saved!")
        }
        )
        .catch(
          err => {
            if (err.status === 401) {
              alert("You must login or create a signup")
            }
          }
        )
    }
  }

  updateRecipe(id, e) {
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/userrecipes/` + id, {
      method: 'PUT',
      headers: {
        "Authorization": "bearer " + localStorage.getItem("authToken"),
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json; charset=UTF-8",
        "Accept": "application/json",
        "Allow": "PUT",
        "credentials": "same-origin",
        "Access-Control-Allow-Origin": "*",
        "Connection": "keep-alive"
      },
      body: JSON.stringify({
        title: this.titleInput.current.value,
        ingredients: this.ingredInput.current.value,
        thumbnail: this.imageInput.current.value,
        recipeurl: null
      })
    })
      .then(res => res.json())
      .then((data) => {
        
          window.location.reload();
      
      })
      .catch(err => {
        if (err.status === 400) {
          this.setState({ error: "Incorrect username or password" })
        }
      })
  }
  
  getRecipe = (e) => {
    e.preventDefault();
    if (navigator.onLine === false) {
      alert("You are offline, cannot search for recipes now")
    } else {
      const ingredients = e.target.elements.ingredients.value.toLowerCase()
      fetch(`${config.API_ENDPOINT}/recipes`)
        .then(response => response.json())
        .then(data => {
          const recipeRow = []
          const uniqueRow= []
          const nomatch = []
          const searchData = []

          // LOOP THRU RECIPES ARRAY - Search Algorithm
          data.map(
            data => {
              const searchedData = data.ingredients.indexOf(ingredients)          
              const title = data.title.toLowerCase()
              const searchedDataTitle = title.indexOf(ingredients)              

              if (searchedData > -1) {
                const recipeRows = <Recipes key={data.id} recipe={data} addRecipe={this.addRecipe} />
                recipeRow.push(recipeRows)
                this.setState({ recipes: recipeRow })
              }
              if (searchedDataTitle > -1) {
                const recipeRows = <Recipes key={data.id} recipe={data} addRecipe={this.addRecipe} />
                uniqueRow.push(recipeRows)
                this.setState({ recipes: uniqueRow })
              }
              else if (searchedDataTitle === -1 || searchedData === -1){
                nomatch.push('no')
                searchData.push(searchedData)
              }
            }
          )
          if (nomatch.length === data.length && !data.map(ing=> ing.ingredients.includes(ingredients)).includes(true)) {
            alert('No recipe was found, search another ingredient!')
          }
      })
      e.target.reset();
    }
  }

  //COMPONENTS
  NavBar() {
    return (
      <nav>
        <Link to="/">
          {" "}
            About
          </Link>
        {
          !localStorage.authToken ?
            <><Link to="/signup">
              {" "}
            Sign Up
          </Link>
              <Link to="/login">
                {" "}
          Login
        </Link> </> :
            <Link to="/login">
              {" "}
            Logout
          </Link>
        }
        <Link to="/search">
          {" "}
            Search
        </Link>
        <Link to="/saved">
          {" "}
            Saved Recipes
          </Link>
        {
          localStorage.authToken &&
          <Link to='/new'>
            Add Recipes
            </Link>
        }
      </nav>
    )
  }

  MainPage() {
    return (
      <div className="main">
        <header>
          <Link to="/">
            {" "}
            <span style={{ fontSize: 60 }}>Gumbo </span><br></br><span style={{ whiteSpace: "nowrap", fontFamily: "sans-serif", fontSize: 24 }}>Feed Your Tastebuds</span>
          </Link>
          <br></br>
          <Link to="/search">
            <button className="regular-button" type="button">Find Recipes!
          </button>
          </Link>
        </header>
        <main>

          <About />
        </main>
      </div>)
  }


  Footer() {
    if (
      this.props.location.pathname === '/signup' || this.props.location.pathname === '/new' || this.props.location.pathname === '/saved' || this.props.location.pathname === '/edit' || this.props.location.pathname.includes('/edit') || this.props.location.pathname === '/login'
    ) {
      return false
    }
    else return (
      <footer>
        <section id="signup">
          <header style={{color:"#4d2a93"}}> Want to find more to eat? Sign Up!</header>
          <form> <label htmlFor="#text-area"> User Name: <input id="text-area" type="text-area" label="name" /></label>
            <label htmlFor="#text-area"> Password: <input id="text-area" type="text-area" label="name" />
              <button className="regular-button">
                Sign Up
                  </button>
              <h4> Already a Member? <Link to="/login"> Login </Link></h4>
            </label>  </form>

        </section>
      </footer>
    )
  }

  render() {
    return (
      <Router>
        <Switch>
          <React.Fragment >
            <div className="App">
              <Route path="/" component={this.NavBar} />
              {/* MAIN */}
              <Route exact path="/" component={this.MainPage} />
              <Route exact path="/signup"
                component={SignUp}
              />
              <Route exact path="/login"
                render={withRouter((props) =>
                  <Login {...props}
                    login={this.login}
                  />)
                }
              />
              {/* SEARCH */}
              <Route path="/search"
                render={withRouter((props) =>
                  <Search {...props}
                    addRecipe={this.addRecipe}
                    getRecipe={this.getRecipe}
                    value={this.state.ingredients}
                    setFlavor={this.setFlavor}
                    results={this.state.recipes}
                  />)
                }
              />

              <Route exact path="/saved" render={
                withRouter((props) =>
                  <SavedSearches {...props}
                    recipeSave={this.state.recipes}
                    delRecipe={this.delRecipe}
                    updateSavedRecipeState={this.updateSavedRecipeState}
                  />
                )
              }
              />
              <Route path="/new"
                render={withRouter((props) =>
                  <NewRecipe {...props}
                    updateSavedRecipeState={this.updateSavedRecipeState}
                  />)
                } />
              <Route exact path='/edit/:id'
                render={
                  withRouter(
                    (props) =>
                      <EditRecipe {...props}
                        titleInput ={this.titleInput}
                        ingredInput= {this.ingredInput}
                        imageInput={this.imageInput}
                        updateComponentValue={this.updateComponentValue}
                        savedRecipeInfo={this.state.savedRecipeInfo}
                        updateRecipe={this.updateRecipe}
                        editRecipeTitle={this.state.editRecipeTitle}
                        editRecipeIngredients={this.state.editRecipeIngredients}
                      />)
                }
              />
             {
               !localStorage.authToken &&
                <Route exact path="/(|/|search)/" component={this.Footer} />

             }
            </div>
          </React.Fragment>
        </Switch>

      </Router>
    );
  }
}


export default withRouter(App);
