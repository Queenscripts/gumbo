import React, {Component} from 'react';
import config from '../config'
import './NewRecipe.css'

class NewRecipe extends Component{
        constructor(props){
            super(props)
            this.state = {
                title:'',
                ingredients:'',
                thumbnail: null,
                error:''
            }
            this.handleChange=this.handleChange.bind(this)
            // this.newRecipe= this.newRecipe.bind(this)
            this.onChange= this.onChange.bind(this)

        }
        handleChange = (e) =>{
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        
        onChange = (e) => {
                this.setState({thumbnail: e.target.files[0],
                loaded: 0,
                })
        }

        newRecipe(e){
        e.preventDefault();
        
        // data.append('title', this.state.title)
        // data.append('ingredients', this.state.recipe)
        // var request = new XMLHttpRequest();
        // request.open('POST', `https://localhost:8000/api/userrecipes`, true)
        // request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        // request.setRequestHeader('Authorization', 'bearer ' + localStorage.authToken);
        // var formData = new FormData();
        // formData.append('thumbnail', this.state.thumbnail);
        // formData.append('title', this.state.title);
        // formData.append('ingredients', this.state.recipe);
        // request.send(JSON.stringify(formData));
        // console.log(request);
        // fetch(`https://localhost:8000/api/userrecipes`, {
        //     method: 'POST',
        //     headers: {
        //         "Authorization": "Access Token "  + localStorage.authToken,
        //         "Content-Type": "application/json"
        //       },
        //     body: JSON.stringify({
        //         title: this.state.title,
        //         ingredients: this.state.recipe,
            
        //         recipeurl: null
        //     })
        // })
        // .then(res=>{
        //     if(!res.ok){
        //         console.log( res)
        //     }
        //     console.log("hry",res)
        //     return res.json();
        // })
        // .then(data => { 
        //        console.log("HELLO",data)
        //  })
        //  .catch(err => {
        //     if(err.status===400){
        //         this.setState({error: "recipe not saved"})
        //     }
        //   })
        }
         
      
        render() {
                return (
               <>
               <header> Add New Recipe </header>
               <form
                 action='http://localhost:8000/api/userrecipes'
                 authorization = 'bearer' {...localStorage.authToken}
                 method='post' 
                 encType="multipart/form-data"> 
                    <label htmlFor="#recipeimage"> Image URL: </label>
                    {/* Setting image upload feature to url, because memory issues */}
                    <input id="recipeimage" type="file" accept="image/png, image/jpeg, image/jpg" name="recipeimage" onChange= {this.onChange}/>
                    <label htmlFor="#text-area"> Title: </label>
                    <input id="text-area" type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
                    <label htmlFor="#recipe-area"> Recipe: </label>
                    <input id="recipe-area" type="text" name="ingredients" value={this.state.ingredients} onChange={this.handleChange}/>
                    <button type="submit" className="regular-button"> Submit</button>

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
