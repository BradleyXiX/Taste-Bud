import axios from 'axios';

const port = import.meta.env.VITE_PORT || 5000;

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

export async function getRecipeFromDeepSeek(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
    try {
        const response = await axios.post(`http://localhost:${port}/deepseek`, {
            model: "deepseek/deepseek-r1-0528:free",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a detailed recipe with ingredients and step-by-step instructions!` },
            ],
            max_tokens: 4096,
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        return response.data.choices[0]?.message?.content || "No response received.";
    } catch (err) {
        console.error('Error:', err.response?.data || err.message);
        if (err.response?.status === 429) {
            return "Rate limit exceeded. Please try again later.";
        }
        return "Sorry, something went wrong. Please try again.";
    }
}