export default function IngredientsList(props) {

    const IngredientsListItems = props.ingredients.map((ingredient) => {
        return (
            <li key={ingredient}>{ingredient}</li>
        )
    })

    return (
        <section className="ingredients-section">
            <div className="ingredients-list">
                <h1>Ingredients on hand: </h1>
                <ul>
                    {IngredientsListItems}
                </ul>
            </div>
            {props.ingredients.length > 3 ? <div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe? </h3>
                    <p>Genarate a recipe from your list items</p>
                </div>
                <button onClick={props.getRecipe}>Get a Recipe</button>
            </div> : null}
        </section>
    )
}