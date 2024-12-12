const express = require('express');
const router = express.Router();
const Template = require('../models/Template');

// Fetch all templates
router.get('/templates', async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

// Add a new template (if needed for admin panel)
router.post('/templates', async (req, res) => {
  const { name, htmlContent, cssStyles } = req.body;
  const newTemplate = new Template({ name, htmlContent, cssStyles });

  try {
    await newTemplate.save();
    res.json({ message: 'Template added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add template' });
  }
});

// Inject AI Data into selected template
router.post('/generate-resume', async (req, res) => {
  const { templateId, aiData } = req.body;

  try {
    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    let populatedHtml = template.htmlContent;

    Object.keys(aiData).forEach(key => {
      const placeholder = `{{${key}}}`;
      populatedHtml = populatedHtml.replace(new RegExp(placeholder, 'g'), aiData[key]);
    });

    res.json({ htmlContent: populatedHtml, cssStyles: template.cssStyles });
  } catch (error) {
    console.error('Error generating resume:', error); // Additional logging
    res.status(500).json({ error: 'Failed to generate resume' });
  }
});


module.exports = router;
