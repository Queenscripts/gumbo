import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import '../SavedSearches/SavedSearches.css';
import {Link} from "react-router-dom";

class SavedSearches extends Component{
    render() {
        console.log('SSprops', this.props)
        return (
        (!localStorage.getItem("authToken"))?(         
            <div>
                Login please
            </div>
        )
                :
            window.location.location.href=('/saved')
                (
                <div>
                <section id="intro">
                <header> Your Saved Searches & Recipes </header>
                <p> See below for saved searches, or find the dish nearby
                </p>
                </section>
                <div>
                    <table>
                        <tbody>
                            {/* {console.log('PROPS FROM SS', this.props)} */}
                            {this.props.savedRecipes.map(recipe =>{
                                return (
                                <tr key={recipe.id} id={recipe.id} >
                                <td>
                                <a href={recipe.recipeurl}  target="_blank"> <img src={recipe.thumbnail}/></a>
                                </td> 
                                <td>
                                Recipe Title <br></br> <b><a  href={recipe.recipeurl}target="_blank">{recipe.title}</a></b>
                                <br></br>
                                Ingredients: <br></br> <b>{recipe.ingredients}</b>
                                </td>

                                <td>
                                <Link to={`/edit/${recipe.id}`}>
                                            {""}
                                            Edit
                                </Link>
                                <button  onClick={
                                        (e)=>{this.props.delRecipe(recipe.id, e)}
                                    }>
                                       Delete
                                </button>
                                </td> 
                            </tr> )

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
