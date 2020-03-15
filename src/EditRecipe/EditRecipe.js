import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './EditRecipe.css'
class EditRecipe extends Component {
    constructor(props) {
        super(props);
        //EVENT HANDLER FOR FLAVOR PROFILE SELECTION
        this.input = React.createRef();
    }
    render() {
        let savedRecipes = this.props.savedRecipeInfo
        let editId = parseInt(this.props.match.params.id)
        let editItem = savedRecipes.filter(item => {
            return item.id === editId
        })
        return (
            <>
                {savedRecipes.length > 0 ? (
                    <>
                        <section id="intro">
                            <h2> Edit Recipe:<br></br>
                            </h2>
                            <div id="examp">
                                <h3>{editItem[0].title}</h3>
                                <img src={editItem[0].thumbnail} />
                                <br></br>
                            Ingredients:
                        {editItem[0].ingredients}
                            </div>
                            <br></br>
                        </section>
                        <div id="edit">
                            {console.log(this.props)}
                            <form key={this.props.match.params.id}>
                                <label htmlFor="#recipeimage"> Image URL: </label>
                                {/* Setting image upload feature to url, because memory issues */}
                                    <input value={editItem[0].thumbnail} id="recipeimage" type="url" name="recipeimage" onChange={this.props.onChangeThumbnail} required/>
                                <label htmlFor="title">
                                    Recipe Title
                                    <input id="title" type="text" value={editItem[0].title || this.props.editRecipeTitle} onChange={this.props.onChangeRecipeTitle} required/>
                                </label>
                                <label  htmlFor="ingredients"> Ingredients
                                    <textarea type="text" value={editItem[0].ingredients} key="ingred" id="ingredients" onChange={this.props.onChangeRecipeIngredients} required></textarea>
                                </label>
                                <button type="submit" className="regular-button" onClick={(e) => { this.props.updateRecipe(editId, e); window.location.reload(true); }}> Submit</button>
                            </form>
                        </div>
                    </>
                ) : (
                        <div>Loading</div>
                    )

                }
            </>
        )
    }

}

export default withRouter(EditRecipe)
