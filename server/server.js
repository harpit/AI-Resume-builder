import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = 'AIzaSyAh--zVit2WGxyYmBeN7juSm3T4PimAwDM'; // Store the API key securely in .env file
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

// Define API endpoint to handle AI chat
app.post('/api/ai-chat', async (req, res) => {
  const { conversationHistory } = req.body; // Take previous conversation history from the frontend

  try {
    const AIChatSession = await model.startChat({
      generationConfig,
      history: conversationHistory || [],
    });

    res.json(AIChatSession); // Send the AI's response back to the frontend
  } catch (error) {
    console.error('Error generating AI response:', error);
    res.status(500).json({ error: 'AI response generation failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
