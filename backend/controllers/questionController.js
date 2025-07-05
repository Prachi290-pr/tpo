const Questions = require('../models/questionSchema');

// const createQuestion = async (req, res) => {
//     try {
//         const { companyId } = req.params;
//         const { questionName, dataType } = req.body;
//         // const questions = req.body;

//         const newQuestion = await Questions.create({
//             question: questionName,
//             data_type: dataType,
//             companyId: companyId,
//         });
//         // const createdQuestions = await Promise.all(questions.map(async (question) => {
//         //     return await Question.create(question);
//         // }));

//         res.status(201).json(newQuestion);
//         // res.status(201).json(createdQuestions);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const addQuestion = async (req, res) => {
    try {
        const { companyId, remarkId } = req.params;
        // const { question, data_type } = req.body;
        const questions = req.body;

        // console.log(questions);
    //   const newQuestion = await Questions.create({ question, data_type, companyId, remarkId });
        const createdQuestions = await Promise.all(questions.map(async (question) => {
            // console.log(question);
            // console.log(question["question"], question.data_type);
            return await Questions.create({
                question: question.question, 
                dataType: question.dataType, 
                companyId: companyId, 
                remarkId: remarkId,
            },);
        }));
  
    //   res.status(201).json(newQuestion);
        res.status(201).json(createdQuestions);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// const getQuestions = async (req, res) => {
//     try {
//         const { companyId } = req.params;

//         const questions = await Questions.findAll({
//             where: { companyId: companyId },
//         });

//         res.status(200).json(questions);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const getQuestions = async (req, res) => {
    try {
      const { companyId, remarkId } = req.params;
      const questions = await Questions.findAll({ where: { companyId, remarkId }, });
  
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const { companyId, remarkId, questionId } = req.params;
        const deletedRows = await Questions.destroy({ where: { id: questionId, remarkId, companyId } });
        if (!deletedRows) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addQuestion,
    // createQuestion,
    getQuestions,
    deleteQuestion,
};
