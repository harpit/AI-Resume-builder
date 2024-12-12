import React from 'react';
import './css/Template3.css'; // Custom CSS for resume template

const ResumeTemplate = ({ userData }) => {
  const { fullName, jobTitle, email, experience, skills, certifications, education, volunteerWork } = userData;

  return (
    <div className="resume-container">
      {/* Resume Header */}
      <header className="resume-header">
        <h1 className="full-name">{fullName || 'Your Name'}</h1>
        <h2 className="job-title">{jobTitle || 'Your Job Title'}</h2>
        <p className="email">{email || 'your.email@example.com'}</p>
      </header>

      {/* Experience Section */}
      {experience && (
        <section className="resume-section">
          <h3>Experience</h3>
          <p>{experience}</p>
        </section>
      )}

      {/* Skills Section */}
      {skills && (
        <section className="resume-section">
          <h3>Skills</h3>
          <ul>
            {skills.split(',').map((skill, index) => (
              <li key={index}>{skill.trim()}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Certifications Section */}
      {certifications && (
        <section className="resume-section">
          <h3>Certifications</h3>
          <p>{certifications}</p>
        </section>
      )}

      {/* Education Section */}
      {education && (
        <section className="resume-section">
          <h3>Education</h3>
          <p>{education}</p>
        </section>
      )}

      {/* Volunteer Work Section */}
      {volunteerWork && (
        <section className="resume-section">
          <h3>Volunteer Work</h3>
          <p>{volunteerWork}</p>
        </section>
      )}
    </div>
  );
};

export default ResumeTemplate;
