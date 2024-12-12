// jobSearch.js
import axios from 'axios';

const API_URL = 'https://api.adzuna.com/v1/api/jobs';

export const searchJobs = async (query, location, country = 'gb') => {
  try {
    const app_id = '71b38b0b';
    const app_key = 'process.env.REACT_APP_ADZUNA_API_KEY';
    
    const response = await axios.get(`${API_URL}/${country}/search/1`, {
      params: {
        app_id,
        app_key,
        results_per_page: 10,
        what: query,        // Job title or keywords
        where: location     // Location (e.g., city or country)
      }
    });
    return response.data.results;  // Returns the list of jobs
  } catch (error) {
    console.error("Error fetching jobs from Adzuna: ", error);
    throw error;
  }
};
