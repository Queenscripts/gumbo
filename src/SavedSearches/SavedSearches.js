import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import '../SavedSearches/SavedSearches.css';
import config from '../config'

import {Link} from "react-router-dom";

class SavedSearches extends Component{
    constructor(props){
        super(props);
          //EVENT HANDLER FOR FLAVOR PROFILE SELECTION
        this.state = {
            savedRecipeInfo:[]
            
        }
        this.delRecipe=this.delRecipe.bind(this)
    }
    delRecipe (id, e) {
    e.preventDefault();
    const options = {
        method: 'DELETE',
        headers:{
        'Accept' : 'application/json',
        'Authorization': 'bearer '  + localStorage.authToken,
        'Access-Control-Allow-Origin': '*',
        'Content-Type' : 'application/json'
        }
    }
    // `${config.API_ENDPOINT}/userrecipes/`+ id, options
    fetch(`${config.API_ENDPOINT}/userrecipes/` + id, options)
    .then(response=>{
        if (response.status !== 204){
            throw new Error('Did not delete')
        }
    })
    .then(()=>{
        let arr= [...this.state.savedRecipeInfo]
        let index = arr.findIndex(item=>{
            return  item.id=== id
        })
            if(index !== -1){
            arr.splice(index,1)
            this.setState({savedRecipeInfo: arr})
            
    }})
}


        componentDidMount(){  
        fetch(`${config.API_ENDPOINT}/userrecipes`,  
            { method: 'GET',
              headers:{
                  'Accept' : 'application/json',
                  'Content-Type' : 'application/json',
                  'Authorization' : 'bearer '  + localStorage.getItem("authToken")
              }
        })
        .then(
          response => {
          if (!response) {
          }
          return response.json()}
          )
        .then((savedRecipeInfo )=> {
            this.setState({savedRecipeInfo})
        }) 
      }
    render() {
        return (
        (!localStorage.getItem("authToken"))?(  
                <header>
                    Login please
                </header> 
        )
                :
                (
           <div className="App">
                    <section id="intro">
                    <header> Your Saved Searches & Recipes </header>
                    <p style={{padding: 0}}> See below for saved searches & recipes
                    </p>
                    </section>
                    <div>
                        <table>
                            <tbody>
                                {this.state.savedRecipeInfo.map(recipe =>{
                                    return ( 
                                        <tr key={recipe.id} id={recipe.id} >
                                        <td>
                                        <a href={recipe.recipeurl}> <img alt={recipe.title} src={recipe.thumbnail}/></a>
                                        </td> 
                                        <td>
                                        Recipe Title <br></br> <b><a  href={recipe.recipeurl}>{recipe.title}</a></b>
                                        <br></br>
                                        Ingredients: <br></br> <b>{recipe.ingredients}</b>
                                        </td> 

                                        <td>
                                        <Link to={`/edit/${recipe.id}`}>
                                                    {""}
                                                    Edit
                                        </Link>
                                        <button  onClick={(e)=>{this.delRecipe(recipe.id, e)}}>
                                            Delete
                                        </button>
                                        </td> 
                                        </tr> 
                                    )

                                })
                                }
                            </tbody> 
                        </table>  
                    </div>
                    
                </div>
             
            )
        ) 
     }  
}
            
export default withRouter(SavedSearches)
