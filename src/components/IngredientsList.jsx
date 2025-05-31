import React from "react";
import './IngredientsList.css'; // Ensure CSS is imported

const IngredientsList = React.forwardRef(({ ingredients, getRecipe, loading }, ref) => {
    const IngredientsListItems = ingredients.map((ingredient) => (
        <li key={ingredient}>{ingredient}</li>
    ));

    return (
        <section className="ingredients-section">
            <div className="ingredients-list">
                <h1>Ingredients on hand: </h1>
                <ul>{IngredientsListItems}</ul>
            </div>
            {ingredients.length > 3 ? (
                <div className="get-recipe-container">
                    <div ref={ref}>
                        <h3>Ready for a recipe? </h3>
                        <p>Generate a recipe from your list items</p>
                    </div>
                    <button onClick={getRecipe} disabled={loading}>
                        {loading ? "Loading..." : "Get a Recipe"}
                    </button>
                </div>
            ) : null}
        </section>
    );
});

export default IngredientsList;