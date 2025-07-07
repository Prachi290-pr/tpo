// // src/controllers/testController.js
// const db = require('../../config/dbConfig');
// const { generateQuestionsFromPrompt } = require('../../services/geminiService');

// exports.generateTest = async (req, res) => {
//   const { userId, promptId } = req.body;
  
//   try {
//     // 1. Get the prompt from database
//     const [prompts] = await db.promise().query(
//       'SELECT * FROM prompts WHERE id = ?', 
//       [promptId]
//     );
    
//     if (prompts.length === 0) {
//       return res.status(404).json({ error: 'Prompt not found' });
//     }
    
//     const prompt = prompts[0];
    
//     // 2. Use Gemini to generate questions
//     const questions = await generateQuestionsFromPrompt(prompt.prompt_text);
    
//     // 3. Save to generated_tests table
//     const [result] = await db.promise().query(
//       'INSERT INTO generated_tests (user_id, subcategory_id, questions) VALUES (?, ?, ?)',
//       [userId, prompt.subcategory_id, JSON.stringify(questions)]
//     );
    
//     res.status(201).json({
//       testId: result.insertId,
//       questions
//     });
    
//   } catch (error) {
//     console.error('Test generation error:', error);
//     res.status(500).json({ error: 'Failed to generate test' });
//   }
// };

// exports.getUserTests = (req, res) => {
//   const { userId } = req.params;
  
//   db.query(
//     'SELECT * FROM generated_tests WHERE user_id = ? ORDER BY created_at DESC',
//     [userId],
//     (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Database error' });
//       }
      
//       // Parse the questions JSON string
//       const tests = results.map(test => ({
//         ...test,
//         questions: JSON.parse(test.questions)
//       }));
      
//       res.json(tests);
//     }
//   );
// };











// src/controllers/testController.js
const db = require('../../config/dbConfig');
const { generateQuestionsFromPrompt } = require('../../services/geminiService');

exports.generateTest = async (req, res) => {
  const { userId, promptId } = req.body;

  try {
    // 1. Get the prompt from database
    const [prompts] = await db.promise().query(
      'SELECT * FROM prompts WHERE id = ?',
      [promptId]
    );

    if (prompts.length === 0) {
      return res.status(404).json({ error: 'Prompt not found' });
    }

    const prompt = prompts[0];

    // 2. Format a better prompt for Gemini (ensure JSON output)
    const formattedPrompt = `
You are an expert test creator. Generate 5 multiple choice questions based on the following topic:

"${prompt.prompt_text}"

Each question should be in this format:
{
  "question": "Question text here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0  // index of correct answer
}

Only respond with a JSON array of question objects.
`;

    // 3. Call Gemini and parse result
    const questions = await generateQuestionsFromPrompt(formattedPrompt);

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: 'No valid questions generated' });
    }

    // 4. Save to generated_tests table
    const [result] = await db.promise().query(
      'INSERT INTO generated_tests (user_id, subcategory_id, questions) VALUES (?, ?, ?)',
      [userId, prompt.subcategory_id, JSON.stringify(questions)]
    );

    // 5. Return response with new testId and questions
    res.status(201).json({
      testId: result.insertId,
      questions
    });

  } catch (error) {
    console.error('Test generation error:', error);
    res.status(500).json({ error: 'Failed to generate test' });
  }
};




exports.getUserTests = (req, res) => {
  const { userId } = req.params;

  db.query(
    'SELECT * FROM generated_tests WHERE user_id = ? ORDER BY created_at DESC',
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }

      // ✅ FIXED: handle both stringified and object format
      const tests = results.map(test => ({
        ...test,
        questions: typeof test.questions === 'string'
          ? JSON.parse(test.questions)
          : test.questions
      }));

      res.json(tests);
    }
  );
};
