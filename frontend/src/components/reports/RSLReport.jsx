/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import * as XLSX from 'xlsx';
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
        const answersData = res.data.map(answer => ({
          ...answer,
          que_answers: JSON.parse(answer.que_answers),
        }));
        setAnswers(answersData);
      })
      .catch((err) => {
        console.error("Error fetching answers:", err);
      });
  };

  const getAnswerForQuestion = (studentId, questionKey) => {
    console.log(studentId,questionKey)
    const answerObj = answers.find(answer => String(answer.s_id) === String(studentId));
    console.log(answers)
    console.log(data)
    return answerObj ? answerObj.que_answers[questionKey] : 'NA';
  };


  const downloadExcel = () => {
    let srNo = 1;

    const dataToExport = data.map(row => {
      const rowData = {
        "Sr. No.": srNo++,
        "College ID": row.clg_id,
      };
        questions.forEach((question, qIndex) => {
          rowData[question.question] = getAnswerForQuestion(row.s_id, `answer_${question.id}`);
        });
        rowData["Email"] = row.email_id;
        rowData["Name"] = `${row.first_name} ${row.middle_name} ${row.last_name}`;
        rowData["Contact"] = row.mobile;
        rowData["Gender"] = row.gender;
        rowData["DOB"] = new Date(row.dob).toLocaleDateString();
        rowData["Branch"] = row.branch;
        rowData["Degree Year"] = row.degree;
        rowData["Location"] = row.loc || '-';
        rowData["10th Percentage"] = row.ssc_per || '-';
        rowData["10th Passing Year"] = row.ssc_year || '-';
        rowData["12th Percentage"] = row.hsc_per || '-';
        rowData["12th Passing Year"] = row.hsc_year || '-';
        rowData["Diploma Percentage"] = row.diploma_per || '-';
        rowData["Diploma Passing Year"] = row.diploma_year || '-';
        rowData["Degree Percentage"] = row.degree_per || '-';
        rowData["Degree CGPA"] = row.degree_cgpa || '-';
        rowData["Degree Passing Year"] = row.degree_year || '-';
        rowData["Resume"] = row.resume!=undefined ? `https://api.tpo.getflytechnologies.com/auth/viewDoc/resume/${row.resume}` : '-';
        rowData["Interested In"] = row.interested_in || '-';
      return rowData;
    });
  
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student Details");
  
    XLSX.writeFile(workbook, "Student_Details.xlsx");
  }

  // const downloadExcel = () => {
  //   const ws = XLSX.utils.json_to_sheet(data);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'College Data');
  //   XLSX.writeFile(wb, 'college_data.xlsx');
  // };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: '200px',
    }),
  };

