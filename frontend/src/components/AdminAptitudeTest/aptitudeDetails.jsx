// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const TestResult = () => {
//   const [results, setResults] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [resultsPerPage] = useState(5); // Adjust number of results per page as needed
//   const location = useLocation();
//   const { mcqKey } = location.state;

//   useEffect(() => {
//     axios
//       .post(`https://api.tpo.getflytechnologies.com/openai/result/${mcqKey}`)
//       .then((res) => {
//         setResults(res.data);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, [mcqKey]);

//   // Logic for pagination
//   const indexOfLastResult = currentPage * resultsPerPage;
//   const indexOfFirstResult = indexOfLastResult - resultsPerPage;
//   const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

//   // Calculate count of correct answers
//   const correctAnswersCount = results.filter(item => item.user_ans === item.answer).length;

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-8 text-center">Test Results</h1>
//       <div className="mb-6 text-center">
//         <span className="font-medium">Total Questions: </span>{results.length}
//         <span className="ml-4 font-medium">Correct Answers: </span>{correctAnswersCount}
//       </div>
//       {currentResults.map((item, index) => (
//         <div key={index} className="relative p-6 mb-2 bg-gray-50 border border-gray-300 rounded-lg">
//           {/* Mark for correct or incorrect answer */}
//           <div className="absolute top-0 left-0 mt-2 ml-2">
//             {item.user_ans === item.answer ? (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M7.293 10.293a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L7 8.586l6.293-6.293a1 1 0 0 1 1.414 1.414l-7 7z" clipRule="evenodd" />
//             </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
              
//                 <path fillRule="evenodd" d="M6.293 5.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             )}
//           </div>
//           <h2 className="text-xl font-semibold mb-2">{`${index + indexOfFirstResult + 1}. ${item.question}`}</h2>
//           <ul className="space-y">
//             <li className={`p-3 rounded-lg ${item.answer === 'A' ? 'bg-green-100 text-green-800' : ''} ${item.user_ans === 'A' ? 'font-bold' : ''}`}>
//               A. {item.optionA}
//             </li>
//             <li className={`p-3 rounded-lg ${item.answer === 'B' ? 'bg-green-100 text-green-800' : ''} ${item.user_ans === 'B' ? 'font-bold' : ''}`}>
//               B. {item.optionB}
//             </li>
//             <li className={`p-3 rounded-lg ${item.answer === 'C' ? 'bg-green-100 text-green-800' : ''} ${item.user_ans === 'C' ? 'font-bold' : ''}`}>
//               C. {item.optionC}
//             </li>
//             <li className={`p-3 rounded-lg ${item.answer === 'D' ? 'bg-green-100 text-green-800' : ''} ${item.user_ans === 'D' ? 'font-bold' : ''}`}>
//               D. {item.optionD}
//             </li>
//           </ul>
//           <div className="mt-4">
//             <span className="font-medium">Correct Answer:</span> <span className="text-green-800">{item['option' + item.answer]}</span>
//           </div>
//           <div className="mt-2">
//             <span className="font-medium">Your Answer:</span> <span className={`${item.answer === item.user_ans ? 'text-green-800' : 'text-red-800'}`}>{item['option' + item.user_ans]}</span>
//           </div>
//           <div className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 text-sm">
//             {item.user_time ? `Time: ${item.user_time} sec` : 'No time recorded'}
//           </div>
//         </div>
//       ))}
//       {/* Pagination */}
//       <div className="flex justify-center mt-6">
//         {Array.from({ length: Math.ceil(results.length / resultsPerPage) }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => paginate(i + 1)}
//             className={`mx-1 px-4 py-2 rounded-md ${currentPage === i + 1 ? 'bg-gray-800 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TestResult;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';

