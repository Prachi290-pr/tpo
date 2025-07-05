/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../../api";
import PropTypes from "prop-types";

const TimesVisitedDropdown = ({
  selectedTimesVisited,
  handleTimesVisitedChange,
}) => {
  const [timesVisited, setTimesVisited] = useState([]);

  useEffect(() => {
    fetchTimesVisited();
  }, []);

  const fetchTimesVisited = () => {
    api
      .get("drivestatus/getvisited")
      .then((res) => {
        setTimesVisited(res.data);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  };

  return (
    // <div className="mb-4">
    //   <label className="block mb-2">
    //     <span className="text-gray-700">Time Visited:</span>
    //     <select
    //       value={selectedTimesVisited}
    //       onChange={handleTimesVisitedChange}
    //       className="block w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm"
    //     >
    //       <option value="">All</option>
    //       {timesVisited.map((company) => (
    //         <option key={company.value} value={company.visited}>
    //           {company.visited}
    //         </option>
    //       ))}
    //     </select>
    //   </label>
    // </div>
    <div className="w-full mb-4">
      <label className="block mb-2">
        <span className="text-gray-700 mr-3">Time Visited:</span>
        <select
          value={selectedTimesVisited}
          onChange={handleTimesVisitedChange}
          className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-lg"
        >
          <option value="">All</option>
          {timesVisited.map((company) => (
            <option key={company.value} value={company.visited}>
              {company.visited}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

TimesVisitedDropdown.propTypes = {
  selectedTimesVisited: PropTypes.string.isRequired,
  handleTimesVisitedChange: PropTypes.func.isRequired,
};

export default TimesVisitedDropdown;
