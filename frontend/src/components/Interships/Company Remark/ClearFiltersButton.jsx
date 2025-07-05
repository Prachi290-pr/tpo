// import React from "react";

// const ClearFiltersButton = ({ onClick }) => {
//   return (
//     <button className="clearFilterButton" onClick={onClick}>
//       Clear Filters
//     </button>
//   );
// };

// export default ClearFiltersButton;

// newely ui added

import React from "react";

const ClearFiltersButton = ({ onClick }) => {
  return (
    // <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700  mr-2 mx-2" onClick={onClick}>
        Clear Filters
      </button>
    // </div>
  );
};

export default ClearFiltersButton;