const AptitudeDetails = () => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(5); // Adjust number of results per page as needed
  const location = useLocation();
  const { mcqKey } = location.state;

  useEffect(() => {
    axios
      .post(`https://api.tpo.getflytechnologies.com/openai/result/${mcqKey}`)
      .then((res) => {
        setResults(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [mcqKey]);

  // Logic for pagination
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  // Calculate count of correct answers
  const correctAnswersCount = results.filter(item => item.user_ans === item.answer).length;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to generate PDF
  // Function to generate PDF
  const generatePDF = () => {
    if (!results.length) return;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    let yOffset = 10;

    // Add header
    pdf.setFontSize(16);
    pdf.text("Test Results", 15, yOffset);
    yOffset += 10;

    pdf.setFontSize(12);
    pdf.text(`Id: ${results[0].clg_id}`, 15, yOffset);
    yOffset += 5;
    pdf.text(`Name: ${results[0].name}`, 15, yOffset);
    yOffset += 5;
    pdf.text(`Email: ${results[0].email_id}`, 15, yOffset);
    yOffset += 10;
    pdf.text(`Total Questions: ${results.length}`, 15, yOffset);
    yOffset += 10;
    pdf.text(`Correct Answers: ${correctAnswersCount}`, 15, yOffset);
    yOffset += 15;

    let pageNumber = 1;
    let resultsPerPage = 5;

    // Loop through all results and add to PDF
    for (let i = 0; i < results.length; i += resultsPerPage) {
      // Set current page results
      const currentResults = results.slice(i, i + resultsPerPage);

      // Add page number
      if (pageNumber > 1) {
        pdf.addPage();
      }

      pdf.setFontSize(12);
      pdf.text(`Page ${pageNumber}`, 190, 10, { align: 'right' });

      // Add each result
      currentResults.forEach((item, index) => {
        // Add question and options
        pdf.setFontSize(12);
        pdf.text(`${i + index + 1}. ${item.question}`, 15, yOffset);
        yOffset += 10;

        pdf.setFontSize(10);
        pdf.text(`A. ${item.optionA}`, 20, yOffset);
        yOffset += 8;
        pdf.text(`B. ${item.optionB}`, 20, yOffset);
        yOffset += 8;
        pdf.text(`C. ${item.optionC}`, 20, yOffset);
        yOffset += 8;
        pdf.text(`D. ${item.optionD}`, 20, yOffset);
        yOffset += 15;

        // Add correct answer and user answer
        pdf.setFontSize(10);
        pdf.text(`Correct Answer: ${item.answer}`, 20, yOffset);
        yOffset += 8;
        pdf.text(`Your Answer: ${item.user_ans ? item.user_ans : 'Not answered'}`, 20, yOffset);
        yOffset += 15;

        // Add time if available
        pdf.setFontSize(8);
        pdf.text(item.user_time ? `Time: ${item.user_time} sec` : 'No time recorded', 20, yOffset);
        yOffset += 10;

        // Add separator line
        pdf.setDrawColor(0); // Black color for the line
        pdf.setLineWidth(0.1); // Line width
        pdf.line(15, yOffset, 195, yOffset); // Draw a line
        yOffset += 5; // Adjust spacing after the line

        // Check if new page needed
        if (yOffset > 260 && (i + index + 1) < results.length) {
          pdf.addPage();
          yOffset = 10; // Reset yOffset for new page
          pageNumber++;
          pdf.setFontSize(12);
          pdf.text(`Page ${pageNumber}`, 190, 10, { align: 'right' });
        }
      });

      // Reset yOffset for new page
      yOffset = 10;
      pageNumber++;
    }

    // Save the PDF
    pdf.save('test-results.pdf');
  };

  if (!results.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-center">Test Results</h1>
      <div className="mb-6 text-center">
        <span className="font-medium">Total Questions: </span>{results.length}
        <span className="ml-4 font-medium">Correct Answers: </span>{correctAnswersCount}
      </div>
      {currentResults.map((item, index) => (
        <div key={index} className="relative p-6 mb-2 bg-gray-50 border border-gray-300 rounded-lg">
          {/* Mark for correct or incorrect answer */}
          <div className="absolute top-0 left-0 mt-2 ml-2">
            {item.user_ans === item.answer ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 10.293a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L7 8.586l6.293-6.293a1 1 0 0 1 1.414 1.414l-7 7z" clipRule="evenodd" />
            </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
              
                <path fillRule="evenodd" d="M6.293 5.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <h2 className="text-xl font-semibold mb-2">{`${index + indexOfFirstResult + 1}. ${item.question}`}</h2>
          <ul className="space-y">
            <li className={`p-3 rounded-lg ${item.answer === 'A' ? 'bg-green-100 text-green-800' : ''} ${item.user_ans === item.optionA ? 'font-bold' : ''}`}>
              A. {item.optionA}
            </li>
            <li className={`p-3 rounded-lg ${item.answer === 'B' ? 'bg-green-100 text-green-800' : ''} ${item.user_ans === item.optionB ? 'font-bold' : ''}`}>
              B. {item.optionB}
            </li>
            <li className={`p-3 rounded-lg ${item.answer === 'C' ? 'bg-green-100 text-green-800' : ''} ${item.user_ans === item.optionC ? 'font-bold' : ''}`}>
              C. {item.optionC}
            </li>
            <li className={`p-3 rounded-lg ${item.answer === 'D' ? 'bg-green-100 text-green-800' : ''} ${item.user_ans === item.optionD ? 'font-bold' : ''}`}>
              D. {item.optionD}
            </li>
          </ul>
          <div className="mt-4">
            <span className="font-medium">Correct Answer:</span> <span className="text-green-800">{item.answer}</span>
          </div>
          <div className="mt-2">
            <span className="font-medium">Your Answer:</span> <span className={`${item.answer === item.user_ans ? 'text-green-800' : 'text-red-800'}`}>{ item.user_ans}</span>
          </div>
          <div className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 text-sm">
            {item.user_time ? `Time: ${item.user_time} sec` : 'No time recorded'}
          </div>
        </div>
      ))}
      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: Math.ceil(results.length / resultsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-4 py-2 rounded-md ${currentPage === i + 1 ? 'bg-gray-800 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {/* Download PDF button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={generatePDF}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default AptitudeDetails;
