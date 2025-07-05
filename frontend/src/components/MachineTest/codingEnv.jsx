// // import React, { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import { Editor } from "@monaco-editor/react";
// // // import { Button } from "@/components/ui/button"; // Tailwind button component
// // // import { useAuthStore } from "@/store/authStore";
// // import api from "../../api"; // Axios instance for API calls
// // import axios from "axios";

// // const CodingEnvironmentPage = () => {
// //   const { practicalId } = useParams();
// //   const [courseName, setCourseName] = useState("");
// //   const [practicalName, setPracticalName] = useState("");
// //   const [pdfUrl, setPdfUrl] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [testCases, setTestCases] = useState([]);
// //   const [language, setLanguage] = useState("");
// //   const [languages, setLanguages] = useState([]);
// //   const [code, setCode] = useState("");
// //   const [Subcode, setSubmittedCode] = useState("");
// //   const [output, setOutput] = useState([]);
// // //   setSubmittedCode(code);

// // //   const { user } = useAuthStore();
  
// //   useEffect(() => {
// //     const fetchPracticalDetails = async () => {
// //       try {
// //         const response = await api.get(`/machinetest/practicals/${practicalId}`);
// //         const { course_name, practical_name, pdf_url, description, prac_io } =
// //           response.data;
// //         setCourseName(course_name);
// //         setPracticalName(practical_name);
// //         setPdfUrl(pdf_url);
// //         setDescription(description);
// //         setTestCases(prac_io.filter((io) => io));

// //         console.log("pr",prac_io)
// //       } catch (error) {
// //         console.error("Failed to fetch practical details", error);
// //       }
// //     };

// //     const fetchPracticalLanguages = async () => {
// //       try {
// //         const response = await api.get(`/machinetest/practicals/${practicalId}/languages`);
// //         const fetchedLanguages = response.data || []; // Ensure it is an array
// //         console.log(fetchedLanguages)
// //         setLanguages(fetchedLanguages);
// //         // // if (fetchedLanguages.length > 0) {
// //         // //   setLanguage(
// //         // //     fetchedLanguages[0].programming_language_id?.toString() || ""
// //         // //   );
// //         // }
// //       } catch (error) {
// //         console.error("Failed to fetch practical languages", error);
// //       }
// //     };

// //     fetchPracticalDetails();
// //     fetchPracticalLanguages();
// //   }, [practicalId]);

// //   const handleFinalSubmit = async () => {

// //     try {
// //         let runTime = 0;

// //         const times = output.map(output => parseFloat(output.time));
// //         const totalTime = times.reduce((accumulator, currentTime) => accumulator + currentTime, 0);
// //         const Nlan = getJudge0LanguageName(language)
// //         console.log(Nlan);
// //       const response = await api.post("/machinetest/submissions", {
// //         submitedCode:Subcode,
// //         languages:Nlan,
// //         total_testCase:testCases.length,
// //         passed_cases:output.length,
// //         prac_id: practicalId,
// //         output:output,
// //         runTime:totalTime
// //       });

// //       if (response.data.success) {
// //         alert("Code submitted successfully");
// //       } else {
// //         alert("Submission failed: " + response.data.message);
// //       }
// //     } catch (error) {
// //       alert("Failed to submit code");
// //     }
// //   };

// // const JUDGE0_API_URL = 'https://mycompiler.getflytechnologies.com/submissions';

// // const getJudge0LanguageId = (selectedLang) => {
// //     const lang = languages.find(
// //       (lang) =>
// //         lang.programming_language_id?.toString() ===
// //         selectedLang
// //     );
// //     return lang ? lang.programming_language_id : 71; // Default to Python 3 if not found
// //   };

// //   const getJudge0LanguageName = (selectedLang) => {
// //     const lang = languages.find(
// //       (lang) =>
// //         lang.programming_language_id?.toString() ===
// //         selectedLang
// //     );
// //     return lang ? lang.language_name : ""; // Default to Python 3 if not found
// //   };


// // const handleSubmit = async () => {
    
// //     try {
// //       setOutput([]);
// //       setSubmittedCode(code);
// //       const judge0LangId = getJudge0LanguageId(language);

// //       testCases.forEach(async(e)=>{
// //         console.log(e);

// //          const response = await axios.post(
// //             JUDGE0_API_URL,
// //             {
// //               source_code: code,
// //               language_id: judge0LangId,
// //               stdin: e.input, // Test case input if available
// //               expected_output: e.output, // Expected output if available (optional)
// //             },
// //             {
// //               headers: {
// //                 "Content-Type": "application/json",
// //                 "X-Auth-Token": '',
// //               },
// //             }
// //           );
// //           const { token } = response.data;
// //           // 2. Poll for result
// //           const pollResult = async () => {
// //             const result = await axios.get(`${JUDGE0_API_URL}/${token}`, {
// //               headers: {
// //                 "X-Auth-Token": "",
// //               },
// //             });
    
// //             if (result.data.status.id <= 2) {
// //               // If still processing, poll again
// //               setTimeout(pollResult, 1000);
// //             } else {
// //                 console.log(result.data.status);
// //                 if(result.data.status.description == 'Accepted'){
// //                     setOutput((prevOutput) => [...prevOutput, result.data]); // Set output based on result
// //                 }
// //             }
// //           };
// //           pollResult();
// //       })
// //     } catch (error) {
// //     //   setLoading(false);
// //     console.log(error);
// //       alert({
// //         error
// //       });
// //     }
// //   };


// //   return (
// //     <div className="container mx-auto p-4">

// //       <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
// //         <h2 className="text-2xl font-semibold text-blue-700 mb-2">{practicalName}</h2>
// //         <h3 className="text-lg font-semibold mb-2">Description</h3>
// //         <pre className="mb-4">{description}</pre>
// //         {pdfUrl && (
// //           <a
// //             href={pdfUrl}
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             className="text-blue-500 hover:underline"
// //           >
// //             View PDF
// //           </a>
// //         )}
// //       </div>

// //       <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
// //         <h3 className="text-lg font-semibold mb-2">Test Cases</h3>
// //         {testCases.map((testCase, index) => (
// //           <div key={index} className="mb-4">
// //             <p className="text-sm font-medium">Input: {testCase.input}</p>
// //             <p className="text-sm">Output: {testCase.output}</p>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="mb-6">
// //         <label className="block text-lg font-medium mb-2" htmlFor="language">
// //           Select Language
// //         </label>
// //         <div className="relative">
// //           <select
// //             id="language"
// //             value={language}
// //             onChange={(e) => setLanguage(e.target.value)}
// //             className="block w-full bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
// //           >
// //             <option value="">Select language</option>
// //             {languages.map((lang) => (
// //               <option
// //                 key={lang.prac_language_id}
// //                 value={lang.programming_language_id?.toString()}
// //               >
// //                 {lang.language_name || "Unknown Language"}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //       </div>
// //       <h1>Passed Test Cases : {output.length>0 ? output.length+"/"+testCases.length : ""}</h1>
// //       <div className="mb-6">
// //         <Editor
// //           height="400px"
// //           language={
// //             languages.find(
// //               (lang) =>
// //                 lang.programming_language_id?.toString() ===
// //                 language
// //             )?.language_name || "javascript"
// //           }
// //           value={code}
// //           onChange={setCode}
// //           theme="vs-dark"
// //         />
// //       </div>

// //       <div className="flex justify-between">
// //         <button
// //             onClick={handleSubmit}
// //             className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700"
// //         >
// //             Run Test Cases
// //         </button>

// //         <button
// //             onClick={handleFinalSubmit}
// //             className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700"
// //         >
// //             Final Submit
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CodingEnvironmentPage;


// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Editor } from "@monaco-editor/react";
// // import { Button } from "@/components/ui/button"; // Tailwind button component
// // import { useAuthStore } from "@/store/authStore";
// import api from "../../api"; // Axios instance for API calls
// import axios from "axios";

// const CodingEnvironmentPage = () => {
//   const { practicalId } = useParams();
//   const [courseName, setCourseName] = useState("");
//   const [practicalName, setPracticalName] = useState("");
//   const [pdfUrl, setPdfUrl] = useState("");
//   const [description, setDescription] = useState("");
//   const [testCases, setTestCases] = useState([]);
//   const [language, setLanguage] = useState("");
//   const [languages, setLanguages] = useState([]);
//   const [code, setCode] = useState("");
//   const [Subcode, setSubmittedCode] = useState("");
//   const [output, setOutput] = useState([]);
//   const [AllOut, setAllOutput] = useState([]);
// //   setSubmittedCode(code);

// //   const { user } = useAuthStore();
  
//   useEffect(() => {
//     const fetchPracticalDetails = async () => {
//       try {
//         const response = await api.get(`/machinetest/practicals/${practicalId}`);
//         const { course_name, practical_name, pdf_url, description, prac_io } =
//           response.data;
//         setCourseName(course_name);
//         setPracticalName(practical_name);
//         setPdfUrl(pdf_url);
//         setDescription(description);
//         setTestCases(prac_io.filter((io) => io));

//         console.log("pr",prac_io)
//       } catch (error) {
//         console.error("Failed to fetch practical details", error);
//       }
//     };

//     const fetchPracticalLanguages = async () => {
//       try {
//         const response = await api.get(`/machinetest/practicals/${practicalId}/languages`);
//         const fetchedLanguages = response.data || []; // Ensure it is an array
//         console.log(fetchedLanguages)
//         setLanguages(fetchedLanguages);
//         // // if (fetchedLanguages.length > 0) {
//         // //   setLanguage(
//         // //     fetchedLanguages[0].programming_language_id?.toString() || ""
//         // //   );
//         // }
//       } catch (error) {
//         console.error("Failed to fetch practical languages", error);
//       }
//     };

//     fetchPracticalDetails();
//     fetchPracticalLanguages();
//   }, [practicalId]);

//   const handleFinalSubmit = async () => {

//     try {
//         let runTime = 0;

//         const times = output.map(output => parseFloat(output.time));
//         const totalTime = times.reduce((accumulator, currentTime) => accumulator + currentTime, 0);
//         const Nlan = getJudge0LanguageName(language)
//         console.log(Nlan);
//         const response = await api.post("/machinetest/submissions", {
//           submitedCode:Subcode,
//           languages:Nlan,
//           total_testCase:testCases.length,
//           passed_cases:output.length,
//           prac_id: practicalId,
//           output:output,
//           runTime:totalTime
//         });

//       if (response.data.success) {
//         alert("Code submitted successfully");
//       } else {
//         alert("Submission failed: " + response.data.message);
//       }
//     } catch (error) {
//       alert("Failed to submit code");
//     }
//   };

// const JUDGE0_API_URL = 'https://mycompiler.getflytechnologies.com/submissions';

// const getJudge0LanguageId = (selectedLang) => {
//     const lang = languages.find(
//       (lang) =>
//         lang.programming_language_id?.toString() === selectedLang
//     );
//     return lang ? lang.programming_language_id : 71; // Default to Python 3 if not found
//   };

//   const getJudge0LanguageName = (selectedLang) => {
//     const lang = languages.find(
//       (lang) =>
//         lang.programming_language_id?.toString() ===
//         selectedLang
//     );
//     return lang ? lang.language_name : ""; // Default to Python 3 if not found
//   };


// const handleSubmit = async () => {
    
//     try {
//       setOutput([]);
//       setAllOutput([]);
//       setSubmittedCode(code);
//       const judge0LangId = getJudge0LanguageId(language);

//       testCases.forEach(async(e)=>{
//         const inp = e.input;
//         const outp = e.output;

//          const response = await axios.post(
//             JUDGE0_API_URL,
//             {
//               source_code: code,
//               language_id: judge0LangId,
//               stdin: inp, // Test case input if available
//               expected_output: outp, // Expected output if available (optional)
//             },
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 "X-Auth-Token": '',
//               },
//             }
//           );
//           const { token } = response.data;
//           // 2. Poll for result
//           const pollResult = async () => {
//             const result = await axios.get(`${JUDGE0_API_URL}/${token}`, {
//               headers: {
//                 "X-Auth-Token": "",
//               },
//             });
    
//             if (result.data.status.id <= 2) {
//               // If still processing, poll again
//               setTimeout(pollResult, 1000);
//             } else {
//                 console.log(result.data);
//                 if(result.data.status.description == 'Accepted'){
//                     setOutput((prevOutput) => [...prevOutput, result.data]); // Set output based on result
//                 }
//                 setAllOutput((prevOutput) => [...prevOutput, result.data]); // Set output based on result
//             }
//           };
//           pollResult();
//       })
//     } catch (error) {
//     //   setLoading(false);
//     console.log(error);
//       alert({
//         error
//       });
//     }
//   };


//   return (
//     <div className="container mx-auto p-4">

//       <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
//         <h2 className="text-2xl font-semibold text-blue-700 mb-2">{practicalName}</h2>
//         <h3 className="text-lg font-semibold mb-2">Description</h3>
//         <pre className="mb-4" style={{textWrap:'auto'}}>{description}</pre>
//         {pdfUrl && (
//           <a
//             href={pdfUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 hover:underline"
//           >
//             View PDF
//           </a>
//         )}
//       </div>

//       <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
//         <h3 className="text-lg font-semibold mb-2">Test Cases</h3>
//         {testCases.map((testCase, index) => (
//           <div key={index} className="mb-4">
//             <p className="text-sm font-medium">Input: {testCase.input}</p>
//             <p className="text-sm">Output: {testCase.output}</p>
//           </div>
//         ))}
//       </div>

//       <div className="mb-6">
//         <label className="block text-lg font-medium mb-2" htmlFor="language">
//           Select Language
//         </label>
//         <div className="relative">
//           <select
//             id="language"
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="block w-full bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//           >
//             <option value="">Select language</option>
//             {languages.map((lang) => (
//               <option
//                 key={lang.prac_language_id}
//                 value={lang.programming_language_id?.toString()}
//               >
//                 {lang.language_name || "Unknown Language"}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
//     <h3 className="text-lg font-semibold mb-2">Output</h3>
//     {console.log(AllOut)}
//     {AllOut.length > 0 ? (
      
//       AllOut.map((out, index) => (
//         <div key={index} className="mb-4">
//           <p className="text-sm font-medium">Test Case {index + 1} Output: {out.status.description}</p>
//           <pre className="bg-gray-100 p-2 rounded-lg">{out.stdout}</pre>
//           <pre className="bg-gray-100 p-2 rounded-lg">{out.stderr}</pre>
//         </div>
//       ))
//     ) : (
//       <p className="text-sm text-gray-600">No output generated yet.</p>
//     )}
//   </div>


//       <h1>Passed Test Cases : {output.length>0 ? output.length+"/"+testCases.length : ""}</h1>
//       <div className="mb-6">
//         <Editor
//           height="400px"
//           language={
//             languages.find(
//               (lang) =>
//                 lang.programming_language_id?.toString() ===
//                 language
//             )?.language_name || "javascript"
//           }
//           value={code}
//           onChange={setCode}
//           theme="vs-dark"
//         />
//       </div>

//       <div className="flex justify-between">
//         <button
//             onClick={handleSubmit}
//             className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700"
//         >
//             Run Test Cases
//         </button>

//         <button
//             onClick={handleFinalSubmit}
//             className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700"
//         >
//             Final Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CodingEnvironmentPage;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Editor } from "@monaco-editor/react";
// import { Button } from "@/components/ui/button"; // Tailwind button component
// import { useAuthStore } from "@/store/authStore";
import api from "../../api"; // Axios instance for API calls
import axios from "axios";

const CodingEnvironmentPage = () => {
  const { practicalId } = useParams();
  const [courseName, setCourseName] = useState("");
  const [practicalName, setPracticalName] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [description, setDescription] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [language, setLanguage] = useState("");
  const [languages, setLanguages] = useState([]);
  const [code, setCode] = useState("");
  const [Subcode, setSubmittedCode] = useState("");
  const [output, setOutput] = useState([]);
  const [AllOut, setAllOutput] = useState([]);
  const [AllOutCases, setAllOutCases] = useState([]);
//   setSubmittedCode(code);

//   const { user } = useAuthStore();
  
  useEffect(() => {
    const fetchPracticalDetails = async () => {
      try {
        const response = await api.get(`/machinetest/practicals/${practicalId}`);
        const { course_name, practical_name, pdf_url, description, prac_io } =
          response.data;
        setCourseName(course_name);
        setPracticalName(practical_name);
        setPdfUrl(pdf_url);
        setDescription(description);
        setTestCases(prac_io.filter((io) => io));

        console.log("pr",prac_io)
      } catch (error) {
        console.error("Failed to fetch practical details", error);
      }
    };

    const fetchPracticalLanguages = async () => {
      try {
        const response = await api.get(`/machinetest/practicals/${practicalId}/languages`);
        const fetchedLanguages = response.data || []; // Ensure it is an array
        console.log(fetchedLanguages)
        setLanguages(fetchedLanguages);
        // // if (fetchedLanguages.length > 0) {
        // //   setLanguage(
        // //     fetchedLanguages[0].programming_language_id?.toString() || ""
        // //   );
        // }
      } catch (error) {
        console.error("Failed to fetch practical languages", error);
      }
    };

    fetchPracticalDetails();
    fetchPracticalLanguages();
  }, [practicalId]);

  const handleFinalSubmit = async () => {

    try {
        let runTime = 0;

        const times = output.map(output => parseFloat(output.time));
        const totalTime = times.reduce((accumulator, currentTime) => accumulator + currentTime, 0);
        const Nlan = getJudge0LanguageName(language)
        console.log(Nlan);
        const response = await api.post("/machinetest/submissions", {
          submitedCode:Subcode,
          languages:Nlan,
          total_testCase:testCases.length,
          passed_cases:output.length,
          prac_id: practicalId,
          output:output,
          runTime:totalTime
        });

      if (response.data.success) {
        alert("Code submitted successfully");
        window.open('/','_self');
      } else {
        alert("Submission failed: " + response.data.message);
      }
    } catch (error) {
      alert("Failed to submit code");
    }
  };

const JUDGE0_API_URL = 'https://mycompiler.getflytechnologies.com/submissions';

// const JUDGE0_API_URL = 'http://localhost:2358/submissions';

const getJudge0LanguageId = (selectedLang) => {
    const lang = languages.find(
      (lang) =>
        lang.programming_language_id?.toString() === selectedLang
    );
    return lang ? lang.programming_language_id : 71; // Default to Python 3 if not found
  };

  const getJudge0LanguageName = (selectedLang) => {
    const lang = languages.find(
      (lang) =>
        lang.programming_language_id?.toString() ===
        selectedLang
    );
    return lang ? lang.language_name : ""; // Default to Python 3 if not found
  };


  const handleSubmit = async () => {
    try {
      setOutput([]);
      setAllOutput([]);
      setSubmittedCode(code);
      const judge0LangId = getJudge0LanguageId(language);
  
      testCases.forEach(async (testCase, index) => {
        const inp = testCase.input;
        const outp = testCase.output;
  
        try {
          const response = await axios.post(
            JUDGE0_API_URL,
            {
              source_code: code,
              language_id: judge0LangId,
              stdin: inp, // Test case input
              expected_output: outp, // Expected output
            },
            {
              headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": "",
              },
            }
          );
          const { token } = response.data;
  
          // Poll for result
          const pollResult = async () => {
            const result = await axios.get(`${JUDGE0_API_URL}/${token}`, {
              headers: {
                "X-Auth-Token": "",
              },
            });
  
            if (result.data.status.id <= 2) {
              // If still processing, poll again
              setTimeout(pollResult, 1000);
            } else {
              const augmentedResult = {
                ...result.data,
                inp, // Add test case input
                outp, // Add expected output
              };
  
              if (result.data.status.description === "Accepted") {
                setOutput((prevOutput) => [...prevOutput, augmentedResult]);
              }
  
              setAllOutput((prevOutput) => [...prevOutput, augmentedResult]);
            }
          };
          pollResult();
        } catch (error) {
          console.error(`Error running test case ${index + 1}`, error);
        }
      });
    } catch (error) {
      console.error("Failed to submit test cases", error);
      alert("An error occurred while running test cases.");
    }
  };
  


  return (
    <div className="container mx-auto p-4">

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-blue-700 mb-2">{practicalName}</h2>
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <pre className="mb-4">{description}</pre>
        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View PDF
          </a>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-2">Test Cases</h3>
        {testCases.map((testCase, index) => (
          <div key={index} className="mb-4">
            <p className="text-sm font-medium">Input: {testCase.input}</p>
            <p className="text-sm">Output: {testCase.output}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium mb-2" htmlFor="language">
          Select Language
        </label>
        <div className="relative">
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="block w-full bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select language</option>
            {languages.map((lang) => (
              <option
                key={lang.prac_language_id}
                value={lang.programming_language_id?.toString()}
              >
                {lang.language_name || "Unknown Language"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
  <h3 className="text-lg font-semibold mb-2">Output</h3>
  {AllOut.length > 0 ? (
    AllOut.map((out, index) => (
      <div key={index} className="mb-4">
        <p className="text-sm font-medium">Test Case {index + 1}</p>
        <p className="text-sm">Input: {out.inp}</p>
        <p className="text-sm">Expected Output: {out.outp}</p>
        <p className="text-sm">
          Status: <span className={out.status.description === "Accepted" ? "text-green-500" : "text-red-500"}>{out.status.description}</span>
        </p>
        {out.stdout && (
          <pre className="bg-gray-100 p-2 rounded-lg">Output: {out.stdout}</pre>
        )}
        {out.stderr && (
          <pre className="bg-gray-100 p-2 rounded-lg">Error: {out.stderr}</pre>
        )}
      </div>
    ))
  ) : (
    <p className="text-sm text-gray-600">No output generated yet.</p>
  )}
</div>



      <h1>Passed Test Cases : {output.length>0 ? output.length+"/"+testCases.length : ""}</h1>
      <div className="mb-6">
        <Editor
          height="400px"
          language={
            languages.find(
              (lang) =>
                lang.programming_language_id?.toString() ===
                language
            )?.language_name || "javascript"
          }
          value={code}
          onChange={setCode}
          theme="vs-dark"
        />
      </div>

      <div className="flex justify-between">
        <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700"
        >
            Run Test Cases
        </button>

        <button
            onClick={handleFinalSubmit}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700"
        >
            Final Submit
        </button>
      </div>
    </div>
  );
};

export default CodingEnvironmentPage;
