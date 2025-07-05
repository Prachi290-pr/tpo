// import db from '../models/index.js';
// const db = require('../../models/interviews/index.js');
const InterviewSchema = require('../../models/interviews/interview.js');
const InterviewContentSchema = require("../../models/interviews/interviewContent.js");
// import openaiServices from '../services/openaiServices.js';
const openaiServices = require("./openaiServices.js");

// const startInterview = async (req, res) => {
//   const { userId, title, complexity, language, numQuestions, role } = req.body;

//   try {
//     const questionsWithIdealAnswers = await openaiServices.generateQuestions(complexity, language, numQuestions, role);

//     const interview = await db.Interview.create({
//       userId,
//       title,
//       role,
//       complexity,
//       language,
//     });

//     const createdQuestions = await Promise.all(
//       questionsWithIdealAnswers.map((q) =>
//         db.InterviewContent.create({ 
//           content: q.question, 
//           ideal_answer: q.ideal_answer, 
//           interviewId: interview.id 
//         })
//       )
//     );

//     res.status(201).json({
//       interviewId: interview.id,
//       questions: createdQuestions,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const startInterview = async (req, res) => {
  const { userId, title, complexity, language, numQuestions, role } = req.body;

  try {
    const questionsWithIdealAnswers = await openaiServices.generateQuestions(complexity, language, numQuestions, role);

    const interview = await InterviewSchema.create({
      userId,
      title,
      role,
      complexity,
      language,
    });

    const createdQuestions = await Promise.all(
      questionsWithIdealAnswers.map((q) =>
        InterviewContentSchema.create({ 
          content: q.content, 
          ideal_answer: q.ideal_answer, 
          interviewId: interview.id 
        })
      )
    );

    res.status(201).json({
      interviewId: interview.id,
      questions: createdQuestions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getInterviewHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const interviews = await InterviewSchema.findAll({
      where: { userId },
      include: [{ model: InterviewContentSchema }],
    });

    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const submitInterview = async (req, res) => {
//   const { interviewId, answers } = req.body;

//   try {
//     let totalAccuracy = 0;
//     const interview = await db.Interview.findByPk(interviewId);

//     await Promise.all(
//       answers.map(async (a) => {
//         try {
//           const accuracy = await openaiServices.evaluateAnswer(a.content);

//           const question = await db.InterviewContent.findByPk(a.questionId);
//           await question.update({
//             answer: a.content,
//             accuracy: accuracy * 100, // Store accuracy percentage for the question
//           });

//           totalAccuracy += accuracy * 100; // Add accuracy percentage to totalAccuracy
//         } catch (error) {
//           console.error('Error evaluating answer for question:', a.questionId, error);
//           throw error;
//         }
//       })
//     );

//     const performance = totalAccuracy / answers.length; // Calculate average accuracy percentage

//     await interview.update({
//       score: totalAccuracy, // Store total accuracy
//       performance,
//     });

//     res.status(200).json({ message: 'Interview submitted successfully', score: totalAccuracy });
//   } catch (error) {
//     console.error('Error submitting interview:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// const submitInterview = async (req, res) => {
//   const { interviewId, answers } = req.body;

//   try {
//     let totalAccuracy = 0;
//     const interview = await db.Interview.findByPk(interviewId);
//     console.log(`I ID: ${interview}`)

//     const updatedAnswers = await Promise.all(
//       answers.map(async (a) => {
//         try {
//           const accuracy = await openaiServices.evaluateAnswer(a.content);

//           const question = await db.InterviewContent.findByPk(a.questionId);
//           await question.update({
//             answer: a.content,
//             score: accuracy * 100,
//           });

//           totalAccuracy += accuracy * 100;
//           return { questionId: a.questionId, accuracy: accuracy * 100 };
//         } catch (error) {
//           console.error('Error evaluating answer for question:', a.questionId, error);
//           throw error;
//         }
//       })
//     );

//     const performance = totalAccuracy / answers.length;

//     await interview.update({
//       score: performance, 
//       performance,
//     });

//     res.status(200).json({ message: 'Interview submitted successfully', score: performance, answers: updatedAnswers });
//   } catch (error) {
//     console.error('Error submitting interview:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

const submitInterview = async (req, res) => {
  const { interviewId, answers } = req.body;

  try {
    let totalAccuracy = 0;
    const interview = await InterviewSchema.findByPk(interviewId);
    console.log(`Interview ID: ${interview.id}`)

    const updatedAnswers = await Promise.all(
      answers.map(async (a) => {
        try {
          const question = await InterviewContentSchema.findByPk(a.questionId);
          if (!question) {
            throw new Error(`Question with ID ${a.questionId} not found`);
          }

          const accuracy = await openaiServices.evaluateAnswer(a.content, question.ideal_answer);

          await question.update({
            answer: a.content,
            score: accuracy,
          });

          totalAccuracy += accuracy;
          return { questionId: a.questionId, accuracy };
        } catch (error) {
          console.error('Error evaluating answer for question:', a.questionId, error);
          throw error;
        }
      })
    );

    const performance = totalAccuracy / answers.length;

    await interview.update({
      score: performance, 
      performance,
    });

    res.status(200).json({ message: 'Interview submitted successfully', score: performance, answers: updatedAnswers });
  } catch (error) {
    console.error('Error submitting interview:', error);
    res.status(500).json({ error: error.message });
  }
};


// const submitInterview = async (req, res) => {
//   const { interviewId, answers } = req.body;

//   try {
//     let score = 0;

//     const createdAnswers = await Promise.all(
//       answers.map(async (a) => {
//         const aiResponse = await openaiServices.evaluateAnswer(a.content);
//         console.log('AI response:', aiResponse);

//         if (aiResponse.data && aiResponse.data.choices && aiResponse.data.choices.length > 0) {
//           const accuracy = aiResponse.data.choices[0].text.trim();
//           const isCorrect = accuracy >= 0.5;
//           score += isCorrect ? 1 : 0;

//           const question = await db.InterviewContent.findByPk(a.questionId);
//           await question.update({
//             answer: a.content,
//             score: isCorrect ? 1 : 0,
//           });

//           return question;
//         } else {
//           console.error('Unexpected AI response:', aiResponse);
//           throw new Error('Unexpected AI response format');
//         }
//       })
//     );

//     const interview = await db.Interview.findByPk(interviewId);
//     const performance = (score / answers.length) * 100;

//     await interview.update({
//       score,
//       performance,
//     });

//     res.status(200).json({ message: 'Interview submitted successfully', score });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const getInterviewDetails = async (req, res) => {
  const { interviewId } = req.params;

  try {
    const interview = await InterviewSchema.findOne({
      where: { id: interviewId },
      include: [{ model: InterviewContentSchema, as: 'Interview_Contents' }],
    });

    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = { startInterview, getInterviewHistory, submitInterview, getInterviewDetails };
