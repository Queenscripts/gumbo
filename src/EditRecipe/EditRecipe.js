import React from 'react';
import { withRouter } from 'react-router';
import './EditRecipe.css'


const EditRecipe = React.forwardRef((props, ref) => {
    let savedRecipes = props.savedRecipeInfo
    let editId = parseInt(props.match.params.id)
    let editItem = savedRecipes.filter(item => {
        return item.id === editId
    })

    return (
        <>
            {savedRecipes.length > 0 ? (
                <>
                    <section id="intro">
                        <header style={{ marginBottom: -40 }}> Edit Recipe</header>
                        <div id="examp">
                            <img src={editItem[0].thumbnail} alt={editItem[0].title} />
                            <h3>{editItem[0].title}</h3>
                            <span style={{ fontWeight: 300 }}>Ingredients:</span> {editItem[0].ingredients}
                        </div>
                    </section>
                    <div id="edit">
                        <form>
                            <label htmlFor="#recipeimage"> Image URL: </label>
                            {/* Setting image upload feature to url, because memory issues */}
                            <input  ref={props.imageInput} type="url" defaultValue={editItem[0].thumbnail} name="imageInput" required />
                            <label htmlFor="title"> Recipe Title</label>

                                <input id="title" ref={props.titleInput} type="text" defaultValue={editItem[0].title} required/>
                
                            <label  htmlFor="ingredients"> Ingredients </label>
                                <textarea type="text" ref={props.ingredInput} defaultValue={editItem[0].ingredients} required></textarea>
                               
                            <button type="submit" className="regular-button" onClick={(e) => {props.updateComponentValue(e); props.updateRecipe(editId, e); props.history.push("/saved")}}> Submit</button>
                        </form>
                    </div>
                </>
            ) : (
                    <div>Loading</div>
                )

            }
        </>
    )
})


export default withRouter(EditRecipe)
