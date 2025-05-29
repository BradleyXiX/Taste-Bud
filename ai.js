import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;
const port = import.meta.env.VITE_PORT;


const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

export async function getRecipeFromDeepSeek(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
    try {
        const response = await axios.post("http://localhost:5000/deepseek", {
            model: "deepseek-chat",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        }, {
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            }
        });

        return response.data.choices[0]?.message?.content || "No response received.";
    } catch (err) {
        console.error(err.message);
        return "Sorry, something went wrong. Please try again.";
    }
}


