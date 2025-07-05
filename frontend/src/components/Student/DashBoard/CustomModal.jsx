import React from "react";

const CustomModal = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            Close
          </button>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};

CustomModal.open = ({ title, content }) => {
  // Implementation to render modal in your application
  // Example: ReactDOM.createPortal(<CustomModal title={title} content={content} />, document.body);
  console.log(`Showing modal for ${title}`);
};

export default CustomModal;


// import React from "react";

// const CustomModal = ({ title, content, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">{title}</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 focus:outline-none"
//           >
//             Close
//           </button>
//         </div>
//         <div>{content}</div>
//       </div>
//     </div>
//   );
// };

// CustomModal.open = ({ title, content }) => {
//   // Implementation to render modal in your application
//   // Example: ReactDOM.createPortal(<CustomModal title={title} content={content} />, document.body);
//   console.log(`Showing modal for ${title}`);
// };

// export default CustomModal;
