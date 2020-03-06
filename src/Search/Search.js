import React from 'react';
import "./Search.css"
import config from '../config'

const Search = props => {
    
        return ( 
          <>
            <section id="howto">
                <h2> Search for Recipes Tailored to Your Tastebuds</h2>
                <form 
                    onSubmit = {props.getRecipe}>
                    
                    <label htmlFor="ingredients"> Search recipes by <b>one main ingredient</b> recipes listed have the ingredient</label>
                    <input id="ingredients" type="text"/>
                    <button className="regular-button">
                        Submit
                    </button>  
                </form>
                
            </section>
            <table>
                <tbody>
                    {props.results}
                </tbody>

            </table> 
            </>
        );
    };

    export default  Search;