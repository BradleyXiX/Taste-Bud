export default function Main() {
    const ingredients = ['peas', 'pepper', 'salt']
    
    const addIngredients = ingredients.map((ingredient) => {
        return(
            <li key={ingredient}>{ingredient}</li>
        )
    })

    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("ingredient")
        ingredients.push(newIngredient)
        console.log(ingredients)
    }
    return (
        <main>
            <form onSubmit={handleSubmit}  className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. tomatoes"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button onSubmit={handleSubmit}>Add Ingredients</button>
            </form>
            <ul>
                {addIngredients}
            </ul>
        </main>
    )
} 