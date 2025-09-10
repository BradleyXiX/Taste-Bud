import React, { useState, useEffect, useRef } from "react";
import Recipe from "./Recipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromDeepseek } from "../../ai";

export default function Main() {
  const [ingredients, setIngredients] = useState(["tomatoes", "onions","chicken","rice"]);
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
    setLoading(true); 
    setRecipe("");
    setIngredients(""); 
    try {
      const recipeMarkdown = await getRecipeFromDeepseek(ingredients);
      setRecipe(recipeMarkdown);
    } catch (err) {
      setRecipe("Failed to fetch recipe. Please try again.", err);
    } finally {
      setLoading(false); // Stop loading
    }
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
      <IngredientsList
        ingredients={ingredients}
        getRecipe={getRecipe}
        loading={loading} // Pass loading state
        ref={recipeSection}
      />
      {recipe && <Recipe recipe={recipe} />}
    </main>
  );
}
