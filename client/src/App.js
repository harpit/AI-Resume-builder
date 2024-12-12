import React from 'react';
import CVPreview from './component/ResumeProvide';

const App = () => {
  const userData = {
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    jobTitle: 'Software Engineer',
    experience: '5 years of experience in full-stack web development.',
    education: 'Bachelor of Computer Science',
    skills: ['JavaScript', 'React', 'Node.js', 'CSS'],
  };

  return (
    <div>
      <CVPreview userData={userData} />
    </div>
  );
};

export default App;
