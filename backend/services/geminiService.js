// // src/services/gemini.js
// const axios = require('axios');
// const dotenv = require('dotenv');
// dotenv.config();

// const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent`;

// async function generateQuestionsFromPrompt(promptText) {
//   try {
//     const { data } = await axios.post(
//       `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
//       { contents: [{ parts: [{ text: promptText }] }] },
//       { headers: { 'Content-Type': 'application/json' } }
//     );

//     const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
//     if (!raw) throw new Error('Empty response from Gemini');
    
//     const cleanText = raw.trim().replace(/^```json|^```|```$/g, '').trim();
//     return JSON.parse(cleanText);

//   } catch (err) {
//     console.error('🔴 Gemini API error:', err.response?.data || err.message);
//     throw err;
//   }
// }

// module.exports = { generateQuestionsFromPrompt };






const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent`;

async function generateQuestionsFromPrompt(promptText) {
  try {
    const { data } = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: promptText }] }]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) throw new Error('Empty response from Gemini');

    const cleanText = raw.trim().replace(/^```json|```$/g, '').trim();

    return JSON.parse(cleanText);

  } catch (err) {
    console.error('🔴 Gemini API error:', err.response?.data || err.message);
    throw new Error('Failed to parse Gemini output');
  }
}

module.exports = { generateQuestionsFromPrompt };
