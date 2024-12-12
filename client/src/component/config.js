// chatbot/config.js
import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [
    createChatBotMessage("Hi, I'm your resume assistant! Let's start building your resume. What's your name?")
  ],
  botName: 'ResumeBot',
  state: {
    userData: {} // State to store the user's resume details
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
};

export default config;
