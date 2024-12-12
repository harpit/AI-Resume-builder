// backend/models/Template.js
const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: String,
  htmlContent: String, // HTML code for the template
  cssStyles: String,   // CSS styles for the template
});

module.exports = mongoose.model('Template', templateSchema);
