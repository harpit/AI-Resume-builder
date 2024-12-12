import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyAh--zVit2WGxyYmBeN7juSm3T4PimAwDM');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate CV content using AI and handle question flow


export const analyzeResumeData = async (conversation) => {
  try {
    const userAnswers = conversation.reduce((acc, entry) => {
      acc[entry.key] = entry.answer;
      return acc;
    }, {});

    const prompt = 
      `  You are a professional resume writer specializing in ${userAnswers.industry || 'tech'} resumes, focused on optimizing for Applicant Tracking Systems (ATS). Your task is to craft a detailed, clean, and ATS-friendly resume based on the following user information:

  Full Name: ${userAnswers.fullName}
  Job Title: ${userAnswers.jobTitle}
  Email: ${userAnswers.email}
  Phone: ${userAnswers.phone || 'Not provided'}
  Work Experience: ${userAnswers.experience || "No work experience provided."}
  Skills: ${userAnswers.skills || "N/A"}
  Certifications: ${userAnswers.certifications || "N/A"}
  Volunteer Work: ${userAnswers.volunteerWork || "N/A"}
  Education: ${userAnswers.education || "N/A"}

  **Instructions:**
  - Create a clear, professional resume structure with standard sections: Career Summary, Work Experience, Skills, Certifications, Volunteer Work, and Education.
  - For **Work Experience**, provide detailed descriptions for each role. Include strong action verbs, specific responsibilities, key projects, and quantifiable achievements. For example, mention how the candidate impacted the company through leadership, sales growth, or technical innovations. Include bullet points for each role to expand on accomplishments and responsibilities.
  - For **Skills**, categorize skills into relevant subheadings (e.g., Technical Skills, Communication Skills, Management Skills). Ensure the inclusion of industry-relevant keywords important for the desired ${userAnswers.jobTitle} role.
  - In **Certifications**, explain how each certification enhances the candidate’s fit for the role. Include details such as relevant coursework, any honors, and key topics learned.
  - Emphasize any **Volunteer Work** or projects that demonstrate leadership, initiative, or role-related competencies. Highlight transferable skills and their potential impact in the desired role.
  - Write a comprehensive **Career Objective or Summary**, specific to the ${userAnswers.jobTitle} position. Include key strengths, industry experience, long-term career goals, and the candidate’s motivation for the role. Detail how the candidate’s experience will contribute to their next employer's success.
  - The resume should be free of any graphics, tables, or unusual formatting that could interfere with ATS parsing. Use clean, standard fonts and headings to ensure ATS compatibility.
  - Focus on expanding each section to make the resume robust and comprehensive, without adding unnecessary sections or recommendations.

  Final output should be a complete, professional, ATS-optimized resume with:
  - A detailed personal statement/career objective specific to the ${userAnswers.jobTitle} role.
  - Clean formatting with bullet points, detailed job descriptions, and clear section headers to improve ATS ranking.
  - Detailed information in each section to make the resume comprehensive and well-rounded.
`;

    const result = await model.generateContent(prompt); // Replace 'model' with appropriate API call
    const aiResponse = result.response.text();

    return {
      hasNextQuestion: false,
      fullName: userAnswers.fullName,
      jobTitle: userAnswers.jobTitle,
      email: userAnswers.email,
      experience: aiResponse.experience,
      skills: aiResponse.skills,
      certifications: aiResponse.certifications,
      volunteerWork: aiResponse.volunteerWork,
      education: aiResponse.education,
      aiSuggestions: aiResponse.suggestions,
      generatedResume: aiResponse,
    };
  } catch (error) {
    console.error('Error during AI resume analysis:', error);
    throw error;
  }
};


export const integrateAISuggestions = async (sections) => {
  try {
    const prompt = `
      You are an expert resume writer. Based on the following sections of a resume, suggest improvements for each section:
      
      ${sections.map((section, index) => 
        `Section ${index + 1} - ${section.name}: 
        ${section.content}`).join('\n\n')}

      Provide enhanced content for each section using action verbs, measurable outcomes, and clarity in bullet points. 
      Return it in this clean JSON format without backticks or unnecessary formatting:
      [
        { "sectionName": "Section 1 - ${sections[0].name}", "enhancedContent": "..." }
      ]
    `;

    const result = await model.generateContent(prompt);
    
    const cleanedResponse = result.response.text().replace(/```json|```/g, "").trim();
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error('Error during AI suggestion generation:', error);
    throw error;
  }
};

