import axios from 'axios';

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients from a user and suggests a detailed recipe they can make using some or all of those ingredients. The recipe should:
- Use as many of the provided ingredients as possible.
- Include only a few additional common ingredients (e.g., salt, pepper, oil, common spices) if needed.
- Be formatted in markdown with:
  - A title (e.g., ## Recipe Name)
  - A brief introduction
  - A list of ingredients with quantities
  - Step-by-step instructions
  - Optional: serving suggestions or tips
Ensure the recipe is clear, concise, and complete with all steps for preparation and cooking.
`;

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL,
      {
        model: import.meta.env.VITE_MODEL_NAME,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `I have ${ingredientsString}. Please give me a detailed recipe.` },
        ],
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0]?.message?.content || "No response received.";
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
    return "Something went wrong. Try again later.";
  }
}