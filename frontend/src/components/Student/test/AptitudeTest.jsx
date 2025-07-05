import React, { useEffect, useState } from 'react';
// import api from 'api';
import { useNavigate } from 'react-router-dom';
import api from '../../../api';

const AptitudeTest = ({ uid }) => {
  const [aptitudeTests, setAptitudeTests] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTestId, setLoadingTestId] = useState(null); // Track the currently loading test ID
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true); // Start loading when fetching data
    api
      .get('openai/aptitude') // Replace with your actual endpoint
      .then((response) => {
        setAptitudeTests(response.data);
        setIsLoading(false); // Stop loading when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsError(true);
        setIsLoading(false); // Stop loading on error
      });
  }, []);

  const handleAttemptTest = (testId) => {
    // console.log(`Attempting test with ID: ${testId}`);
    // console.log(uid);
    setIsLoading(true); // Start loading when attempting test
    setLoadingTestId(testId); // Set the currently loading test ID

    api
      .post(`openai/aptitude-test/${testId}`, { uid })
      .then((res) => {
        // console.log(res.data);
        navigate('/generate_questions', { state: { questions: res.data } });
        setIsLoading(false); // Stop loading after navigating
        setLoadingTestId(null); // Reset the loading test ID
      })
      .catch((err) => {
        // console.log(err);
        setIsLoading(false); // Stop loading on error
        setLoadingTestId(null); // Reset the loading test ID
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Aptitude MCQ Test
      </h1>
      {isError ? (
        <div className="text-center text-red-500">Error fetching data. Please try again later.</div>
      ) : isLoading && aptitudeTests.length === 0 ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {aptitudeTests.map((test) => (
            <div
              key={test.aid}
              className="aptitude-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full sm:w-72 md:w-80 lg:w-96 xl:w-1/4"
            >
               <h3 className="text-lg font-semibold text-blue-700 mb-2">
                {test.title}
              </h3>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                {test.aptitudetype}
              </h3>
              <p className="text-gray-700">Level: {test.level}</p>
              <p className="text-gray-700">No. of Questions: {test.noq}</p>
              <p className="text-gray-700">Time: {test.time} minutes</p>
              <button
                onClick={() => handleAttemptTest(test.aid)}
                className={`mt-4 text-white px-4 py-2 rounded-full shadow-md transition-colors duration-300 ${
                  loadingTestId === test.aid ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
                }`}
                disabled={isLoading} 
              >
                {loadingTestId === test.aid ? 'Generating...' : 'Attempt Test'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AptitudeTest;
