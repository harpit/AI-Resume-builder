import React, { useState } from 'react';
import ChatInterface from './resume';
import Template1 from './Template';
import Template2 from './Template2';
import Template3 from './Template3';

const CVPreview = () => {
  const [userData, setUserData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('template1');

  const handleFormSubmit = (aiGeneratedData) => {
    setUserData(aiGeneratedData); // AI-generated data will be used to render the CV
  };

  return (
    <div>
      <h2>Create and Preview Your CV</h2>
      {!userData ? (
        <ChatInterface onSubmit={handleFormSubmit} />
      ) : (
        <>
          <button onClick={() => setSelectedTemplate('template1')}>Template 1</button>
          <button onClick={() => setSelectedTemplate('template2')}>Template 2</button>
          <button onClick={() => setSelectedTemplate('template3')}>Template 3</button>


          <div className="cv-preview">
            {selectedTemplate === 'template1' && <Template1 userData={userData} />}
            {selectedTemplate === 'template2' && <Template2 userData={userData} />}
            {selectedTemplate === 'template3' && <Template3 userData={userData} />}

          </div>

          {/* Optionally, you can render the AI-generated resume text directly */}
          <div className="ai-generated-resume">
            <h3>Generated Resume:</h3>
            <pre>{userData.generatedResume}</pre>
          </div>
        </>
      )}
    </div>
  );
};

export default CVPreview;


