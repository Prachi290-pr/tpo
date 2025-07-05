// import OpenAI from 'openai';
// import { configDotenv } from 'dotenv';
// configDotenv();

const OpenAI = require("openai");
const configDotenv = require("dotenv");
configDotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// const generateQuestions = async (complexity, language, numQuestions, role) => {
//   const prompt = `Create a list of ${numQuestions} questions for an interview with a ${role} who specializes in ${language} at a ${complexity} level.`;
//   const response = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     messages: [
//       {
//         role: 'user',
//         content: prompt,
//       },
//     ],
//     temperature: 0.5,
//     max_tokens: 1000,
//     top_p: 1,
//   });

//   const questionsString = response.choices[0].message.content;
//   const questions = questionsString.split('\n').filter(q => q.trim() !== '');

//   return questions;
// };

const generateQuestions = async (complexity, language, numQuestions, role) => {
  const prompt = `Create a list of ${numQuestions} questions and their ideal answers for an interview with a ${role} who specializes in ${language} at a ${complexity} level. Format each question and answer pair as follows:
  [Your question here]
  [The ideal answer here]
  ...`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 1,
      max_tokens: 2000,
      top_p: 1,
    });

    const questionsString = response.choices[0].message.content;
    console.log('Raw Questions String:', questionsString);

    const questionAnswerPairs = questionsString.split(/\n\n/).filter(q => q.trim() !== '');
    console.log('Split Question-Answer Pairs:', questionAnswerPairs);

    const questionsWithIdealAnswers = questionAnswerPairs.map(pair => {
      const [question, idealAnswer] = pair.split('\n').map(part => part.trim());
      
      if (!question || !idealAnswer) {
        console.error('Failed to parse question or ideal answer:', pair);
        return null;
      }

      return { content: question, ideal_answer: idealAnswer };
    }).filter(q => q !== null);

    return questionsWithIdealAnswers;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
};


const evaluateAnswer = async (userAnswer, idealAnswer) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Evaluate the accuracy of the following user answer compared to the ideal answer. 
                    User Answer: "${userAnswer}" 
                    Ideal Answer: "${idealAnswer}" 
                    Provide a score between 0 and 100. Give an accurate number itself nothing more.
                    If the user answer is null or empty give the score as 0.`,
        },
      ],
      temperature: 0.5,
      max_tokens: 100,
      top_p: 1,
    });
    console.log(response.choices[0].message);
    const accuracy = parseFloat(response.choices[0].message.content.trim());
    if (isNaN(accuracy) || accuracy < 0 || accuracy > 100) {
      throw new Error('Invalid accuracy score from OpenAI');
    }

    return accuracy;
  } catch (error) {
    console.error('Error evaluating answer:', error);
    throw error;
  }
};

module.exports = { generateQuestions, evaluateAnswer };
