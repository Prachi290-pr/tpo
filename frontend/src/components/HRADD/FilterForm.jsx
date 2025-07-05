import React from "react";

const FilterForm = ({
  filterMode,
  setFilterMode,
  filterYear,
  setFilterYear,
  clearFilters,
}) => (
  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
   
    
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      onClick={() => {
        // setFilterMode("");
        // setFilterYear("");
        clearFilters();
        // setFilterMode("");
        // setFilterYear("");
        // setSearchQuery("");
        // setShowList(false);
        // setIsHRListButtonVisible(true);
      }}
    >
      Clear Filters
    </button>
  </div>
);

export default FilterForm;
