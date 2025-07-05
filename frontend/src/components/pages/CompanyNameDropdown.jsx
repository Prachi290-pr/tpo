// import React, { useEffect, useState } from "react";
// // import axios from "axios";
// import PropTypes from "prop-types";
// import api from '../../api';

// const CompanyNameDropdown = ({ selectedCompany, handleCompanyChange }) => {
//   const [companies, setCompanies] = useState([]);

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const fetchCompanies = () => {
//     api
//       .get("driveStatus/getcompany")
//       .then((res) => {
//         setCompanies(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching students:", err);
//       });
//   };

//   return (
//     // <div className="mb-4">
//     //   <label className="mb-2">
//     //     <span className="text-gray-700">Filter by Company:</span>
//     //     <select
//     //       value={selectedCompany}
//     //       onChange={handleCompanyChange}
//     //       className="flex-1 p-3 border rounded shadow-lg rounded-md"
//     //     >
//     //       <option value="">All</option>
//     //       {companies.map((company) => (
//     //         <option key={company.id} value={company.name}>
//     //           {company.name}
//     //         </option>
//     //       ))}
//     //     </select>
//     //   </label>
//     // </div>
//     <div className="w-full mb-4">
//     <label className="block mb-2">
//       <span className="text-gray-700">Filter by Company:</span>
//       <select
//         value={selectedCompany}
//         onChange={handleCompanyChange}
//         className="block w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm"
//       >
//         <option value="">All</option>
//         {companies.map((company) => (
//           <option key={company.id} value={company.name}>
//             {company.name}
//           </option>
//         ))}
//       </select>
//     </label>
//   </div>
//   );
// };

// CompanyNameDropdown.propTypes = {
//   selectedCompany: PropTypes.string.isRequired,
//   handleCompanyChange: PropTypes.func.isRequired,
// };

// export default CompanyNameDropdown;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../api";


const CompanyNameDropdown = ({ selectedCompany, handleCompanyChange }) => {
  const [companies, setCompanies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    setFilteredCompanies(companies);
  }, [companies]);

  const fetchCompanies = () => {
    api
      .get("driveStatus/getcompany")
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((err) => {
        console.error("Error fetching companies:", err);
      });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setShowSuggestions(true);

    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  const handleCompanySelect = (company) => {
    setInputValue(company.name);
    handleCompanyChange({ target: { value: company.name } }); // Simulate a change event
    setFilteredCompanies(companies); // Reset suggestions
    setShowSuggestions(false); // Hide suggestions list
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown-container')) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full mb-4 dropdown-container">
      <label className="block mb-2">
        <span className="text-gray-700 mr-3">Filter by Company:</span>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-lg"
          placeholder="Type to filter..."
        />
        {showSuggestions && inputValue && (
          <ul className="mt-2 border border-gray-300 rounded-md shadow-lg">
            {filteredCompanies.map((company) => (
              <li
                key={company.id}
                onClick={() => handleCompanySelect(company)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {company.name}
              </li>
            ))}
          </ul>
        )}
      </label>
    </div>
  );
};

CompanyNameDropdown.propTypes = {
  selectedCompany: PropTypes.string.isRequired,
  handleCompanyChange: PropTypes.func.isRequired,
};

export default CompanyNameDropdown;

