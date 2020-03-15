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
    this.input = React.createRef();
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
    this.onChangeRecipeTitle = this.onChangeRecipeTitle.bind(this)
    this.onChangeRecipeIngredients = this.onChangeRecipeIngredients.bind(this)
    this.onChangeThumbnail = this.onChangeThumbnail.bind(this)
    this.updateRecipe = this.updateRecipe.bind(this)
  }

  onChangeThumbnail(e) {
    e.preventDefault();
    this.setState({ thumbnail: e.target.value })
  }

  onChangeRecipeTitle(e) {
    e.preventDefault();
    this.setState({ editRecipeTitle: e.target.value })
  }

  onChangeRecipeIngredients(e) {
    e.preventDefault()
    this.setState({ editRecipeIngredients: e.target.value })
  }

  //UPDATE EDIT FORM STATE
  componentWillReceiveProps ( newProps ) {
    this.setState( { editRecipeTitle:newProps.editRecipeTitle } );
  }
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
        title: this.state.editRecipeTitle,
        ingredients: this.state.editRecipeIngredients,
        thumbnail: this.state.thumbnail,
        recipeurl: null
      })
    })
      .then(res => res.json())
      .then((data) => {
        let arr = this.state.savedRecipeInfo
        let index = arr.findIndex(item => {
          return item.id === id
        })
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
      e.preventDefault();
      const ingredients = e.target.elements.ingredients.value
      fetch(`${config.API_ENDPOINT}/recipes`)
        .then(response => response.json())
        .then(data => {
          const recipeRow = []
          const nomatch = []
          // LOOP THRU RECIPES ARRAY
          data.map(
            data => {
              let searchedData = data.ingredients.indexOf(ingredients)
              console.log(searchedData, 'here')
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
          <h2> Want to find more to eat? Sign Up!</h2>
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
                    recipes={this.state.recipeDeets}
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
                        onChangeThumbnail={this.onChangeThumbnail}
                        history={this.props.history}
                        savedRecipeInfo={this.state.savedRecipeInfo}
                        onChangeRecipeTitle={this.onChangeRecipeTitle}
                        onChangeRecipeIngredients={this.onChangeRecipeIngredients}
                        updateRecipe={this.updateRecipe}
                        editRecipeTitle={this.state.editRecipeTitle}
                        editRecipeIngredients={this.state.editRecipeIngredients}
                      />)
                }
              />
              <this.Footer />

            </div>
          </React.Fragment>
        </Switch>

      </Router>
    );
  }
}


export default withRouter(App);
