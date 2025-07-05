import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionComponent from './QuestionComponent';
import api from '../../../api';
// import api from 'api';

const QuestionPage = () => {
  const location = useLocation();
  const { questions } = location.state || { questions: [] };
  const initialTime = questions[0]?.time_req || 1;
  // console.log(questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(location.state?.currentQuestionIndex || 0);
  const [answers, setAnswers] = useState(location.state?.answers || {});
  const [remarkedQuestions, setRemarkedQuestions] = useState(location.state?.remarkedQuestions || []);
  const [submittedQuestions, setSubmittedQuestions] = useState(location.state?.submittedQuestions || []);
  const [timeRemaining, setTimeRemaining] = useState(location.state?.timeRemaining || initialTime * 60);
  const [questionTime, setQuestionTime] = useState({});
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    if (questions.length === 0) {
      navigate('/aptitude-test');
    }
  }, [questions, navigate]);


  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.setItem('reloadDetected', 'true');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      localStorage.removeItem('reloadDetected');
    };
  }, []);
  
  useEffect(() => {
    if (localStorage.getItem('reloadDetected') === 'true') {
      navigate('/complete-test');
      localStorage.removeItem('reloadDetected');
    }
  }, [navigate]);


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          navigate("/complete-test");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  useEffect(() => {
    setStartTime(Date.now());
  }, [currentQuestionIndex]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      const endTime = Date.now();
      const timeTaken = Math.floor((endTime - startTime) / 1000);
      setQuestionTime({
        ...questionTime,
        [questions[currentQuestionIndex].id]: (questionTime[questions[currentQuestionIndex].id] || 0) + timeTaken,
      });
      setCurrentQuestionIndex(index);
      setStartTime(Date.now());
    }
  };

  const handleRemarkQuestion = (questionId) => {
    if (remarkedQuestions.includes(questionId)) {
      setRemarkedQuestions(remarkedQuestions.filter(id => id !== questionId));
    } else {
      setRemarkedQuestions([...remarkedQuestions, questionId]);
    }
  };

  const handleSubmitQuestion = () => {
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = answers[currentQuestion.id];

    setQuestionTime({
      ...questionTime,
      [currentQuestion.id]: (questionTime[currentQuestion.id] || 0) + timeTaken,
    });

    if (selectedAnswer !== undefined) {
      api.post(`openai/updateAnswer/${currentQuestion.id}`, { answer: selectedAnswer, timeTaken })
        .then(response => {
          setSubmittedQuestions([...submittedQuestions, currentQuestion.id]);
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setStartTime(Date.now());
          }
        })
        .catch(error => {
          console.error('Error updating answer:', error);
        });
    } else {
      console.warn('Selected answer is undefined.');
    }
  };

  const handleSubmitTest = (event) => {
    event.preventDefault();
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    setQuestionTime({
      ...questionTime,
      [questions[currentQuestionIndex].id]: (questionTime[questions[currentQuestionIndex].id] || 0) + timeTaken,
    });

    const updatedAnswers = questions.map(question => ({
      questionId: question.id,
      answer: answers[question.id]
    }));

    api.post('openai/submitTestAnswers', { answers: updatedAnswers })
      .then(response => {
        navigate("/review", {
          state: {
            questions,
            answers,
            remarkedQuestions,
            submittedQuestions,
            currentQuestionIndex,
            timeRemaining,
          }
        });
      })
      .catch(error => {
        console.error('Error submitting test:', error);
      });
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-full md:w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Questions</h2>
        <div className="grid grid-cols-4 gap-4">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => goToQuestion(index)}
              className={`p-2 rounded-md text-center ${
                index === currentQuestionIndex
                  ? 'bg-blue-600 text-white'
                  : submittedQuestions.includes(questions[index].id)
                  ? 'bg-green-600 text-white'
                  : remarkedQuestions.includes(questions[index].id)
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8 bg-white p-10 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold">Time Remaining: {formatTime(timeRemaining)}</h2>
          {questions.length > 0 ? (
            <div className="mt-8">
              <QuestionComponent
                question={questions[currentQuestionIndex]}
                questionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                handleAnswerChange={handleAnswerChange}
                handleSubmitQuestion={handleSubmitQuestion}
                goToPreviousQuestion={() => goToQuestion(currentQuestionIndex - 1)}
                goToNextQuestion={() => goToQuestion(currentQuestionIndex + 1)}
                finalSubmit={currentQuestionIndex === questions.length - 1}
                handleSubmitTest={handleSubmitTest}
                selectedAnswer={answers[questions[currentQuestionIndex].id]}
                handleRemarkQuestion={handleRemarkQuestion}
                isRemarked={remarkedQuestions.includes(questions[currentQuestionIndex].id)}
              />
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
