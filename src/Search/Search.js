import React from 'react';
import "./Search.css"
import config from '../config'

const Search = props => {
    
        return ( 
          <>
            <section id="howto">
                <h2> Search for Recipes Tailored to Your Tastebuds</h2>
                {/* <h3> Your Flavour Profile </h3> */}

                <form 
                    onSubmit = {props.getRecipe}>
                    {/* <label>
                        <input
                            className="flavor-profile" type="radio" name="flavor" value="spicy" 
                            onChange={()=>{props.setFlavor("spicy")}}
                        /> <p className="text">Like it spicy, make me sweat! <div style={{fontSize: 40}}>🌶️ </div></p> 
                        <br/>
                    </label>
                    <label>
                    <input 
                        className="flavor-profile" type="radio" name="flavor" value="savory" onChange={()=>{props.setFlavor("savory")}}
                    /> <p className="text">Savory- not too spicy, and definitely not bland <div style={{fontSize: 40}}>🧂</div> </p>
                    <br/>
                    </label>
                    <label>
                        <input  
                            className="flavor-profile" type="radio" name="flavor" value="sweet" onChange={()=>{props.setFlavor("sweet")}}
                        /> <p className="text"> I want a treat- give me something sweet!<div style={{fontSize: 40}}>🧁</div>  </p> 
                        <br/>
                    </label>
                    <label>
                        <input  
                            className="flavor-profile" type="radio" name="flavor" value="sweet" onChange={()=>{props.setFlavor("")}}
                        /> <p className="text"> I don't have a flavor preference, for now show me anything <div style={{fontSize: 40}}>❌</div> </p>
                        <br/>
                        <br/>
                    </label>
                     */}
                    <label htmlFor="ingredients"> List up to 4 main ingredients: </label>
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
                <br></br>
            </table> 
            </>
        );
    };

    export default  Search;