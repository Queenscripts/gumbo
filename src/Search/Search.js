import React from 'react';
import "./Search.css"
import config from '../config'

const Search = props => {
    console.log('searchprops', this.props)
        return ( 
          <>
            <section id="howto">
                <header style={{color: "rgba(85,0,170,.76)"}}> Search for Recipes Tailored to Your Tastebuds</header>
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
