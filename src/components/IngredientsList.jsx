import React from "react";

const IngredientsList = React.forwardRef(
  ({ ingredients = [], getRecipe, loading }, ref) => {
    const safeIngredients = Array.isArray(ingredients) ? ingredients : [];
    const IngredientsListItems = safeIngredients.map((ingredient) => (
      <li key={ingredient}>{ingredient}</li>
    ));

    return (
      <section className="ingredients-section">
        {safeIngredients.length > 0 && (
          <div className="ingredients-list">
            <h1>Ingredients on hand:</h1>
            <ul>{IngredientsListItems}</ul>
          </div>
        )}
        <div className="get-recipe-container">
          <div ref={ref}>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list items</p>
          </div>
          <button
            onClick={getRecipe}
            disabled={loading || safeIngredients.length < 4}
          >
            {loading
              ? "Loading..."
              : safeIngredients.length >= 4
              ? "Get a Recipe"
              : `Add ${4 - safeIngredients.length} more ingredient${
                  4 - safeIngredients.length > 1 ? "s" : ""
                }`}
          </button>
        </div>
      </section>
    );
  }
);

export default IngredientsList;
