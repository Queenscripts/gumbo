import React, {Component} from 'react';
import './App.css';
import {Route,Link, Switch, withRouter} from "react-router-dom";
import SignUp from "./SignUp/SignUp"
import Login from "./Login/Login"
import About from "./About/About"
import Search from "./Search/Search"
import SavedSearches from './SavedSearches/SavedSearches';
import Recipes from './Recipes/Recipes';
import EditRecipe from './EditRecipe/EditRecipe'
import config from './config'
import NewRecipe from './NewRecipe/NewRecipe';

class App extends Component{
  constructor(props){
    super(props)
      //EVENT HANDLER FOR FLAVOR PROFILE SELECTION
//       this.setFlavor=this.setFlavor.bind(this)
      //ARRAY TO HOLD RECIPE DETAILS 
      this.state= {
        ingredients: [],
        flavor: [],
        recipes: [],
        email:'',
        password:'',
        savedRecipes:[],
        editRecipeTitle:'',
        editRecipeIngredients:'',
        error: ''
      }

      this.delRecipe=this.delRecipe.bind(this)
      this.onChangeRecipeTitle=this.onChangeRecipeTitle.bind(this)
      this.onChangeRecipeIngredients=this.onChangeRecipeIngredients.bind(this)
      this.updateRecipe=this.updateRecipe.bind(this)
      this.Footer=this.Footer.bind(this)
  }

  onChangeRecipeTitle(e){
    this.setState({editRecipeTitle: e.target.value})
  }
  
  onChangeRecipeIngredients(e){
    this.setState({editRecipeIngredients: e.target.value})
  }

  delRecipe (id, e) {
    const options = {
        method: 'DELETE',
        headers:{
        'Accept' : 'application/json',
        'Authorization': "bearer "  + localStorage.getItem("authToken"),
        'Access-Control-Allow-Origin':'*',
        'Content-Type' : 'application/json'}
    }
    const request = new Request (`${config.API_ENDPOINT}/userrecipes/`+ id, options)
    fetch(request)
    .then(response=>{
        if (response.status !== 204){
            throw new Error('Did not delete')
        }
    })
    .then(()=>{
        let arr= [...this.state.savedRecipes]
        let index = arr.findIndex(item=>{
         return  item.id=== id
        })
         if(index !== -1){
            arr.splice(index,1)
            this.setState({savedRecipes: arr})
            
    }})
}
  // MAKE AJAX CALL 


    
   getRecipe = (e) => {
    if (navigator.onLine === false){
      alert("You are offline, cannot search for recipes now")
    } else {
        e.preventDefault();
        const ingredients= e.target.elements.ingredients.value
            fetch(`${config.API_ENDPOINT}/recipes`)
            .then(response => response.json())
            .then(data => {
             const recipeRow=[]
              // LOOP THRU RECIPES ARRAY
              data.map(
                data=>{
                  let searchedData = data.ingredients.indexOf(ingredients)
                    if(searchedData > -1){
                      const recipeRows=<Recipes key={data.id} recipe={data} />
                      recipeRow.push(recipeRows)          
                      this.setState({recipes: recipeRow})
                    }
                }
              )
          })

      e.target.reset();
     }
 }
 updateRecipe (id, e) {
   e.preventDefault();
  fetch(`${config.API_ENDPOINT}/userrecipes/`+ id, {
        method: 'PUT',
        headers:{
          "Authorization": "bearer "  + localStorage.getItem("authToken"),
          "Access-Control-Allow-Headers": "*",
          "Content-Type": "application/json; charset=UTF-8",
          "Accept": "application/json",
          "Allow": "PUT",
          "credentials": "same-origin",
          "Access-Control-Allow-Origin": "*",
          "mode": "CORS",
          "Connection": "keep-alive"
        },
        body:JSON.stringify({
          title: this.state.editRecipeTitle,
          ingredients: this.state.editRecipeIngredients,
          thumbnail: null,
          recipeurl: null
        })
     })
     .then(res => res.json())
     .then((data)=>{
          let arr= this.state.savedRecipes
          let index = arr.findIndex(item=>{
           return  item.id === id
          })
      })
      .catch(err => {
        if(err.status===400){
            this.setState({error: "Incorrect username or password"})
        }
      })
     window.location.reload(true);

   }

     
    componentDidMount(){  
      fetch(`${config.API_ENDPOINT}/userrecipes`,  
      {   method: 'GET',
          headers:{
              'Accept' : 'application/json',
              'Content-Type' : 'application/json',
              'Authorization' : "bearer "  + localStorage.getItem("authToken")
      }})
      .then(response => response.json())
      .then(savedRecipes => {
          this.setState({savedRecipes})
        console.log('savedrecips', this.state.savedRecipes)
      }) 
    }
 //COMPONENTS

