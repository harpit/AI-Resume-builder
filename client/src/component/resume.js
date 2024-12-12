import React, { useState } from 'react';
import './css/resume.css'; // Ensure your CSS is updated to match the new styles.
import { analyzeResumeData } from './AIQuestionnaire'; // Import AI service

const ChatInterface = ({ onSubmit }) => {
  const predefinedQuestions = [
    { question: "Do you have work experience?", key: "hasExperience", isRequired: true, type: "boolean" },
    { question: "Please provide your full name.", key: "fullName", isRequired: true },
    { question: "What is your current job title or career goal?", key: "jobTitle", isRequired: true },
    { question: "What's your email address?", key: "email", isRequired: true, type: "email" },
  
    // If user has experience, ask about their work history
    { question: "Briefly describe your work experience (highlight key responsibilities).", key: "experience", isRequired: true, condition: "hasExperience" },
    
    // For users with no experience, ask these alternative questions
    { question: "What are your top 3 skills?", key: "skills", isRequired: false, condition: "!hasExperience" },
    { question: "List any certifications, courses, or training you have completed.", key: "certifications", isRequired: false, condition: "!hasExperience" },
    { question: "Have you been involved in any volunteer work, internships, or projects?", key: "volunteerWork", isRequired: false, condition: "!hasExperience" },
    { question: "What is your highest level of education?", key: "education", isRequired: false },
  ];
  
  

  const [conversation, setConversation] = useState([{ id: 1, question: predefinedQuestions[0].question, answer: '', key: predefinedQuestions[0].key }]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [hasExperience, setHasExperience] = useState(null); // State to track user's experience
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAnswerSubmit = async () => {
    const currentQuestion = predefinedQuestions[currentQuestionIndex];
  
    // Validation: Check if the answer is required and provided
    if (currentQuestion.isRequired && !currentAnswer) {
      setErrorMessage("Answer is required.");
      return;
    }
  
    // Email validation
    if (currentQuestion.type === "email" && !/\S+@\S+\.\S+/.test(currentAnswer)) {
      setErrorMessage("Please enter a valid email.");
      return;
    }
  
    // Boolean validation (yes/no)
    if (currentQuestion.type === "boolean") {
      const answer = currentAnswer.toLowerCase();
      if (answer === "yes" || answer === "no") {
        setHasExperience(answer === "yes");
      } else {
        setErrorMessage("Please answer with 'yes' or 'no'.");
        return;
      }
    }
  
    // Add or update the current answer in the conversation array
    const newConversation = [...conversation];
    if (!newConversation[currentQuestionIndex]) {
      newConversation[currentQuestionIndex] = {
        id: currentQuestionIndex + 1,
        question: currentQuestion.question,
        answer: '',
        key: currentQuestion.key
      };
    }
    newConversation[currentQuestionIndex].answer = currentAnswer; // Set the answer
  
    setCurrentAnswer(''); // Clear the input field
    setIsLoading(true);
    setErrorMessage('');
  
    try {
      let nextQuestionIndex = currentQuestionIndex + 1;
  
      // Skip questions that depend on 'hasExperience' if the user has no experience
      if (!hasExperience) {
        while (
          nextQuestionIndex < predefinedQuestions.length &&
          predefinedQuestions[nextQuestionIndex].condition === "hasExperience"
        ) {
          nextQuestionIndex++;
        }
      }
  
      // Check if there are more questions
      if (nextQuestionIndex < predefinedQuestions.length) {
        const nextQuestion = predefinedQuestions[nextQuestionIndex];
        newConversation.push({
          id: newConversation.length + 1,
          question: nextQuestion.question,
          answer: '',
          key: nextQuestion.key
        });
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        // All questions answered, generate resume using AI
        const aiResponse = await analyzeResumeData(newConversation);
        onSubmit(aiResponse);
      }
    } catch (error) {
      setErrorMessage("Error generating resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  
    setConversation(newConversation);
  };
  
  return (
    <div className="chat-container ai-theme">
      {conversation.map((message, index) => (
        <div key={index} className="chat-message-card">
          <div className="chat-question">
            <p>{message.question}</p>
          </div>
          {message.answer && <div className="chat-answer"><p>{message.answer}</p></div>}
        </div>
      ))}

      <div className="input-container">
        <input
          type="text"
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
          placeholder="Your answer..."
          disabled={isLoading}
          className="chat-input"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleAnswerSubmit} disabled={isLoading} className="submit-button">
          {isLoading ? <div className="loading-spinner"></div> : 'Submit'}
        </button>
      </div>

      {isLoading && (
        <div className="ai-typing">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
