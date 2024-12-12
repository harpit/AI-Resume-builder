const parseGeneratedResume = (aiResume) => {
  // Here we parse sections like 'Experience', 'Education', and 'Skills'
  const sections = {
    experience: "",
    education: "",
    skills: "",
  };

  // Split the AI generated text into paragraphs or by keywords like "Experience", "Education", "Skills"
  const lines = aiResume.split('\n');

  let currentSection = null;
  lines.forEach((line) => {
    const cleanLine = line.trim();

    if (cleanLine.startsWith('Experience')) {
      currentSection = 'experience';
    } else if (cleanLine.startsWith('Education')) {
      currentSection = 'education';
    } else if (cleanLine.startsWith('Skills')) {
      currentSection = 'skills';
    } else if (currentSection && cleanLine) {
      sections[currentSection] += cleanLine + '\n'; // Add content to the respective section
    }
  });

  return sections;
};