  NavBar(){
    return(
      <nav>
          <Link to ="/">
            {" "}
            About
          </Link>
          {
            !localStorage.authToken ?
            <><Link to ="/signup">
            {" "}
            Sign Up
          </Link>
          <Link to ="/login">
          {" "}
          Login
        </Link> </>: 
          <Link to ="/login">
            {" "}
            Logout
          </Link> 
          }
          <Link to ="/search">
            {" "}
            Search
          </Link>
          <Link to ="/saved">
            {" "}
            Saved Recipes
          </Link>
          {
            localStorage.authToken &&
            <Link to='new'>
              Add Recipes
            </Link>
          }
      </nav>
    )
  }
  
  MainPage () {
    return(
    <div className="main">
      <header>
        <Link to="/">
          {" "}
          <span style={{fontSize:60}}>Gumbo </span><br></br><span style={{whiteSpace: "nowrap", fontFamily:"sans-serif", fontSize: 24}}>Feed Your Tastebuds</span>
        </Link>
        <br></br>
        <Link  to="/signup"> 
          <button className="regular-button" type="button">Find Recipes!
          </button>
        </Link>
      </header>
      <main>
      
       
                 
      <About />
    </main>
    </div>)
  }

 
  Footer () {
    if (
      this.props.location.pathname==='/signup' ||  this.props.location.pathname==='/new' || this.props.location.pathname==='/saved'||this.props.location.pathname.includes('/edit')||this.props.location.pathname==='/login'
      ){
      return false
    }
    else return(
      <footer>
      <section id="signup">
              <h2> Want to find more to eat? Sign Up!</h2>
              <form> <label htmlFor="#text-area"> User Name: <input id="text-area" type="text-area" label="name"/></label> 
                  <label htmlFor="#text-area"> Password: <input id="text-area" type="text-area" label="name"/>
                  <button className="regular-button">
                      Sign Up
                  </button>
                  <h4> Already a Member? <Link to="/login"> Login </Link></h4>
                  </label>  </form>
                  
      </section>
    </footer>
    )
  }

  render(){
    return (
      <div className="App">
        <Route  path="/" component={this.NavBar}/>
        <Switch>
          {/* MAIN */}
          <Route exact path="/" component={this.MainPage}/>
         <Route exact path="/signup" 
            render={(props)=>
              <SignUp {...props}/>
            }
          />              
          <Route exact path="/login"
            render={(props) => 
              <Login {...props}
                login={this.login}
              />
            }
          />
          {/* SEARCH */}
          <Route path="/search"
            render={(props)=> 
              <Search {...props} 
                getRecipe={this.getRecipe}  
                value={this.state.ingredients} 
                setFlavor={this.setFlavor}
                recipes={this.state.recipeDeets}
                results={this.state.recipes}
              />
          }
           />
         
          <Route path="/saved" render={(props)=>
              <SavedSearches {...props}
                recipeSave={this.state.recipes}
                delRecipe={this.delRecipe}
                savedRecipes={this.state.savedRecipes}
                updateSavedRecipeState={this.updateSavedRecipeState}
              />
            }
          />
          <Route path="/edit/:id" 
            render={(props)=>
              <EditRecipe {...props}
                savedRecipes={this.state.savedRecipes}
                onChangeRecipeTitle={this.onChangeRecipeTitle}
                onChangeRecipeIngredients={this.onChangeRecipeIngredients}
                updateRecipe={this.updateRecipe}
                editRecipeTitle={this.state.editRecipeTitle}
                editRecipeIngredients={this.state.editRecipeIngredients}
              />
            }/>
            <Route path="/new" 
            render={(props)=>
              <NewRecipe {...props}
              updateSavedRecipeState={this.updateSavedRecipeState}
              
              />
            }/>
        </Switch>
        <Route path="/" component={this.Footer}/>
      </div>
    );
  }
}


export default withRouter(App);