console.log('Q',questions)
  return (
    <div className='container mx-auto mt-5'>
      <Select 
        className='w-1/3 mx-auto my-3'
        options={companyDetails.map(company => ({ value: company.id, label: `${company.name} - [${company.roles}] -(${company.batch_date})` }))}
        onChange={handleCompanyChange} 
        placeholder="Search for a company..."
        styles={customStyles}
      />
      {selectedCompany && data.length > 0 ? (
        <div className='overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto'>
          <button className='bg-blue-600 text-white p-3' onClick={downloadExcel}>Download as Excel</button>

          <table border="1" className="">
            <thead className='sticky top-0 bg-gray-800 z-8 w-full'>
              <tr>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Sr. No.</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">College ID</th>
                {hasTrackerQuestion && questions.length > 0 && questions.map((question, index) => (
                  <th className="px-4 py-2 text-center text-sm font-medium text-white" key={index}>{question.question}</th>
                ))}
                {/* {!hasTrackerQuestion && ( */}
                  <>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">Email</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">Name</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">Contact</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">Gender</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">DOB</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">Branch</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree Year</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">Location</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">10th%</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">10th Passing</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">12th%</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">12th Passing</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">Diploma%</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">Diploma Passing</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree %</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree CGPA</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree Passing</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">Resume</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-white">Interested In</th>
                  </>
                {/* )} */}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{row.clg_id}</td>
                  {hasTrackerQuestion && questions.length > 0 && questions.map((question, qIndex) => (
                    <td key={qIndex}>{getAnswerForQuestion(row.s_id, `answer_${question.id}`)}</td>
                  ))}
                  {/* {!hasTrackerQuestion && ( */}
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
                      <td>
                        {
                          row.resume!=undefined ?
                          <a href={`https://api.tpo.getflytechnologies.com/auth/viewDoc/resume/${row.resume}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                            View Resume
                          </a> : "-"
                        }
                        </td>
                      <td>{row.interested_in || '-'}</td>
                    </>
                  {/* )} */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className='text-center'>No data available</p>
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
//         const answersData = res.data.map(answer => ({
//           ...answer,
//           que_answers: JSON.parse(answer.que_answers),
//         }));
//         console.log("Parsed Answers Data:", answersData); // Debugging
//         setAnswers(answersData);
//       })
//       .catch((err) => {
//         console.error("Error fetching answers:", err);
//       });
//   };

//   // const getAnswerForQuestion = (studentId, questionKey) => {
//   //   const answerObj = answers.find(answer => answer.s_id === studentId);
//   //   console.log(`Answer for Student ID ${studentId} and Question Key ${questionKey}:`, answerObj ? answerObj.que_answers[questionKey] : 'NA'); // Debugging
//   //   return answerObj ? answerObj.que_answers[questionKey] : 'NA';
//   // };

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
//                 <th className="px-4 py-2 text-center text-sm font-medium text-white">College ID</th>
//                 {hasTrackerQuestion && questions.length > 0 && questions.map((question, index) => (
//                   <th key={index}>{question.question}</th>
//                 ))}
//                 {!hasTrackerQuestion && (
//                   <>
//                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Email</th>
//                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Name</th>
//                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Contact</th>
//                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Gender</th>
//                     <th className="px-4 py-2 text-center text-sm font-medium text-white">DOB</th>
//                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Branch</th>
//                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree Year</th>
//                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Location</th>
//                     <th className="px-4 py-2 text-center text-sm font-medium text-white">10th%</th>
//                     <th className="px-4 py-2 text-center text-sm font-medium text-white">10th Passing</th>
//                     <th className="px-4 py-2 text-center text-sm font-medium text-white">12th%</th>
//                     <th className="px-4 py-2 text-center text-sm font-medium text-white">12th Passing</th>
//                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Diploma%</th>
//                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Diploma Passing</th>
//                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree %</th>
//                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree CGPA</th>
//                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree Passing</th>
//                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Resume</th>
//                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Interested In</th>
//                   </>
//                 )}
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((row, index) => (
//                 <tr key={index}>
//                   <td>{row.clg_id}</td>
//                   {console.log(answers)}
//                   {hasTrackerQuestion && questions.length > 0 && questions.map((answers, qIndex) => (
//                     // <td key={qIndex}>{getAnswerForQuestion(row.id, question.id)}</td>
//                     <td key={qIndex}>{(answers.que_answers)}</td>
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


// // /* eslint-disable no-unused-vars */
// // import React, { useState, useEffect } from 'react';
// // import Select from 'react-select';
// // import * as XLSX from 'xlsx';
// // import api from 'api';

// // const CompanySearch = () => {
// //   const [selectedCompany, setSelectedCompany] = useState(null);
// //   const [data, setData] = useState([]);
// //   const [companyDetails, setCompanyDetails] = useState([]);
// //   const [hasTrackerQuestion, setHasTrackerQuestion] = useState(false);
// //   const [questions, setQuestions] = useState([]);
// //   const [trackerCompanies, setTrackerCompanies] = useState(new Set());
// //   const [answers, setAnswers] = useState([]);

// //   useEffect(() => {
// //     fetchCompanies();
// //   }, []);

// //   const handleCompanyChange = (selectedOption) => {
// //     setSelectedCompany(selectedOption);
// //     const hasTracker = trackerCompanies.has(selectedOption.value);
// //     setHasTrackerQuestion(hasTracker);
// //     fetchRegistered(selectedOption.value);
// //     if (hasTracker) {
// //       fetchQuestions(selectedOption.value);
// //       fetchAnswers(selectedOption.value);
// //     }
// //   };

// //   const fetchCompanies = () => {
// //     api
// //       .get("rsl/getcompanies")
// //       .then((res) => {
// //         setCompanyDetails(res.data);
// //         const trackerCompanyIds = new Set(
// //           res.data.filter(company => company.tracker === "yes").map(company => company.id)
// //         );
// //         setTrackerCompanies(trackerCompanyIds);
// //       })
// //       .catch((err) => {
// //         console.error("Error fetching company details:", err);
// //       });
// //   };

// //   const fetchRegistered = (companyId) => {
// //     api
// //       .get(`rsl/getregistered/${companyId}`)
// //       .then((res) => {
// //         setData(res.data);
// //       })
// //       .catch((err) => {
// //         console.error("Error fetching registered students:", err);
// //       });
// //   };

// //   const fetchQuestions = (companyId) => {
// //     api
// //       .get(`que/getquestions/${companyId}`)
// //       .then((res) => {
// //         const questionsData = res.data[0]?.question || [];
// //         setQuestions(questionsData);
// //       })
// //       .catch((err) => {
// //         console.error("Error fetching questions:", err);
// //       });
// //   };

// //   const fetchAnswers = (companyId) => {
// //     api
// //       .get(`que/getanswers/${companyId}`)
// //       .then((res) => {
// //         const answersData = res.data.map(answer => ({
// //           ...answer,
// //           que_answers: JSON.parse(answer.que_answers),
// //         }));
// //         setAnswers(answersData);
// //       })
// //       .catch((err) => {
// //         console.error("Error fetching answers:", err);
// //       });
// //   };

// //   const getAnswerForQuestion = (studentId, questionKey) => {
// //     const answerObj = answers.find(answer => answer.s_id === studentId);
// //     return answerObj ? answerObj.que_answers[questionKey] : 'NA';
// //   };

// //   const downloadExcel = () => {
// //     const ws = XLSX.utils.json_to_sheet(data);
// //     const wb = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(wb, ws, 'College Data');
// //     XLSX.writeFile(wb, 'college_data.xlsx');
// //   };

// //   const customStyles = {
// //     control: (provided) => ({
// //       ...provided,
// //       minWidth: '200px',
// //     }),
// //   };

// //   return (
// //     <div className='m-4'>
// //       <Select 
// //         className='w-1/3 mx-auto my-3'
// //         options={companyDetails.map(company => ({ value: company.id, label: company.name }))}
// //         onChange={handleCompanyChange} 
// //         placeholder="Search for a company..."
// //         styles={customStyles}
// //       />
// //       {selectedCompany && data.length > 0 ? (
// //         <div>
// //           <table border="1" className="my-20">
// //             <thead>
// //               <tr>
// //                 <th className="px-4 py-2 text-center text-sm font-medium text-white">College ID</th>
// //                 {hasTrackerQuestion && questions.length > 0 && questions.map((question, index) => (
// //                   <th key={index}>{question.question}</th>
// //                 ))}
// //                 {!hasTrackerQuestion && (
// //                   <>
// //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Email</th>
// //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Name</th>
// //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Contact</th>
// //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Gender</th>
// //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">DOB</th>
// //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Branch</th>
// //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree Year</th>
// //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Location</th>
// //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">10th%</th>
// //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">10th Passing</th>
// //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">12th%</th>
// //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">12th Passing</th>
// //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Diploma%</th>
// //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Diploma Passing</th>
// //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree %</th>
// //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree CGPA</th>
// //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree Passing</th>
// //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Resume</th>
// //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Interested In</th>
// //                   </>
// //                 )}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {data.map((row, index) => (
// //                 <tr key={index}>
// //                   <td>{row.clg_id}</td>
// //                   {hasTrackerQuestion && questions.length > 0 && questions.map((question, qIndex) => (
// //                     <td key={qIndex}>{getAnswerForQuestion(row.id, question.id)}</td>
// //                   ))}
// //                   {!hasTrackerQuestion && (
// //                     <>
// //                       <td>{row.email_id}</td>
// //                       <td>{`${row.first_name} ${row.middle_name} ${row.last_name}`}</td>
// //                       <td>{row.mobile}</td>
// //                       <td>{row.gender}</td>
// //                       <td>{new Date(row.dob).toLocaleDateString()}</td>
// //                       <td>{row.branch}</td>
// //                       <td>{row.degree}</td>
// //                       <td>{row.loc || '-'}</td>
// //                       <td>{row.ssc_per || '-'}</td>
// //                       <td>{row.ssc_year || '-'}</td>
// //                       <td>{row.hsc_per || '-'}</td>
// //                       <td>{row.hsc_year || '-'}</td>
// //                       <td>{row.diploma_per || '-'}</td>
// //                       <td>{row.diploma_year || '-'}</td>
// //                       <td>{row.degree_per || '-'}</td>
// //                       <td>{row.degree_cgpa || '-'}</td>
// //                       <td>{row.degree_year || '-'}</td>
// //                       <td>{row.resume || '-'}</td>
// //                       <td>{row.intrested_in || '-'}</td>
// //                     </>
// //                   )}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //           <button onClick={downloadExcel}>Download as Excel</button>
// //         </div>
// //       ) : (
// //         <p>No data available</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default CompanySearch;


// // // /* eslint-disable no-unused-vars */
// // // import React, { useState, useEffect } from 'react';
// // // import Select from 'react-select';
// // // import * as XLSX from 'xlsx';
// // // import api from 'api';

// // // const CompanySearch = () => {
// // //   const [selectedCompany, setSelectedCompany] = useState(null);
// // //   const [data, setData] = useState([]);
// // //   const [companyDetails, setCompanyDetails] = useState([]);
// // //   const [hasTrackerQuestion, setHasTrackerQuestion] = useState(false);
// // //   const [questions, setQuestions] = useState([]);
// // //   const [trackerCompanies, setTrackerCompanies] = useState(new Set());
// // //   const [answers, setAnswers] = useState([]);

// // //   useEffect(() => {
// // //     fetchCompanies();
// // //   }, []);

// // //   const handleCompanyChange = (selectedOption) => {
// // //     setSelectedCompany(selectedOption);
// // //     const hasTracker = trackerCompanies.has(selectedOption.value);
// // //     setHasTrackerQuestion(hasTracker);
// // //     fetchRegistered(selectedOption.value);
// // //     if (hasTracker) {
// // //       fetchQuestions(selectedOption.value);
// // //       fetchAnswers(selectedOption.value);
// // //     }
// // //   };

// // //   const fetchCompanies = () => {
// // //     api
// // //       .get("rsl/getcompanies")
// // //       .then((res) => {
// // //         setCompanyDetails(res.data);
// // //         const trackerCompanyIds = new Set(
// // //           res.data.filter(company => company.tracker === "yes").map(company => company.id)
// // //         );
// // //         setTrackerCompanies(trackerCompanyIds);
// // //       })
// // //       .catch((err) => {
// // //         console.error("Error fetching company details:", err);
// // //       });
// // //   };

// // //   const fetchRegistered = (companyId) => {
// // //     api
// // //       .get(`rsl/getregistered/${companyId}`)
// // //       .then((res) => {
// // //         setData(res.data);
// // //       })
// // //       .catch((err) => {
// // //         console.error("Error fetching registered students:", err);
// // //       });
// // //   };

// // //   const fetchQuestions = (companyId) => {
// // //     api
// // //       .get(`que/getquestions/${companyId}`)
// // //       .then((res) => {
// // //         const questionsData = res.data[0]?.question || [];
// // //         setQuestions(questionsData);
// // //       })
// // //       .catch((err) => {
// // //         console.error("Error fetching questions:", err);
// // //       });
// // //   };

// // //   const fetchAnswers = (companyId) => {
// // //     api
// // //       .get(`que/getanswers/${companyId}`)
// // //       .then((res) => {
// // //         const answersData = res.data[0]?.que_answers || [];
// // //         setAnswers(Array.isArray(answersData) ? answersData : []);
// // //       })
// // //       .catch((err) => {
// // //         console.error("Error fetching answers:", err);
// // //       });
// // //   };

// // //   const getAnswerForQuestion = (studentId, questionId) => {
// // //     const answerObj = answers.find(answer => answer.student_id === studentId && answer.question_id === questionId);
// // //     return answerObj ? answerObj.answer : 'NA';
// // //   };

// // //   const downloadExcel = () => {
// // //     const ws = XLSX.utils.json_to_sheet(data);
// // //     const wb = XLSX.utils.book_new();
// // //     XLSX.utils.book_append_sheet(wb, ws, 'College Data');
// // //     XLSX.writeFile(wb, 'college_data.xlsx');
// // //   };

// // //   const customStyles = {
// // //     control: (provided) => ({
// // //       ...provided,
// // //       minWidth: '200px',
// // //     }),
// // //   };

// // //   return (
// // //     <div className='m-4'>
// // //       <Select 
// // //         className='w-1/3 mx-auto my-3'
// // //         options={companyDetails.map(company => ({ value: company.id, label: company.name }))}
// // //         onChange={handleCompanyChange} 
// // //         placeholder="Search for a company..."
// // //         styles={customStyles}
// // //       />
// // //       {selectedCompany && data.length > 0 ? (
// // //         <div>
// // //           <table border="1" className="my-20">
// // //             <thead>
// // //               <tr>
// // //                 <th className="px-4 py-2 text-center text-sm font-medium text-white">College ID</th>
// // //                 {hasTrackerQuestion && questions.length > 0 && questions.map((question, index) => (
// // //                   <th key={index}>{question.question}</th>
// // //                 ))}
// // //                 {!hasTrackerQuestion && (
// // //                   <>
// // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Email</th>
// // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Name</th>
// // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Contact</th>
// // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Gender</th>
// // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">DOB</th>
// // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Branch</th>
// // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree Year</th>
// // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Location</th>
// // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">10th%</th>
// // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">10th Passing</th>
// // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">12th%</th>
// // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">12th Passing</th>
// // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Diploma%</th>
// // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Diploma Passing</th>
// // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree %</th>
// // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree CGPA</th>
// // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree Passing</th>
// // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Resume</th>
// // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Interested In</th>
// // //                   </>
// // //                 )}
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {data.map((row, index) => (
// // //                 <tr key={index}>
// // //                   <td>{row.clg_id}</td>
// // //                   {hasTrackerQuestion && questions.length > 0 && questions.map((question, qIndex) => (
// // //                     <td key={qIndex}>{getAnswerForQuestion(row.id, question.id)}</td>
// // //                   ))}
// // //                   {!hasTrackerQuestion && (
// // //                     <>
// // //                       <td>{row.email_id}</td>
// // //                       <td>{`${row.first_name} ${row.middle_name} ${row.last_name}`}</td>
// // //                       <td>{row.mobile}</td>
// // //                       <td>{row.gender}</td>
// // //                       <td>{new Date(row.dob).toLocaleDateString()}</td>
// // //                       <td>{row.branch}</td>
// // //                       <td>{row.degree}</td>
// // //                       <td>{row.loc || '-'}</td>
// // //                       <td>{row.ssc_per || '-'}</td>
// // //                       <td>{row.ssc_year || '-'}</td>
// // //                       <td>{row.hsc_per || '-'}</td>
// // //                       <td>{row.hsc_year || '-'}</td>
// // //                       <td>{row.diploma_per || '-'}</td>
// // //                       <td>{row.diploma_year || '-'}</td>
// // //                       <td>{row.degree_per || '-'}</td>
// // //                       <td>{row.degree_cgpa || '-'}</td>
// // //                       <td>{row.degree_year || '-'}</td>
// // //                       <td>{row.resume || '-'}</td>
// // //                       <td>{row.intrested_in || '-'}</td>
// // //                     </>
// // //                   )}
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //           <button onClick={downloadExcel}>Download as Excel</button>
// // //         </div>
// // //       ) : (
// // //         <p>No data available</p>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default CompanySearch;


// // // // /* eslint-disable no-unused-vars */
// // // // import React, { useState, useEffect } from 'react';
// // // // import Select from 'react-select';
// // // // import * as XLSX from 'xlsx';
// // // // import api from 'api';

// // // // const CompanySearch = () => {
// // // //   const [selectedCompany, setSelectedCompany] = useState(null);
// // // //   const [data, setData] = useState([]);
// // // //   const [companyDetails, setCompanyDetails] = useState([]);
// // // //   const [hasTrackerQuestion, setHasTrackerQuestion] = useState(false);
// // // //   const [questions, setQuestions] = useState([]);
// // // //   const [trackerCompanies, setTrackerCompanies] = useState(new Set());
// // // //   const [answers, setAnswers] = useState([]);

// // // //   useEffect(() => {
// // // //     fetchCompanies();
// // // //   }, []);

// // // //   const handleCompanyChange = (selectedOption) => {
// // // //     setSelectedCompany(selectedOption);
// // // //     const hasTracker = trackerCompanies.has(selectedOption.value);
// // // //     setHasTrackerQuestion(hasTracker);
// // // //     fetchRegistered(selectedOption.value);
// // // //     if (hasTracker) {
// // // //       fetchQuestions(selectedOption.value);
// // // //       fetchAnswers(selectedOption.value);
// // // //     }
// // // //   };

// // // //   const fetchCompanies = () => {
// // // //     api
// // // //       .get("rsl/getcompanies")
// // // //       .then((res) => {
// // // //         setCompanyDetails(res.data);
// // // //         const trackerCompanyIds = new Set(
// // // //           res.data.filter(company => company.tracker === "yes").map(company => company.id)
// // // //         );
// // // //         setTrackerCompanies(trackerCompanyIds);
// // // //       })
// // // //       .catch((err) => {
// // // //         console.error("Error fetching company details:", err);
// // // //       });
// // // //   };

// // // //   const fetchRegistered = (companyId) => {
// // // //     api
// // // //       .get(`rsl/getregistered/${companyId}`)
// // // //       .then((res) => {
// // // //         setData(res.data);
// // // //       })
// // // //       .catch((err) => {
// // // //         console.error("Error fetching registered students:", err);
// // // //       });
// // // //   };

// // // //   const fetchQuestions = (companyId) => {
// // // //     api
// // // //       .get(`que/getquestions/${companyId}`)
// // // //       .then((res) => {
// // // //         const questionsData = res.data[0]?.question || [];
// // // //         setQuestions(questionsData);
// // // //       })
// // // //       .catch((err) => {
// // // //         console.error("Error fetching questions:", err);
// // // //       });
// // // //   };

// // // //   const fetchAnswers = (companyId) => {
// // // //     api
// // // //       .get(`que/getanswers/${companyId}`)
// // // //       .then((res) => {
// // // //         const answersData = res.data[0]?.que_answers || [];
// // // //         setAnswers(answersData);
// // // //       })
// // // //       .catch((err) => {
// // // //         console.error("Error fetching questions:", err);
// // // //       });
// // // //   };

// // // //   const downloadExcel = () => {
// // // //     const ws = XLSX.utils.json_to_sheet(data);
// // // //     const wb = XLSX.utils.book_new();
// // // //     XLSX.utils.book_append_sheet(wb, ws, 'College Data');
// // // //     XLSX.writeFile(wb, 'college_data.xlsx');
// // // //   };

// // // //   const customStyles = {
// // // //     control: (provided) => ({
// // // //       ...provided,
// // // //       minWidth: '200px',
// // // //     }),
// // // //   };

// // // //   return (
// // // //     <div className='m-4'>
// // // //       <Select 
// // // //         className='w-1/3 mx-auto my-3'
// // // //         options={companyDetails.map(company => ({ value: company.id, label: company.id }))}
// // // //         onChange={handleCompanyChange} 
// // // //         placeholder="Search for a company..."
// // // //         styles={customStyles}
// // // //       />
// // // //       {selectedCompany && data.length > 0 ? (
// // // //         <div>
// // // //           <table border="1" className="my-20">
// // // //             <thead>
// // // //               <tr>
// // // //                 <th className="px-4 py-2 text-center text-sm font-medium text-white">College ID</th>
// // // //                 {hasTrackerQuestion && questions.length > 0 && questions.map((question, index) => (
// // // //                   <th key={index}>{question.question}</th>
// // // //                 ))}
// // // //                 {!hasTrackerQuestion && (
// // // //                   <>
// // // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Email</th>
// // // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Name</th>
// // // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Contact</th>
// // // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Gender</th>
// // // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">DOB</th>
// // // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Branch</th>
// // // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree Year</th>
// // // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Location</th>
// // // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">10th%</th>
// // // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">10th Passing</th>
// // // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">12th%</th>
// // // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">12th Passing</th>
// // // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Diploma%</th>
// // // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Diploma Passing</th>
// // // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree %</th>
// // // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree CGPA</th>
// // // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Degree Passing</th>
// // // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Resume</th>
// // // //                     <th className="px-4 py-2 text-center text-sm font-medium text-white">Interested In</th>
// // // //                   </>
// // // //                 )}
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {data.map((row, index) => (
// // // //                 <tr key={index}>
// // // //                   <td>{row.clg_id}</td>
// // // //                   {hasTrackerQuestion && answers.length > 0 && answers.map((answer, aIndex) => (
// // // //                     <td key={aIndex}>{row[answer.que_answers] || 'NA'}</td>
// // // //                   ))}
// // // //                   {!hasTrackerQuestion && (
// // // //                     <>
// // // //                       <td>{row.email_id}</td>
// // // //                       <td>{`${row.first_name} ${row.middle_name} ${row.last_name}`}</td>
// // // //                       <td>{row.mobile}</td>
// // // //                       <td>{row.gender}</td>
// // // //                       <td>{new Date(row.dob).toLocaleDateString()}</td>
// // // //                       <td>{row.branch}</td>
// // // //                       <td>{row.degree}</td>
// // // //                       <td>{row.loc || '-'}</td>
// // // //                       <td>{row.ssc_per || '-'}</td>
// // // //                       <td>{row.ssc_year || '-'}</td>
// // // //                       <td>{row.hsc_per || '-'}</td>
// // // //                       <td>{row.hsc_year || '-'}</td>
// // // //                       <td>{row.diploma_per || '-'}</td>
// // // //                       <td>{row.diploma_year || '-'}</td>
// // // //                       <td>{row.degree_per || '-'}</td>
// // // //                       <td>{row.degree_cgpa || '-'}</td>
// // // //                       <td>{row.degree_year || '-'}</td>
// // // //                       <td>{row.resume || '-'}</td>
// // // //                       <td>{row.intrested_in || '-'}</td>
// // // //                     </>
// // // //                   )}
// // // //                 </tr>
// // // //               ))}
// // // //             </tbody>
// // // //           </table>
// // // //           <button onClick={downloadExcel}>Download as Excel</button>
// // // //         </div>
// // // //       ) : (
// // // //         <p>No data available</p>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default CompanySearch;
