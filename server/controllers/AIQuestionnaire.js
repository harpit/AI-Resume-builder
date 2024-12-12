import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const fetchAIResponse = async (userMessage, history = []) => {
  const chatSession = await model.startChat({
    generationConfig,
    history: [
      ...history,
      { user: userMessage },
    ],
  });

  const response = chatSession.responses[0].text;
  return response;
};
