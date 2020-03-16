import React from 'react';
import "./Search.css"
const Search = props => {
        return ( 
          <>
            {props.results.length > 0 ? (
            <>
            <section id="howto">
                <header style={{color: "rgba(85,0,170,.76)"}}> Search for Recipes Tailored to Your Tastebuds</header>     
            </section>
            <form id="mainsearch" 
                    onSubmit = {props.getRecipe}>
                    
                    <label htmlFor="ingredients"> Search recipes by <b>one main ingredient</b> recipes listed have the ingredient</label>
                    <div id= "inner">
                    <input id="ingredients" type="text" placeholder="onion"/>
                    <button className="regular-button">
                        Submit
                    </button> 
                    </div> 
            </form>
            <table>
                <tbody>
                    {props.results}
                </tbody>

            </table> 
            </> ) : (
            <>
            <section id="howto">
                <header style={{color: "rgba(85,0,170,.76)"}}> Search for Recipes Tailored to Your Tastebuds</header>     
            </section>
            <form id="mainsearch" 
                    onSubmit = {props.getRecipe}>
                    
                    <label htmlFor="ingredients"> Search recipes by <b>one main ingredient</b> recipes listed have the ingredient</label>
                    <div id= "inner">
                    <input id="ingredients" type="text" placeholder="onion"/>
                    <button className="regular-button">
                        Submit
                    </button> 
                    </div> 
            </form>
           <div style={{color: "white", fontWeight: 900, padding: 50}}>Search by an ingredient to show recipe results!</div>
           <br></br>
            </> 
        )
    }
    </>
    )}

    export default  Search;
