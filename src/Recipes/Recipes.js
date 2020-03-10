import React, {Component} from 'react'
import config from '../config'
import './Recipes.css'

class Recipes extends Component {
    constructor(){
        super()
        this.state = {
            error: ''
        }
    }
    
    
    addRecipe= (e) =>{ 
        e.preventDefault();
        if(localStorage.length === 0){
            alert("You must be logged in to save recipes!")
        } else {
        const headers = new Headers ();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization',"bearer "  + localStorage.getItem("authToken"))
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title:this.props.recipe.title,
                thumbnail: this.props.recipe.thumbnail,
                ingredients: this.props.recipe.ingredients,
                recipeurl:this.props.recipe.href
            }),
        };
        const request = new Request (`${config.API_ENDPOINT}/userrecipes`, options)
        //add error checking refer to signup.js
        fetch(request)
        .then(res=>{
            if(!res.ok){
                throw res
            }
            return res.json()
        })
        .then(data=>(
            alert(data.title + " saved!")           
        ))
        .catch(
            err=>{
                if(err.status===401){
                    alert("You must login or create a signup")
                }
            }
        )}  
    }
    

    render(){
       console.log('props', this.props)
        return (
            <>
                <tr>
                    <td>
                    <a href={this.props.recipe.href}  target="_blank"> <img src={this.props.recipe.thumbnail}/></a>
                    </td>
                    <td>
                    Recipe Title <br></br> <b><a href={this.props.recipe.href} target="_blank">{this.props.recipe.title}</a></b>
                    <br></br>
                    Ingredients: <br></br> <b>{this.props.recipe.ingredients}</b>
                    <br></br>
                    </td>
                    <td>
           
                    <button onClick={(e)=>{this.props.addRecipe(e); console.log("props", this.props);}}>
                             Add recipe to personal cookbook
                    </button>
                    </td>
                    
                </tr>
            </>
               
            )
    }
}

export default Recipes;
