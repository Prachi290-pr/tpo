const db = require('../../config/dbConfig');
const GeminiService = require('../../services/geminiService');

class TestGenerationController {
  static getCategories(req, res) {
    db.query('SELECT * FROM categories', (err, categories) => {
      if (err) {
        console.error('Error fetching categories:', err);
        return res.status(500).json({
          error: 'Failed to fetch categories',
          ...(process.env.NODE_ENV === 'development' && { details: err.message })
        });
      }
      res.json(categories);
    });
  }

  static getSubcategories(req, res) {
    const { categoryId } = req.params;

    if (!categoryId || isNaN(categoryId)) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    db.query(
      'SELECT * FROM subcategories WHERE category_id = ?',
      [categoryId],
      (err, subcategories) => {
        if (err) {
          console.error('Error fetching subcategories:', err);
          return res.status(500).json({
            error: 'Failed to fetch subcategories',
            ...(process.env.NODE_ENV === 'development' && { details: err.message })
          });
        }
        res.json(subcategories);
      }
    );
  }

  static getPrompt(req, res) {
    const { subcategoryId } = req.params;

    if (!subcategoryId || isNaN(subcategoryId)) {
      return res.status(400).json({ error: 'Invalid subcategory ID' });
    }

    db.query(
      'SELECT * FROM prompts WHERE subcategory_id = ? LIMIT 1',
      [subcategoryId],
      (err, [prompt]) => {
        if (err) {
          console.error('Error fetching prompt:', err);
          return res.status(500).json({
            error: 'Failed to fetch prompt',
            ...(process.env.NODE_ENV === 'development' && { details: err.message })
          });
        }

        if (!prompt) {
          return res.status(404).json({ error: 'Prompt not found' });
        }

        res.json(prompt);
      }
    );
  }

  static generateTest(req, res) {
    const { subcategoryId } = req.params;
    const { questionCount = 10, topic } = req.body;

    if (!subcategoryId || isNaN(subcategoryId)) {
      return res.status(400).json({ error: 'Valid subcategory ID is required' });
    }

    db.beginTransaction((transactionErr) => {
      if (transactionErr) {
        console.error('Transaction error:', transactionErr);
        return res.status(500).json({ error: 'Failed to start transaction' });
      }

      db.query(
        'SELECT id FROM subcategories WHERE id = ? LIMIT 1',
        [subcategoryId],
        (verifyErr, [subcategory]) => {
          if (verifyErr) {
            return db.rollback(() => {
              console.error('Error verifying subcategory:', verifyErr);
              res.status(500).json({ error: 'Failed to verify subcategory' });
            });
          }

          if (!subcategory) {
            return db.rollback(() => {
              res.status(404).json({ error: 'Subcategory not found' });
            });
          }

          // ✅ Callback-style GeminiService call
          GeminiService.generateMCQs(subcategoryId, questionCount, (genErr, questions) => {
            if (genErr) {
              return db.rollback(() => {
                console.error('Error generating test:', genErr);
                res.status(500).json({
                  error: 'Failed to generate test',
                  ...(process.env.NODE_ENV === 'development' && { details: genErr.message })
                });
              });
            }

            const testInsertQuery =
              'INSERT INTO tests (subcategory_id, question_count, topic) VALUES (?, ?, ?)';
            const testInsertParams = [subcategoryId, questionCount, topic || ''];

            db.query(testInsertQuery, testInsertParams, (insertErr, testResult) => {
              if (insertErr) {
                return db.rollback(() => {
                  console.error('Error inserting test:', insertErr);
                  res.status(500).json({ error: 'Failed to save test' });
                });
              }

              const testId = testResult.insertId;
              const questionValues = questions.map(q => [testId, q.question, q.answer]);

              db.query(
                'INSERT INTO test_questions (test_id, question, answer) VALUES ?',
                [questionValues],
                (questionsErr) => {
                  if (questionsErr) {
                    return db.rollback(() => {
                      console.error('Error inserting questions:', questionsErr);
                      res.status(500).json({ error: 'Failed to save questions' });
                    });
                  }

                  db.commit((commitErr) => {
                    if (commitErr) {
                      return db.rollback(() => {
                        console.error('Error committing transaction:', commitErr);
                        res.status(500).json({ error: 'Failed to complete test generation' });
                      });
                    }

                    res.json({
                      testId,
                      questions,
                      topic: topic || 'Generated'
                    });
                  });
                }
              );
            });
          });
        }
      );
    });
  }
}

module.exports = TestGenerationController;
