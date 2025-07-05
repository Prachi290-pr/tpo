/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { utils, writeFile } from "xlsx";
import axios from "axios";
import api from "../../api";

const StudentTableGenerator = () => {
  const [selectedFields, setSelectedFields] = useState([]);
  const [students, setStudents] = useState([]);
  const [extra, setExtra] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('ALL'); // Store
  const [selectedBranch, setSelectedBranch] = useState('ALL'); // Store
  const [batches, setBatches] = useState([]);
  const [branch, setBranch] = useState([]);
  const [ssc, setSSC] = useState(0);
  const [hsc, setHSC] = useState(0);
  const [dip, setDip] = useState(0);
  const [deg, setDeg] = useState(0);
  const fields = [
    "tpo_id",
    "clg_id",
    "branch",
    "mobile",
    "gender",
    "degree",
    "dob",
    "loc",
    "ssc_per",
    "ssc_year",
    "hsc_per",
    "hsc_year",
    "diploma_per",
    "diploma_year",
    "degree_per",
    "degree_cgpa",
    "degree_year",
    "resume",
  ];

  const fieldToColumnName = {
    tpo_id: "TPO ID",
    clg_id: "College ID",
    branch: "Branch",
    mobile: "Mobile",
    gender: "Gender",
    degree: "Degree",
    dob: "Date of Birth",
    loc: "Location",
    ssc_per: "SSC Percentage",
    ssc_year: "SSC Year",
    hsc_per: "HSC Percentage",
    hsc_year: "HSC Year",
    diploma_per: "Diploma Percentage",
    diploma_year: "Diploma Year",
    degree_per: "Degree Percentage",
    degree_cgpa: "Degree CGPA",
    degree_year: "Degree Year",
    resume: "Resume",
  };

  const [placedStudents, setPlacedStudents] = useState([]);

  useEffect(() => {
    // fetchPlacedStudents();
    fetchBranches();
    fetchBatches();
  }, []);

  // Function to fetch branches from the backend
const fetchBatches = async () => {
  try {
    api
    .get("/studentgen/getAallBatch")
    .then((res) => {
      setBatches(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.error("Error fetching company details:", err);
    });
  } catch (error) {
    console.error('Error fetching branches:', error);
  }
};

// Function to fetch batches from the backend
const fetchBranches = async () => {
  try {
      api
          .get("/studentgen/getAllBranch")
          .then((res) => {
            setBranch(res.data);
          })
          .catch((err) => {
            console.error("Error fetching company details:", err);
          });
  } catch (error) {
    console.error('Error fetching batches:', error);
  }
};




  const fetchPlacedStudents = () => {
      api
      .post(`/studentgen/getstudentgen/${selectedBranch}/${selectedBatch}`,{
        ssc:ssc,
        hsc:hsc,
        dip:dip,
        deg:deg,
      })
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        alert(err)
        console.error("Error fetching placed students:", err);
      });
  };

  const handleCheckboxChange = (field) => {
    setSelectedFields((prev) =>
      prev.includes(field)
        ? prev.filter((item) => item !== field)
        : [...prev, field]
    );
  };

  const handleGenerate = () => {
    fetchPlacedStudents();
  //   let filteredStudents = placedStudents;

  //   if (selectedBatch) {
  //     if (selectedBranch) {
  //       setStudents(filteredStudents.filter(student => student.branch == selectedBranch && student.degree_year == selectedBatch));
  //     setExtra(filteredStudents.filter(student => student.branch == selectedBranch  && student.degree_year == selectedBatch));
  //   }else{
  //     setStudents(filteredStudents.filter(student => student.degree_year == selectedBatch));
  //     setExtra(filteredStudents.filter(student => student.degree_year == selectedBatch));
  //   }
  //   } else if (selectedBranch) {
  //     setStudents(filteredStudents.filter(student => student.branch == selectedBranch ));
  //   setExtra(filteredStudents.filter(student => student.branch == selectedBranch ));
  // }else{
  //     setStudents(placedStudents);
  //     setExtra(placedStudents);  
  //   }
  };

  const handleExport = () => {
    const exportData = extra.map((student, index) => {
      const rowData = {
        "S.No": index + 1,
        "College Id": student.clg_id,
        "First Name": student.first_name,
        "Middle Name": student.middle_name,
        "Last Name": student.last_name,
      };
      selectedFields.forEach((field) => {
        rowData[fieldToColumnName[field]] = student[field];
      });
      return rowData;
    });
    const ws = utils.json_to_sheet(exportData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Students");
    writeFile(wb, "students.xlsx");

    window.location.reload();
  };

  const handleClearFilters = () => {
    setSelectedFields([]);
  };

  const handleSelectAll = () => {
    setSelectedFields([
      "branch",
      "mobile",
      "gender",
      "degree",
      "dob",
      "loc",
      "ssc_per",
      "ssc_year",
      "hsc_per",
      "hsc_year",
      "diploma_per",
      "diploma_year",
      "degree_per",
      "degree_cgpa",
      "degree_year",
      "resume",
    ]);
  };

  const handleSScChange = (val) => {
    setSSC(val);
    // setExtra(extra.filter(e => (val === '' ? 0 : val) <= (e.ssc_per == null ? 0 : e.ssc_per)));
  };

  const handleHScChange = (val) => {
    setHSC(val);
    // setExtra(extra.filter(e =>((val === '' ? 0 : val) <= (e.hsc_per == null ? 0 : e.hsc_per)) || e.hsc_per == null ));
  };

  const handleDipChange = (val) => {
    setDip(val);
    // setExtra(extra.filter(e => ((val === '' ? 0 : val) <= (e.diploma_per == null ? 0 : e.diploma_per)) || e.diploma_per == null ));
  };

  const handleDegreeChange = (val) => {
    setDeg(val);
    // setExtra(extra.filter(e => (val === '' ? 0 : val) <= (e.degree_cgpa == null ? 0 : e.degree_cgpa)));
  };

  // const applyMarks = () =>{
  //   // setStudents(extra);
  // }

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  }

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  }
  

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 ml-2">Generate Student Table</h1>
      <div className="mb-4">
          <label className="text-sm font-semibold">Select Batch:</label>
          <select
            value={selectedBatch}
            onChange={handleBatchChange}
            className="ml-2 p-2 border rounded"
          >
            <option value="ALL">All Batches</option>
            {batches.map((batch, index) => (
              <option key={index} value={batch.batch}>
                {batch.batch}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold">Select Branch:</label>
          <select
            value={selectedBranch}
            onChange={handleBranchChange}
            className="ml-2 p-2 border rounded"
          >
            <option value="ALL">All Branch</option>
            {branch.map((branch, index) => (
              <option key={index} value={branch.branch}>
                {branch.branch}
              </option>
            ))}
          </select>
        </div>
      <button
        onClick={handleExport}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Export to Excel
      </button>
      <div className="w-full p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Select Fields</h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {fields.map((field) => (
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                value={field}
                onChange={() => handleCheckboxChange(field)}
                checked={selectedFields.includes(field)}
                className="mr-2"
              />
              <label className="text-sm">{fieldToColumnName[field]}</label>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={handleGenerate}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 m-3"
          >
            Generate Table
          </button>
          {/* <button
            type="button"
            onClick={handleClearFilters}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 m-3"
          >
            Clear Filters
          </button> */}

          <button
            type="button"
            onClick={handleSelectAll}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Select All
          </button>
        </div>

        <div className="mt-4 flex justify-between">
          <input type="text px-2" onChange={(e) => handleSScChange(e.target.value)} placeholder="SSC"/>
          <input type="text" onChange={(e) => handleHScChange(e.target.value)} placeholder="HSC"/>
          <input type="text" onChange={(e) => handleDipChange(e.target.value)} placeholder="Diploma"/>
          <input type="text" onChange={(e) => handleDegreeChange(e.target.value)} placeholder="Degree"/>
          {/* <button
            type="button"
            onClick={applyMarks}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-gray-700"
          >
            Apply Marks Filter
          </button> */}
        </div>
        
      </div>

      {students.length > 0 && (
        <div className="overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto">
          <table className="">
            <thead className="sticky top-0 bg-gray-800 z-8 w-full">
              <tr className="bg-gray-100 text-center">
                <th className="px-4 py-2 text-center text-sm font-medium text-white">
                  S. No
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">
                  College ID
                </th>
               <th className="px-4 py-2 text-center text-sm font-medium text-white">
                  First Name
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">
                  Middle Name
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">
                  Last Name
                </th>
                {selectedFields.map((field) => (
                  <th
                    key={field}
                    className="px-4 py-2 text-center text-sm font-medium text-white"
                  >
                    {fieldToColumnName[field]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student.tpo_id}
                  className=" hover:bg-gray-100 text-center"
                >
                  <td className="py-2 px-8 border-b text-center">
                    {index + 1}
                  </td>
                  <td className="py-2 px-8 border-b text-center">
                    {student.clg_id || "-"}
                  </td>
                  <td className="py-2 px-8 border-b text-center">
                    {student.first_name || "-"}
                  </td>
                  <td className="py-2 px-8 border-b text-center">
                    {student.middle_name || "-"}
                  </td>
                  <td className="py-2 px-8 border-b text-center">
                    {student.last_name || "-"}
                  </td>
                  {selectedFields.map((field) => (
                    <td key={field} className="py-2 px-8 border-b text-center">
                      {student[field] || "-"}{" "}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentTableGenerator;