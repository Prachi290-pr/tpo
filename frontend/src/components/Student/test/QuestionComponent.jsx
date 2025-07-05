import React from 'react';

const QuestionComponent = ({
  question,
  questionIndex,
  totalQuestions,
  handleAnswerChange,
  handleSubmitQuestion,
  goToPreviousQuestion,
  goToNextQuestion,
  finalSubmit,
  handleSubmitTest,
  selectedAnswer,
  handleRemarkQuestion,
  isRemarked,
}) => {

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    handleAnswerChange(question.id, selectedOption);
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{question.question}</h3>
      </div>
      <div className="space-y-2">
        <div className="flex items-center">
          <input
            type="radio"
            id={`optionA_${question.id}`}
            name={`question_${question.id}`}
            value={`${question.optionA}`}
            onChange={handleOptionChange}
            className="form-radio h-4 w-4 text-blue-600"
            checked={selectedAnswer === `${question.optionA}`}
          />
          <label htmlFor={`optionA_${question.id}`} className="ml-2">{question.optionA}</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id={`optionB_${question.id}`}
            name={`question_${question.id}`}
            value={`${question.optionB}`}
            onChange={handleOptionChange}
            className="form-radio h-4 w-4 text-blue-600"
            checked={selectedAnswer === `${question.optionB}`}
          />
          <label htmlFor={`optionB_${question.id}`} className="ml-2">{question.optionB}</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id={`optionC_${question.id}`}
            name={`question_${question.id}`}
            value={`${question.optionC}`}
            onChange={handleOptionChange}
            className="form-radio h-4 w-4 text-blue-600"
            checked={selectedAnswer === `${question.optionC}`}
          />
          <label htmlFor={`optionC_${question.id}`} className="ml-2">{question.optionC}</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id={`optionD_${question.id}`}
            name={`question_${question.id}`}
            value={`${question.optionD}`}
            onChange={handleOptionChange}
            className="form-radio h-4 w-4 text-blue-600"
            checked={selectedAnswer === `${question.optionD}`}
          />
          <label htmlFor={`optionD_${question.id}`} className="ml-2">{question.optionD}</label>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={goToPreviousQuestion}
          className={`px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-200 ${questionIndex === 0 ? 'cursor-not-allowed' : ''}`}
          disabled={questionIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={() => handleRemarkQuestion(question.id)}
          className={`px-4 py-2 ${isRemarked ? 'bg-gray-600' : 'bg-yellow-600'} text-white rounded-md hover:${isRemarked ? 'bg-gray-700' : 'bg-yellow-700'} transition duration-200`}
        >
          {isRemarked ? 'Unmark' : 'Mark as Remark'}
        </button>
        {finalSubmit ? (
          <>
          <button
            onClick={handleSubmitQuestion}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
          <button
            onClick={handleSubmitTest}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
          >
            Submit Test
          </button>
          </>
        ) : (
          
          <button
            onClick={handleSubmitQuestion}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        )}
        <button
          onClick={goToNextQuestion}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionComponent;