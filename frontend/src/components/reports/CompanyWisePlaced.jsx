/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import * as XLSX from 'xlsx';
// import api from 'api';
import api from '../../api';

const CompanySearch = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [data, setData] = useState([]);
  const [companyDetails, setCompanyDetails] = useState([]);
  const [hasTrackerQuestion, setHasTrackerQuestion] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [trackerCompanies, setTrackerCompanies] = useState(new Set());
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCompanyChange = (selectedOption) => {
    setSelectedCompany(selectedOption);
    const hasTracker = trackerCompanies.has(selectedOption.value);
    setHasTrackerQuestion(hasTracker);
    fetchRegistered(selectedOption.value);
    if (hasTracker) {
      fetchQuestions(selectedOption.value);
      fetchAnswers(selectedOption.value);
    }
  };

  const fetchCompanies = () => {
    api
      .get("rsl/getcompanies")
      .then((res) => {
        setCompanyDetails(res.data);
        const trackerCompanyIds = new Set(
          res.data.filter(company => company.tracker === "yes").map(company => company.id)
        );
        setTrackerCompanies(trackerCompanyIds);
      })
      .catch((err) => {
        console.error("Error fetching company details:", err);
      });
  };

  const fetchRegistered = (companyId) => {
    api
      .get(`rsl/getregistered/${companyId}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching registered students:", err);
      });
  };

  const fetchQuestions = (companyId) => {
    api
      .get(`que/getquestions/${companyId}`)
      .then((res) => {
        const questionsData = res.data[0]?.question || [];
        setQuestions(questionsData);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
      });
  };

  const fetchAnswers = (companyId) => {
    api
      .get(`que/getanswers/${companyId}`)
      .then((res) => {
        const answersData = res.data[0]?.que_answers || [];
        setAnswers(Array.isArray(answersData) ? answersData : []);
      })
      .catch((err) => {
        console.error("Error fetching answers:", err);
      });
  };

  const getAnswerForQuestion = (studentId, questionId) => {
    const answerObj = answers.find(answer => answer.student_id === studentId && answer.question_id === questionId);
    return answerObj ? answerObj.answer : 'NA';
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'College Data');
    XLSX.writeFile(wb, 'college_data.xlsx');
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: '200px',
    }),
  };

  return (
    <div className='m-4'>
      <Select 
        className='w-1/3 mx-auto my-3'
        options={companyDetails.map(company => ({ value: company.id, label: company.name }))}
        onChange={handleCompanyChange} 
        placeholder="Search for a company..."
        styles={customStyles}
      />
      {selectedCompany && data.length > 0 ? (
      <div className="overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto">
      <table border="1" className="">
        <thead className="sticky top-0 bg-gray-800 z-8">
          <tr>
            <th>Sr. No.</th>
            <th>College ID</th>
            {hasTrackerQuestion && questions.length > 0 && questions.map((question, index) => (
              <th key={index}>{question.question}</th>
            ))}
            {!hasTrackerQuestion && (
              <>
                <th>Email</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Branch</th>
                <th>Degree Year</th>
                <th>Location</th>
                <th>10th%</th>
                <th>10th Passing</th>
                <th>12th%</th>
                <th>12th Passing</th>
                <th>Diploma%</th>
                <th>Diploma Passing</th>
                <th>Degree %</th>
                <th>Degree CGPA</th>
                <th>Degree Passing</th>
                <th>Resume</th>
                <th>Interested In</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.clg_id}</td>
              {hasTrackerQuestion && questions.length > 0 && questions.map((question, qIndex) => (
                <td key={qIndex}>{getAnswerForQuestion(row.id, question.id)}</td>
              ))}
              {!hasTrackerQuestion && (
                <>
                  <td>{row.email_id}</td>
                  <td>{`${row.first_name} ${row.middle_name} ${row.last_name}`}</td>
                  <td>{row.mobile}</td>
                  <td>{row.gender}</td>
                  <td>{new Date(row.dob).toLocaleDateString()}</td>
                  <td>{row.branch}</td>
                  <td>{row.degree}</td>
                  <td>{row.loc || '-'}</td>
                  <td>{row.ssc_per || '-'}</td>
                  <td>{row.ssc_year || '-'}</td>
                  <td>{row.hsc_per || '-'}</td>
                  <td>{row.hsc_year || '-'}</td>
                  <td>{row.diploma_per || '-'}</td>
                  <td>{row.diploma_year || '-'}</td>
                  <td>{row.degree_per || '-'}</td>
                  <td>{row.degree_cgpa || '-'}</td>
                  <td>{row.degree_year || '-'}</td>
                  <td>{row.resume || '-'}</td>
                  <td>{row.intrested_in || '-'}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={downloadExcel}>Download as Excel</button>
    </div>
    
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default CompanySearch;


// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import * as XLSX from 'xlsx';
// import api from 'api';

// const CompanySearch = () => {
//   const [selectedCompany, setSelectedCompany] = useState(null);
//   const [data, setData] = useState([]);
//   const [companyDetails, setCompanyDetails] = useState([]);
//   const [hasTrackerQuestion, setHasTrackerQuestion] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [trackerCompanies, setTrackerCompanies] = useState(new Set());
//   const [answers, setAnswers] = useState([]);

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const handleCompanyChange = (selectedOption) => {
//     setSelectedCompany(selectedOption);
//     const hasTracker = trackerCompanies.has(selectedOption.value);
//     setHasTrackerQuestion(hasTracker);
//     fetchRegistered(selectedOption.value);
//     if (hasTracker) {
//       fetchQuestions(selectedOption.value);
//       fetchAnswers(selectedOption.value);
//     }
//   };

//   const fetchCompanies = () => {
//     api
//       .get("rsl/getcompanies")
//       .then((res) => {
//         setCompanyDetails(res.data);
//         const trackerCompanyIds = new Set(
//           res.data.filter(company => company.tracker === "yes").map(company => company.id)
//         );
//         setTrackerCompanies(trackerCompanyIds);
//       })
//       .catch((err) => {
//         console.error("Error fetching company details:", err);
//       });
//   };

//   const fetchRegistered = (companyId) => {
//     api
//       .get(`rsl/getregistered/${companyId}`)
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching registered students:", err);
//       });
//   };

//   const fetchQuestions = (companyId) => {
//     api
//       .get(`que/getquestions/${companyId}`)
//       .then((res) => {
//         const questionsData = res.data[0]?.question || [];
//         setQuestions(questionsData);
//       })
//       .catch((err) => {
//         console.error("Error fetching questions:", err);
//       });
//   };

//   const fetchAnswers = (companyId) => {
//     api
//       .get(`que/getanswers/${companyId}`)
//       .then((res) => {
//         const answersData = res.data[0]?.que_answers || [];
//         setAnswers(answersData);
//       })
//       .catch((err) => {
//         console.error("Error fetching questions:", err);
//       });
//   };

//   const downloadExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'College Data');
//     XLSX.writeFile(wb, 'college_data.xlsx');
//   };

//   const customStyles = {
//     control: (provided) => ({
//       ...provided,
//       minWidth: '200px',
//     }),
//   };

//   return (
//     <div className='m-4'>
//       <Select 
//         className='w-1/3 mx-auto my-3'
//         options={companyDetails.map(company => ({ value: company.id, label: company.id }))}
//         onChange={handleCompanyChange} 
//         placeholder="Search for a company..."
//         styles={customStyles}
//       />
//       {selectedCompany && data.length > 0 ? (
//         <div>
//           <table border="1" className="my-20">
//             <thead>
//               <tr>
//                 <th>College ID</th>
//                 {hasTrackerQuestion && questions.length > 0 && questions.map((question, index) => (
//                   <th key={index}>{question.question}</th>
//                 ))}
//                 {!hasTrackerQuestion && (
//                   <>
//                     <th>Email</th>
//                     <th>Name</th>
//                     <th>Contact</th>
//                     <th>Gender</th>
//                     <th>DOB</th>
//                     <th>Branch</th>
//                     <th>Degree Year</th>
//                     <th>Location</th>
//                     <th>10th%</th>
//                     <th>10th Passing</th>
//                     <th>12th%</th>
//                     <th>12th Passing</th>
//                     <th>Diploma%</th>
//                     <th>Diploma Passing</th>
//                     <th>Degree %</th>
//                     <th>Degree CGPA</th>
//                     <th>Degree Passing</th>
//                     <th>Resume</th>
//                     <th>Interested In</th>
//                   </>
//                 )}
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((row, index) => (
//                 <tr key={index}>
//                   <td>{row.clg_id}</td>
//                   {hasTrackerQuestion && answers.length > 0 && answers.map((answer, aIndex) => (
//                     <td key={aIndex}>{row[answer.que_answers] || 'NA'}</td>
//                   ))}
//                   {!hasTrackerQuestion && (
//                     <>
//                       <td>{row.email_id}</td>
//                       <td>{`${row.first_name} ${row.middle_name} ${row.last_name}`}</td>
//                       <td>{row.mobile}</td>
//                       <td>{row.gender}</td>
//                       <td>{new Date(row.dob).toLocaleDateString()}</td>
//                       <td>{row.branch}</td>
//                       <td>{row.degree}</td>
//                       <td>{row.loc || '-'}</td>
//                       <td>{row.ssc_per || '-'}</td>
//                       <td>{row.ssc_year || '-'}</td>
//                       <td>{row.hsc_per || '-'}</td>
//                       <td>{row.hsc_year || '-'}</td>
//                       <td>{row.diploma_per || '-'}</td>
//                       <td>{row.diploma_year || '-'}</td>
//                       <td>{row.degree_per || '-'}</td>
//                       <td>{row.degree_cgpa || '-'}</td>
//                       <td>{row.degree_year || '-'}</td>
//                       <td>{row.resume || '-'}</td>
//                       <td>{row.intrested_in || '-'}</td>
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button onClick={downloadExcel}>Download as Excel</button>
//         </div>
//       ) : (
//         <p>No data available</p>
//       )}
//     </div>
//   );
// };

// export default CompanySearch;
