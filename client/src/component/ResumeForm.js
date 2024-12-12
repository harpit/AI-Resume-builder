import React, { useState } from 'react';
import axios from 'axios';

const ResumeForm = ({ onGenerate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: '',
    projects: '',
    template: 'template1',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/generate-resume', {
      data: formData,
      template: formData.template,
    });
    onGenerate(response.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Full Name:</label>
      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>Phone Number:</label>
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

      <label>Education:</label>
      <input type="text" name="education" value={formData.education} onChange={handleChange} />

      <label>Experience:</label>
      <input type="text" name="experience" value={formData.experience} onChange={handleChange} />

      <label>Skills:</label>
      <input type="text" name="skills" value={formData.skills} onChange={handleChange} />

      <label>Projects:</label>
      <input type="text" name="projects" value={formData.projects} onChange={handleChange} />

      <label>Select Template:</label>
      <select name="template" value={formData.template} onChange={handleChange}>
        <option value="template1">Template 1</option>
        <option value="template2">Template 2</option>
      </select>

      <button type="submit">Generate Resume</button>
    </form>
  );
};

export default ResumeForm;
