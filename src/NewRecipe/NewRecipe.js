import React, {Component} from 'react';
import config from '../config'
import './NewRecipe.css'

class NewRecipe extends Component{
        constructor(props){
            super(props)
            this.state = {
                title:'',
                recipe:'',
                error:''
            }
            this.handleChange=this.handleChange.bind(this)
            this.newRecipe= this.newRecipe.bind(this)

        }
        handleChange = (e) =>{
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        newRecipe(e){
        e.preventDefault()
        fetch(`${config.API_ENDPOINT}/userrecipes`, {
            method: "POST",
            headers: {
                "Authorization": "bearer "  + localStorage.getItem("authToken"),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
                // "Content-Type": "text/plain"
              },
            body: JSON.stringify({
                title: this.state.title,
                ingredients: this.state.recipe,
                thumbnail: null,
                recipeurl:null
             })
        })
        .then(res=>{
            if(!res.ok){
                throw res
            }
            return res.json();
        })
        .then(data => { 
            window.location=window.location.origin + '/saved'

         })
         .catch(err => {
            if(err.status===400){
                this.setState({error: "recipe not saved"})
            }
            })
           }
        render() {
                return (
               <>
               <header> Add New Recipe </header>
               <form> 
                    <label htmlFor="#recipeimage"> Image: </label>
                    <input id="recipeimage" type="file" name="recipeimage" accept="image/*" />
                    <label htmlFor="#text-area"> Title: </label>
                    <input id="text-area" type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
                    <label htmlFor="#recipe-area"> Recipe: </label>
                    <input id="recipe-area" type="text" name="recipe" value={this.state.recipe} onChange={this.handleChange}/>
                    <button type="submit" className="regular-button" onClick={(e)=>{this.newRecipe(e)}}> Submit</button>

                </form> 
               
                    {/* <section id="intro">
                        <h2> Edit Recipe: {editItem[0].title}
                        </h2>
                        <p> See below for saved searches, or find the dish nearby
                        </p>
                    </section>
                    <div>
                       <form>
                          <label htmlFor="recipe-title">
                              Recipe Title
                            <input type='text' placeholder={editItem[0].title} value={this.props.editRecipeTitle} onChange={this.props.onChangeRecipeTitle}/>
                            </label> 
                            <label > Ingredients
                            <input type='text-area' placeholder={editItem[0].ingredients} value={this.props.editRecipeIngredients} onChange={this.props.onChangeRecipeIngredients}/>
                           
                            </label> 
                            <button type="submit" className="regular-button" onClick={(e)=>{this.props.updateRecipe(editId, e)}}> Submit</button>

                       </form>
                    </div>
                    </>
                    ) : (
                        <div>Loading</div>
                    )
                
                } */}
                </>
            )
        }
        
}

export default NewRecipe
