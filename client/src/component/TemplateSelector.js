// src/components/ResumeTemplates.js
import React from 'react';
import html2pdf from 'html2pdf.js';

const ResumeTemplates = ({ data, template }) => {
  const generatePDF = () => {
    const element = document.getElementById('resume');
    html2pdf().from(element).save('resume.pdf');
  };

  return (
    <div id="resume" style={{ padding: '20px', fontFamily: 'Arial, sans-serif', width: '800px', margin: '0 auto' }}>
      {template === 'template1' && (
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <header style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1 style={{ margin: 0 }}>{data.fullName}</h1>
            <p>{data.email} | {data.phone}</p>
          </header>
          <section style={{ marginBottom: '20px' }}>
            <h2>Education</h2>
            <p>{data.education}</p>
          </section>
          <section style={{ marginBottom: '20px' }}>
            <h2>Experience</h2>
            <p>{data.experience}</p>
          </section>
          <section style={{ marginBottom: '20px' }}>
            <h2>Skills</h2>
            <p>{data.skills}</p>
          </section>
          <section>
            <h2>Projects</h2>
            <p>{data.projects}</p>
          </section>
          <footer style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={generatePDF} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
              Download PDF
            </button>
          </footer>
        </div>
      )}
      {template === 'template2' && (
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <header style={{ borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>
            <h1 style={{ margin: 0 }}>{data.fullName}</h1>
            <p style={{ margin: 0 }}>Email: {data.email}</p>
            <p>Phone: {data.phone}</p>
          </header>
          <section style={{ marginBottom: '20px' }}>
            <h2 style={{ color: '#333' }}>Education</h2>
            <p>{data.education}</p>
          </section>
          <section style={{ marginBottom: '20px' }}>
            <h2 style={{ color: '#333' }}>Experience</h2>
            <p>{data.experience}</p>
          </section>
          <section style={{ marginBottom: '20px' }}>
            <h2 style={{ color: '#333' }}>Skills</h2>
            <p>{data.skills}</p>
          </section>
          <section>
            <h2 style={{ color: '#333' }}>Projects</h2>
            <p>{data.projects}</p>
          </section>
          <footer style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={generatePDF} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
              Download PDF
            </button>
          </footer>
        </div>
      )}
    </div>
  );
};

export default ResumeTemplates;
