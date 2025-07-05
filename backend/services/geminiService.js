const axios = require('axios');
const db = require('../config/dbConfig');
require('dotenv').config();

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent';

// Utility: Replace {placeholders} with values
function injectParameters(template, params) {
  let result = template;
  for (const key in params) {
    const regex = new RegExp(`{${key}}`, 'g');
    result = result.replace(regex, params[key]);
  }
  return result;
}

// Main function: generateMCQs (pure callback)
function generateMCQs(subcategoryId, n, callback) {
  // Step 1: Fetch prompt from DB
  const query = `
    SELECT prompt_text, parameters 
    FROM prompts 
    WHERE subcategory_id = ? 
    ORDER BY updated_at DESC 
    LIMIT 1
  `;

  db.query(query, [subcategoryId], (err, results) => {
    if (err) {
      console.error('❌ DB Error:', err);
      return callback(err);
    }

    if (!results || results.length === 0) {
      return callback(new Error('No prompt found for this subcategory'));
    }

    let prompt_text = results[0].prompt_text;
    let parameters = results[0].parameters;

    try {
      parameters = typeof parameters === 'string' ? JSON.parse(parameters) : (parameters || {});
    } catch (parseErr) {
      console.error('❌ JSON Parse Error (parameters):', parseErr);
      return callback(new Error('Invalid JSON in parameters'));
    }

    // Inject dynamic value {n}
    const finalPrompt = injectParameters(prompt_text, { ...parameters, n });

    // Step 2: Call Gemini API
    const payload = {
      contents: [{ parts: [{ text: finalPrompt.trim() }] }]
    };

    const headers = {
      'Content-Type': 'application/json'
    };

    const url = `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`;
    console.log("i AM RUNNING BIRO")


    axios.post(url, payload, { headers }, (apiErr, response) => {
      console.log("testetstetts")
      if (apiErr) {
        console.error('❌ Gemini API Error:', apiErr.response?.data || apiErr.message);
        return callback(apiErr);
      }

      try {
        const raw = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!raw) return callback(new Error('Empty response from Gemini'));

        const clean = raw.trim().replace(/^```json|^```|```$/g, '').trim();
        console.log(clean)
        console.log("i AM RUNNING BIRO v2")
    
        const questions = JSON.parse(clean);
        return callback(null, questions);
      } catch (parseErr) {
        console.error('❌ Failed to parse Gemini response:', parseErr);
        return callback(new Error('Failed to parse Gemini response'));
      }
    });
  });
}

module.exports = {
  generateMCQs
};
