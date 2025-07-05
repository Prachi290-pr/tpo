/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import axios from "axios";
import PropTypes from "prop-types";
import api from "../../api";

const YearDropdown = ({ selectedYear, handleYearChange }) => {
  const [years, setYears] = useState([]);

  useEffect(() => {
    fetchYear();
  }, []);

  const fetchYear = () => {
    api
      .get("drivestatus/getyear")
      .then((res) => {
        setYears(res.data);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  };

  return (
    // <div className="mb-4">
    //   <label className="block mb-2">
    //     <span className="text-gray-700">Year:</span>
    //     <select
    //       value={selectedYear}
    //       onChange={handleYearChange}
    //       className="block w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm"
    //     >
    //       <option value="">All</option>
    //       {years.map((company) => (
    //         <option key={company.value} value={company.academic_year}>
    //           {company.academic_year}
    //         </option>
    //       ))}
    //     </select>
    //   </label>
    // </div>
    <div className="w-full mb-4">
      <label className="block mb-2">
        <span className="text-gray-700 mr-3">Year:</span>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className=" w-full mt-2 p-3 border border-gray-300 rounded-md shadow-lg"
        >
          <option value="">All</option>
          {years.map((company) => (
            <option key={company.value} value={company.academic_year}>
              {company.academic_year}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

YearDropdown.propTypes = {
  selectedYear: PropTypes.string.isRequired,
  handleYearChange: PropTypes.func.isRequired,
};

export default YearDropdown;
