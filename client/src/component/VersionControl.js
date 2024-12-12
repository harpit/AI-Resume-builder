import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VoiceInput = ({ onInput }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const newRecognition = new SpeechRecognition();
    newRecognition.continuous = true;
    newRecognition.interimResults = false;
    newRecognition.lang = 'ur'; // Set the native language for input (e.g., Urdu)

    newRecognition.onresult = async (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();

      // Send the captured voice input for translation
      const translatedText = await translateToEnglish(transcript);

      // Call the parent onInput function with the translated text
      onInput(translatedText);
    };

    setRecognition(newRecognition);
  }, [onInput]);

  // Function to translate captured text using LibreTranslate API (a free option)
  const translateToEnglish = async (text) => {
    setLoading(true);
    try {
      const response = await axios.get('https://translate.googleapis.com/translate_a/single', {
        params: {
          client: 'gtx',
          sl: 'ur',      // Source language (Urdu)
          tl: 'en',      // Target language (English)
          dt: 't',
          q: text        // Text to translate
        }
      });
  
      const translatedText = response.data[0][0][0]; // Extract translated text
      setLoading(false);
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error.response?.data || error.message);
      setLoading(false);
      return text; // Fallback to the original text if translation fails
    }
  };
  
  
  

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <div className="voice-input">
      <button onClick={toggleListening}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      {loading && <p>Translating...</p>} {/* Show translation status */}
    </div>
  );
};

export default VoiceInput;
