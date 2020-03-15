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
            this.newRecipe= this.newRecipe.bind(this)
            this.onChange= this.onChange.bind(this)

        }
        handleChange = (e) =>{
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        
        onChange = (e)=>{
            e.preventDefault();
            this.setState({thumbnail: e.target.value})
        }

        newRecipe(e){
        e.preventDefault();
        fetch(`${config.API_ENDPOINT}/userrecipes/`, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer "  + localStorage.authToken,
                "Content-Type": "application/json"
              },
            body: JSON.stringify({
                title: this.state.title,
                ingredients: this.state.ingredients,
                thumbnail: this.state.thumbnail,
                recipeurl: null
            })
        })
        .then(res=>{
            if(!res.ok){
                console.log( res)
            }
            return res.json();
        })
        .then(data => { 
               console.log("HELLO",data)
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
               <form onSubmit={(e)=>{this.newRecipe(e); this.props.history.push('/saved')}}> 
                    <label htmlFor="#recipeimage"> Image URL: </label>
                    {/* Setting image upload feature to url, because memory issues */}
                    <input id="recipeimage" type="url" name="recipeimage" onChange= {this.onChange}/>
                    <label htmlFor="#text-area"> Title: </label>
                    <input id="text-area" type="text" name="title" value={this.state.title} onChange={this.handleChange} required/>
                    <label htmlFor="#recipe-area"> Recipe: </label>
                    <textarea id="recipe-area" type="text" name="ingredients" value={this.state.ingredients} onChange={this.handleChange} required></textarea>
                    <button type="submit" className="regular-button"> Submit</button>
                </form> 
                    
                </>
            )
        }
        
}

export default NewRecipe
