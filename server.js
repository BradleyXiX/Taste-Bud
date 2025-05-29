import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

app.post('/deepseek', async (req, res) => {
    try {
        const response = await axios.post('https://api.deepseek.com/v1/chat/completions', req.body, {
            headers: {
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`, // Secure API key
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
