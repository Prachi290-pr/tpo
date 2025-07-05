// import { useState, useEffect } from "react";
// // import axios from "axios";
// import api from "../../api";
// import AddRemarkForm from "./AddRemarkForm";
// import ClearFiltersButton from "./ClearFiltersButton";
// import RemarkItem from "./RemarkItem";
// import "./companyremark.css";
// import UpdateRemarkForm from "./updateFormRemark";

// const CompanyRemark = () => {
//   const [companies, setCompanies] = useState([]);
//   const [selectedCompany, setSelectedCompany] = useState("");
//   const [academicYears, setAcademicYears] = useState([]);
//   const [selectedYear, setSelectedYear] = useState("");
//   const [remarks, setRemarks] = useState([]);
//   const [showAddRemarkForm, setShowAddRemarkForm] = useState(false);
//   const [showUpdateForm, setShowupdateRemark] = useState(false);
//   const [selectedRemark, setSelectedRemark ] = useState(false);
//   const [remarksDisplayed, setRemarksDisplayed] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(
//     "Please select college and academic year to view its remarks"
//   );

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const response = await api.get("companies/getAll");
//         console.log("Fetched companies from remark:", response.data);
//         setCompanies(response.data);
//       } catch (error) {
//         console.error("Error fetching companies:", error);
//       }
//     };
//     fetchCompanies();
//   }, []);

//   const handleCompanyChange = async (e) => {
//     const companyId = e.target.value;
//     // const companyName = e.target.key;
//     const companyName = e.target.options[e.target.selectedIndex].text;
//     console.log(companyId);
//     console.log(companyName);
//     // e.target.
//     setSelectedCompany(companyId);
//     setSelectedYear(""); // Reset selected year when company changes
//     setRemarksDisplayed(false); // Reset remarks display status
//     setErrorMessage(""); // Reset error message

//     try {
//       const response = await api.get(`companies/${companyName}/years`);
//       console.log("Fetched academic years:", response.data);
//       setAcademicYears(response.data);
//     } catch (error) {
//       console.error("Error fetching academic years:", error);
//     }

//     // Reset remarks when changing the selected company
//     setRemarks([]);
//   };

//   const handleYearChange = (e) => {
//     const year = e.target.value;
//     setSelectedYear(year);
//     setRemarksDisplayed(false); // Reset remarks display status
//     setErrorMessage(""); // Reset error message
//     // Reset remarks when changing the selected year
//     setRemarks([]);
//   };

//   const handleDisplayRemarks = async () => {
//     if (!selectedCompany || !selectedYear) {
//       setRemarks([]);
//       setErrorMessage(
//         "Please select college and academic year to view its remarks"
//       );
//       return;
//     }

//     try {
//       const response = await api.get(`companies/${selectedCompany}/remarks`);
//       console.log("Fetched remarks for company:", response.data);
//       // const remarksForYear = response.data.filter(
//       //   (remark) => remark.academic_year === selectedYear
//       // );
//       // setRemarks(remarksForYear);
//       setRemarks(response.data);
//       setRemarksDisplayed(true); // Set remarks display status to true
//       setErrorMessage(""); // Reset error message
//     } catch (error) {
//       console.error("Error fetching remarks:", error);
//       setRemarks([]);
//       setErrorMessage("Failed to fetch remarks. Please try again.");
//     }
//   };

//   const handleClearFilters = () => {
//     setSelectedCompany("");
//     setSelectedYear("");
//     setRemarks([]);
//     setShowAddRemarkForm(false);
//     setRemarksDisplayed(false); // Reset remarks display status
//     setErrorMessage(
//       "Please select college and academic year to view its remarks"
//     ); // Reset error message
//   };

//   // const handleAddRemark = async (newRemark) => {
//   //   try {
//   //     const response = await api.post(
//   //       `companies/${selectedCompany}/remarks`,
//   //       JSON.stringify(newRemark),
//   //       {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //       }
//   //     );
//   //     console.log("newdata",newRemark)
//   //     setRemarks([...remarks, { ...newRemark, id: response.data.insertId }]);
//   //     setShowAddRemarkForm(false);
//   //     window.location.reload();
//   //   } catch (error) {
//   //     console.error("Error adding remark:", error);
//   //   }
//   // };
//   const handleAddRemark = async (newRemark) => {
//     console.log("SENDING REMRAK");
//     try {
//       console.log("Sending new remark:", newRemark); // Log the new remark object
  
//       const response = await api.post(
//         `companies/${selectedCompany}/remarks`,
//         JSON.stringify(newRemark),
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("Response from backend:", response.data); // Log the response
  
//       setRemarks([...remarks, { ...newRemark, id: response.data.insertId }]);
//       setShowAddRemarkForm(false);
//       window.location.reload();
//     } catch (error) {
//       console.error("Error adding remark:", error);
//     }
//   };
  

