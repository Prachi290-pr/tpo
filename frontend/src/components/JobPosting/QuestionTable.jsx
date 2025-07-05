// import React from "react";

// const QuestionTable = ({ questions }) => {
//   return (
//     <div className="section table-container">
//       <h2>Questions</h2>
//       <table className="w-full bg-white shadow-xl rounded-lg overflow-hidden">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="px-4 py-2 text-center text-sm font-medium text-white">Question:</th>
//             <th className="px-4 py-2 text-center text-sm font-medium text-white">Data Type</th>
//           </tr>
//         </thead>
//         <tbody>
//           {questions.map((q, index) => (
//             <tr key={index}>
//               <td>{q.question}</td>
//               <td>{q.type}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default QuestionTable;

import React from "react";

const QuestionTable = ({ questions,onDeleteQuestion }) => {
  return (
    <div className="section table-container">
      <h2>Questions</h2>
      <table className="w-full bg-white shadow-xl rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-center text-sm font-medium text-white">Question:</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white">Data Type</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white">Delete</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, index) => (
            <tr key={index}>
              <td>{q.question}</td>
              <td>{q.type}{q.type=="dropd"? <>({q.options.map(e=>e+',')})</> : ""}</td>
              <td className="text-center">
                <button
                  onClick={() => onDeleteQuestion(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionTable;
