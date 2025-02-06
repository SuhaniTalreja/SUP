// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Store the API key in an environment variable

console.log("API Key Loaded: ", OPENAI_API_KEY); // Log the key value (not the actual key itself)

app.post('/api/generate-caption', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 100,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`, // Use the environment variable
          },
        }
      );
      
    const generatedText = response.data.choices[0].message.content.trim();
    res.json({ caption: generatedText });
  } catch (error) {
    console.error('Error generating caption:', error);
    res.status(500).json({ error: 'Failed to generate a caption' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