//   const handleUpdateStatus = async (newRemark) => {
//     try {
//       console.log();
//       await api.put(`companies/${selectedCompany}/remarks/${newRemark.id}`, {
//         remark:newRemark,
//       });
//       alert('Remark Updated!');
//       window.location.reload();
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   const updateClick = async (remark)=>{
//     setShowupdateRemark(true);
//     setSelectedRemark(remark);
//     setShowAddRemarkForm(true);
//     console.log('hello')
//   }


//   return (
//     <div className="mx-auto p-4 my-6">
//       <div className="flex flex-col sm:flex-row sm:items-center mb-3 space-y-2 sm:space-y-2 sm:space-x-2 gap-3">
//         <select
//           className="flex-1 p-3 border rounded shadow-lg rounded-md"
//           value={selectedCompany}
//           onChange={handleCompanyChange}
//         >
//           <option value="">Select Company</option>
//           {companies.map((company) => (
//             <option key={company.id} value={company.id}>
//               {company.name}
//             </option>
//           ))}
//         </select>
//         <select
//           className="flex-1 p-3 border rounded shadow-lg rounded-md"
//           value={selectedYear}
//           onChange={handleYearChange}
//         >
//           <option value="">Select Academic Year</option>
//           {academicYears.map((year) => (
//             <option key={year} value={year}>
//               {year}
//             </option>
//           ))}
//         </select>
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700  mr-2 mx-2" onClick={handleDisplayRemarks}>Display Remarks</button>
//         <ClearFiltersButton onClick={handleClearFilters} />

//       </div>

//       {errorMessage && (
//         <div className="no-selection-message">{errorMessage}</div>
//       )}
//       {remarksDisplayed && (
//         <div className="max-w-7xl mx-auto my-4 p-0">
//           <div className="perfectMatch">
//             <p>Displaying the Interactions and Remark History</p>
//             <div className="line"></div>
//           </div>
//           <div className="flex flex-wrap gap-4 remark-item justify-center">
//             {remarks.length > 0 ? (
//               remarks.map((remark) => (
//                 <RemarkItem
//                   key={remark.id}
//                   remark={remark}
//                   onUpdateStatus={handleUpdateStatus}
//                   handleUpdateClick = {updateClick}
//                 />
//               ))
//             ) : (
//               <p>No remarks available.</p>
//             )}
//           </div>
//           <div className="buttonAdd">
//             {remarksDisplayed && selectedCompany && selectedYear && (
//               <button className="bg-blue-500 p-4" onClick={() => setShowAddRemarkForm(true)}>
//                 Add Remarks
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {showAddRemarkForm && (
//         <AddRemarkForm
//           onAddRemark={handleAddRemark}
//           showModal={showAddRemarkForm}
//           setShowModal={setShowAddRemarkForm}
//         />
//       )}

//     {showUpdateForm==true ? (
//         <UpdateRemarkForm
//           onAddRemark={handleUpdateStatus}
//           showModal={showAddRemarkForm}
//           setShowModal={setShowAddRemarkForm}
//           remark = {selectedRemark}
//         />
//       ) : <></>}
//     </div>
//   );
// };

// export default CompanyRemark;


import { useState, useEffect } from "react";
import api from "../../api";
import AddRemarkForm from "./AddRemarkForm";
import ClearFiltersButton from "./ClearFiltersButton";
import RemarkItem from "./RemarkItem";
import "./companyremark.css";
import UpdateRemarkForm from "./updateFormRemark";

const CompanyRemark = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]); // For filtering suggestions
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCompanyName, setSelectedCompanyName] = useState(""); // For tracking input value
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [remarks, setRemarks] = useState([]);
  const [showAddRemarkForm, setShowAddRemarkForm] = useState(false);
  const [showUpdateForm, setShowUpdateRemark] = useState(false);
  const [selectedRemark, setSelectedRemark] = useState(false);
  const [remarksDisplayed, setRemarksDisplayed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Please select college and academic year to view its remarks"
  );

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get("companies/getAll");
        console.log("Fetched companies from remark:", response.data);
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleCompanyInputChange = (e) => {
    const input = e.target.value;
    setSelectedCompanyName(input);

    // Filter companies based on input value
    if (input) {
      const filtered = companies.filter((company) =>
        company.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCompanies(filtered);
    } else {
      setFilteredCompanies([]);
    }
  };

  const handleCompanySelect = async (company) => {
    setSelectedCompany(company.id);
    setSelectedCompanyName(company.name);
    setFilteredCompanies([]); // Clear suggestions
    setSelectedYear(""); // Reset selected year when company changes
    setRemarksDisplayed(false); // Reset remarks display status
    setErrorMessage(""); // Reset error message

    try {
      const response = await api.get(`companies/${company.name}/years`);
      console.log("Fetched academic years:", response.data);
      setAcademicYears(response.data);
    } catch (error) {
      console.error("Error fetching academic years:", error);
    }

    // Reset remarks when changing the selected company
    setRemarks([]);
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    setRemarksDisplayed(false); // Reset remarks display status
    setErrorMessage(""); // Reset error message
    setRemarks([]); // Reset remarks when changing the selected year
  };

  const handleDisplayRemarks = async () => {
    if (!selectedCompany || !selectedYear) {
      setRemarks([]);
      setErrorMessage(
        "Please select college and academic year to view its remarks"
      );
      return;
    }

    try {
      const response = await api.get(`companies/${selectedCompany}/remarks`);
      console.log("Fetched remarks for company:", response.data);
      setRemarks(response.data);
      setRemarksDisplayed(true); // Set remarks display status to true
      setErrorMessage(""); // Reset error message
    } catch (error) {
      console.error("Error fetching remarks:", error);
      setRemarks([]);
      setErrorMessage("Failed to fetch remarks. Please try again.");
    }
  };

  const handleClearFilters = () => {
    setSelectedCompany("");
    setSelectedCompanyName("");
    setSelectedYear("");
    setRemarks([]);
    setShowAddRemarkForm(false);
    setRemarksDisplayed(false); // Reset remarks display status
    setErrorMessage(
      "Please select college and academic year to view its remarks"
    ); // Reset error message
  };

  const handleAddRemark = async (newRemark) => {
    try {
      console.log("Sending new remark:", newRemark); // Log the new remark object

      const response = await api.post(
        `companies/${selectedCompany}/remarks`,
        JSON.stringify(newRemark),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from backend:", response.data); // Log the response

      setRemarks([...remarks, { ...newRemark, id: response.data.insertId }]);
      setShowAddRemarkForm(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding remark:", error);
    }
  };

  const handleUpdateStatus = async (newRemark) => {
    try {
      await api.put(`companies/${selectedCompany}/remarks/${newRemark.id}`, {
        remark: newRemark,
      });
      alert("Remark Updated!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const updateClick = async (remark) => {
    setShowUpdateRemark(true);
    setSelectedRemark(remark);
    setShowAddRemarkForm(true);
  };

  return (
    <div className="mx-auto p-4 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center mb-3 space-y-2 sm:space-y-2 sm:space-x-2 gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            className="p-3 border rounded shadow-lg w-full"
            placeholder="Type company name"
            value={selectedCompanyName}
            onChange={handleCompanyInputChange}
          />
          {filteredCompanies.length > 0 && (
            <ul className="absolute bg-white border rounded shadow-lg w-full max-h-60 overflow-y-auto z-10">
              {filteredCompanies.map((company) => (
                <li
                  key={company.id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleCompanySelect(company)}
                >
                  {company.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <select
          className="flex-1 p-3 border rounded shadow-lg rounded-md"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="">Select Academic Year</option>
          {academicYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2 mx-2"
          onClick={handleDisplayRemarks}
        >
          Display Remarks
        </button>
        <ClearFiltersButton onClick={handleClearFilters} />
      </div>

      {errorMessage && <div className="no-selection-message">{errorMessage}</div>}
      {remarksDisplayed && (
        <div className="max-w-7xl mx-auto my-4 p-0">
          <div className="perfectMatch">
            <p>Displaying the Interactions and Remark History</p>
            <div className="line"></div>
          </div>
          <div className="flex flex-wrap gap-4 remark-item justify-center">
            {remarks.length > 0 ? (
              remarks.map((remark) => (
                <RemarkItem
                  key={remark.id}
                  remark={remark}
                  onUpdateStatus={handleUpdateStatus}
                  handleUpdateClick={updateClick}
                />
              ))
            ) : (
              <p>No remarks available.</p>
            )}
          </div>
          <div className="buttonAdd">
            {remarksDisplayed && selectedCompany && selectedYear && (
              <button
                className="bg-blue-500 p-4"
                onClick={() => setShowAddRemarkForm(true)}
              >
                Add Remarks
              </button>
            )}
          </div>
        </div>
      )}

      {showAddRemarkForm && (
        <AddRemarkForm
          onAddRemark={handleAddRemark}
          showModal={showAddRemarkForm}
          setShowModal={setShowAddRemarkForm}
        />
      )}

      {showUpdateForm && (
        <UpdateRemarkForm
          onAddRemark={handleUpdateStatus}
          showModal={showAddRemarkForm}
          setShowModal={setShowAddRemarkForm}
          remark={selectedRemark}
        />
      )}
    </div>
  );
};

export default CompanyRemark;
