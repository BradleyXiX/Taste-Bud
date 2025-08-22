import React, { useState, useEffect, useRef } from "react";
import Recipe from "./Recipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromDeepSeek } from "../../ai";

export default function Main() {
    const [ingredients, setIngredients] = useState(["chicken", "potatoes", "all the main spices", "rice"]);
    const [recipe, setRecipe] = useState("");
    const [loading, setLoading] = useState(false); // New loading state
    const recipeSection = useRef(null);

    useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [recipe]);

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");
        if (newIngredient.trim()) {
            setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
        }
    }

    async function getRecipe() {
        setLoading(true); // Start loading
        setRecipe(""); // Clear previous recipe
        try {
            const recipeMarkdown = await getRecipeFromDeepSeek(ingredients);
            setRecipe(recipeMarkdown);
        } catch (err) {
            setRecipe("Failed to fetch recipe. Please try again.", err);
        } finally {
            setLoading(false); // Stop loading
        }
    }

    return (
        <main className="flex flex-col items-center justify-center gap-y-20 min-h-screen w-full">
            <form action={addIngredient} className="">
                <input
                    id="ingredient"
                    type="text"
                    placeholder="e.g. tomatoes"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add Ingredients</button>
            </form>
            {ingredients.length > 0 ? (
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    loading={loading} // Pass loading state
                    ref={recipeSection}
                />
            ) : null}
            {recipe && <Recipe recipe={recipe} />}
        </main>
    );
}