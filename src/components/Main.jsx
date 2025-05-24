import React from "react"
import Recipe from "./Recipe"
import IngredientsList from "./IngredientsList"
import { getRecipeFromMistral } from "../../ai"

export default function Main() {

    const [ingredients, setIngredients] = React.useState(["peas", "potatoes", "onions", "rice"])

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    const [recipe, setRecipe] = React.useState("")

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)  
    }

    
    


    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    id="ingredient"
                    type="text"
                    placeholder="e.g. tomatoes"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add Ingredients</button>
            </form>
            {ingredients.length > 0 ? 
            <IngredientsList 
                ingredients={ingredients}
                getRecipe={getRecipe}
            /> : null}
            {recipe && <Recipe recipe={recipe} />}
        </main>

    )
}

