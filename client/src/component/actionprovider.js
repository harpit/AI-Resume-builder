// chatbot/ActionProvider.js
class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, stateRef) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.stateRef = stateRef;
    }
  
    handleName(name) {
      this.setState((prevState) => ({
        ...prevState,
        userData: { ...prevState.userData, name: name }
      }));
      const message = this.createChatBotMessage(`Nice to meet you, ${name}. What's your email?`);
      this.addMessageToBotState(message);
    }
  
    handleEmail(email) {
      this.setState((prevState) => ({
        ...prevState,
        userData: { ...prevState.userData, email: email }
      }));
      const message = this.createChatBotMessage("Got it! Can you tell me about your work experience?");
      this.addMessageToBotState(message);
    }
  
    handleExperience(experience) {
      this.setState((prevState) => ({
        ...prevState,
        userData: { ...prevState.userData, experience: experience }
      }));
      const message = this.createChatBotMessage("Great! What skills do you have?");
      this.addMessageToBotState(message);
    }
  
    handleSkills(skills) {
      this.setState((prevState) => ({
        ...prevState,
        userData: { ...prevState.userData, skills: skills }
      }));
      const message = this.createChatBotMessage("Thanks! Your resume is being generated.");
      this.addMessageToBotState(message);
      // Optionally, you can end the chat here
    }
  
    endChat() {
      const message = this.createChatBotMessage("All done! You can preview your resume.");
      this.addMessageToBotState(message);
    }
  
    addMessageToBotState(message) {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message]
      }));
    }
  }
  
  export default ActionProvider;
  