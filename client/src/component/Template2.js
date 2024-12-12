import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import jsPDF from 'jspdf';
import DraggableSection from './ResumeEditor';
import CustomizationMenu from './CustomizationMenu';
import './css/template2.css';

const wrapInHtmlCss = (content, templateType = 'default') => {
  if (!content) return '';
  let templateClass = templateType === 'modern' ? 'modern-layout' : 'default-layout';

  return `<section class="section-container ${templateClass}">
      ${content.split('\n').map((line) => {
        if (line.startsWith('*')) return `<li class="styled-bullet">${line.replace('*', '').trim()}</li>`;
        if (line.startsWith('##')) return `<h2 class="section-title">${line.replace('##', '').trim()}</h2>`;
        if (line.startsWith('###')) return `<h3 class="section-subtitle">${line.replace('###', '').trim()}</h3>`;
        return `<p class="section-content">${line.trim()}</p>`;
      }).join('')}
    </section>`;
};

// Improved header section
const generateHeaderSection = (userData) => ({
  id: 'header',
  name: 'Header',
  content: `
    <section class="header-section">
      <h1 class="header-name">${userData?.fullName || 'Your Name'}</h1>
      <p class="header-job-title">${userData?.jobTitle || 'Your Job Title'}</p>
      <div class="header-contact-info">
        <p class="email">${userData?.email || 'your.email@example.com'}</p>
        ${userData?.phone ? `<p class="phone">${userData.phone}</p>` : ''}
        ${userData?.address ? `<p class="address">${userData.address}</p>` : ''}
      </div>
    </section>
  `,
});

// Extract sections from resume
const extractSection = (resumeString, sectionName, nextSectionName = null) => {
  const startIndex = resumeString.indexOf(sectionName);
  const endIndex = nextSectionName ? resumeString.indexOf(nextSectionName) : resumeString.length;

  if (startIndex !== -1 && startIndex < endIndex) {
    return resumeString.substring(startIndex + sectionName.length, endIndex).trim().replace(/\*\*/g, '');
  }
  return '';
};

// Extract and style sections
const extractAndStyleSections = (resumeString) => {
  const sectionsObj = {
    personalStatement: wrapInHtmlCss(extractSection(resumeString, 'Summary', 'Experience')),
    experience: wrapInHtmlCss(extractSection(resumeString, 'Experience', 'Skills')),
    skills: wrapInHtmlCss(extractSection(resumeString, 'Skills', 'Education')),
    education: wrapInHtmlCss(extractSection(resumeString, 'Education')),
  };

  return Object.keys(sectionsObj)
    .map((key, index) => ({
      id: index + 1,
      name: key.replace(/([A-Z])/g, ' $1').trim(),
      content: sectionsObj[key],
    }))
    .filter((section) => section.content.length > 0);
};

const Template2 = ({ userData }) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (userData?.generatedResume) {
      const resumeString = userData.generatedResume;
      const styledSections = extractAndStyleSections(resumeString);
      const headerSection = generateHeaderSection(userData);
      setSections([headerSection, ...styledSections]);
    }
  }, [userData]);

  const addSection = () => {
    const newSection = {
      id: Date.now(),
      name: `New Section ${sections.length + 1}`,
      content: '<p>New content here...</p>',
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const moveSection = (fromIndex, toIndex) => {
    const updatedSections = [...sections];
    const [movedSection] = updatedSections.splice(fromIndex, 1);
    updatedSections.splice(toIndex, 0, movedSection);
    setSections(updatedSections);
  };

  const updateSectionContent = (index, newContent) => {
    const updatedSections = [...sections];
    updatedSections[index].content = newContent;
    setSections(updatedSections);
  };

  // Generate PDF
  const generatePdf = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    const resumeContainer = document.querySelector('.resume-container');

    if (!resumeContainer) return;

    doc.html(resumeContainer, {
      callback: function (pdf) {
        pdf.save('Resume.pdf');
      },
      x: 10,
      y: 10,
      margin: [20, 20, 20, 20],
      html2canvas: {
        scale: 2,
        dpi: 300,
        useCORS: true,
      },
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="template2">
        <div className="resume-container">
          <div className="header">
            <h1>{userData?.fullName || 'Your Name'}</h1>
            <p>{userData?.jobTitle || 'Your Job Title'}</p>
          </div>
          <div className="resume-body">
            <div className="left-column">
              <section className="personal-info">
                <h2>Contact Information</h2>
                <p>Email: {userData?.email || 'your.email@example.com'}</p>
                {userData?.phone && <p>Phone: {userData.phone}</p>}
                {userData?.address && <p>Address: {userData.address}</p>}
              </section>
              <section className="skills">
                <h2>Skills</h2>
                {/* Dynamic content goes here */}
              </section>
            </div>
            <div className="right-column">
              {sections.map((section, index) => (
                <DraggableSection
                  key={section.id}
                  id={section.id}
                  index={index}
                  moveSection={moveSection}
                  removeSection={removeSection}
                  updateSectionContent={updateSectionContent}
                >
                  {section.content}
                </DraggableSection>
              ))}
            </div>
          </div>
        </div>
        <button onClick={addSection} className="btn-add-section">Add Section</button>
        <button onClick={generatePdf} className="btn-download-pdf">Download PDF</button>
      </div>
    </DndProvider>
  );
};

export default Template2;
