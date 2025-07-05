import React from "react";
import TableComponent from "./TableComponent"; // Adjust the path as necessary

const TableComponentContainer = () => {
  return (
    <div className="container mx-auto p-4">
      {/* <h4 className="font-bold text-4xl text-center text-black-700 my-4">
        Confirm Companies
      </h4> */}
      {/* <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Confirm Companies
      </h1> */}
      <TableComponent />
    </div>
  );
};

export default TableComponentContainer;
