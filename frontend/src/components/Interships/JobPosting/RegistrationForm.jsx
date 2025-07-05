// import React, { useState } from "react";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import Checkbox from "@mui/material/Checkbox";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import Chip from "@mui/material/Chip";
// import CancelIcon from "@mui/icons-material/Cancel";

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

// const RegistrationForm = ({ onFormDataChange }) => {
//   const options = ["CS", "IT", "AI&DS"];

//   const [roles, setRoles] = useState([]);
//   const [newRole, setNewRole] = useState("");
//   const [formData, setFormData] = useState({
//     job_description: "",
//     package_details: "",
//     criteria_10th: "",
//     criteria_12th: "",
//     deg_criteria: "",
//     diploma_criteria: "",
//     eligible_branches: [],
//     docs: null,
//   });

//   const addRole = () => {
//     if (newRole.trim() !== "") {
//       setRoles([...roles, newRole.trim()]);
//       setNewRole("");
//     }
//   };

//   const removeRole = (index) => {
//     const updatedRoles = roles.filter((_, idx) => idx !== index);
//     setRoles(updatedRoles);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     onFormDataChange({ ...formData, roles, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({ ...formData, docs: file });
//     onFormDataChange({ ...formData, roles, docs: file });
//   };

//   const handleBranchesChange = (event, value) => {
//     setFormData({ ...formData, eligible_branches: value });
//     onFormDataChange({ ...formData, roles, eligible_branches: value });
//   };

//   return (
//     <div className="section-jp">
//       <h2>Basic Details</h2>
//       <label>Job Description:</label>
//       <input
//         type="text"
//         name="job_description"
//         value={formData.job_description}
//         onChange={handleInputChange}
//         placeholder="Job Description"
//       />
//       <label>Package details:</label>
//       <input
//         type="text"
//         name="package_details"
//         value={formData.package_details}
//         onChange={handleInputChange}
//         placeholder="Package"
//       />

//       <div style={{ marginBottom: "10px" }}>
//         <label>Roles:</label>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             flexWrap: "wrap",
//             marginBottom: "10px",
//           }}
//         >
//           {roles.map((role, index) => (
//             <Chip
//               key={index}
//               label={role}
//               onDelete={() => removeRole(index)}
//               deleteIcon={<CancelIcon />}
//               style={{ margin: "5px" }}
//             />
//           ))}
//         </div>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             marginBottom: "10px",
//           }}
//         >
//           <TextField
//             type="text"
//             value={newRole}
//             onChange={(e) => setNewRole(e.target.value)}
//             placeholder="Enter Role"
//             style={{ flex: 1, minWidth: "120px", marginRight: "10px" }}
//           />
//           <button
//             type="button"
//             onClick={addRole}
//             style={{
//               padding: "8px 16px",
//               backgroundColor: "#3784f6",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             +
//           </button>
//         </div>
//       </div>

//       <label>10th Criteria:</label>
//       <input
//         type="number"
//         name="criteria_10th"
//         value={formData.criteria_10th}
//         onChange={handleInputChange}
//         placeholder="percentage"
//       />
//       <label>12th Criteria:</label>
//       <input
//         type="number"
//         name="criteria_12th"
//         value={formData.criteria_12th}
//         onChange={handleInputChange}
//         placeholder="percentage"
//       />
//       <label>Degree Criteria:</label>
//       <input
//         type="number"
//         name="deg_criteria"
//         value={formData.deg_criteria}
//         onChange={handleInputChange}
//         placeholder="percentage"
//       />
//       <label>Diploma Criteria:</label>
//       <input
//         type="number"
//         name="diploma_criteria"
//         value={formData.diploma_criteria}
//         onChange={handleInputChange}
//         placeholder="percentage"
//       />

//       <label>Eligible Branches:</label>
//       <Autocomplete
//         multiple
//         id="checkboxes-tags-demo"
//         options={options}
//         disableCloseOnSelect
//         getOptionLabel={(option) => option}
//         renderOption={(props, option, { selected }) => (
//           <li {...props}>
//             <Checkbox
//               icon={icon}
//               checkedIcon={checkedIcon}
//               style={{ marginRight: 8 }}
//               checked={selected}
//             />
//             {option}
//           </li>
//         )}
//         value={formData.eligible_branches}
//         onChange={handleBranchesChange}
//         style={{ width: 860 }}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             variant="outlined"
//             placeholder="Select Branches"
//           />
//         )}
//       />

//       <label>Docs (if any):</label>
//       <input
//         type="file"
//         accept=".pdf"
//         name="docs"
//         onChange={handleFileChange}
//         placeholder="Add file"
//       />
//     </div>
//   );
// };

// export default RegistrationForm;

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";
import MenuItem from "@mui/material/MenuItem";
// import api from "../../api";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const IntershipRegistrationForm = ({ onFormDataChange }) => {
  const options = ["CS", "IT", "AIDS"];

  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [batchYears, setBatchYears] = useState([]);
  const [availableSlabs, setAvailableSlabs] = useState([]);
  const [formData, setFormData] = useState({
    job_description: "",
    package_details: "",
    criteria_10th: "",
    criteria_12th: "",
    deg_criteria: "",
    diploma_criteria: "",
    eligible_branches: [],
    docs1: null,
    docs2: null,
    docs3: null,
    roles: roles,
    deadline: "",
    batch_date: "",
    // salad_id: "",
    extLink: null,
  });

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2020; year <= currentYear + 4; year++) {
      years.push(year);
    }
    setBatchYears(years);

    // Fetch available slabs from the API
  }, []);

  const addRole = () => {
    if (newRole.trim() !== "") {
      setRoles([...roles, newRole.trim()]);
      setNewRole("");
    }
  };

  const removeRole = (index) => {
    const updatedRoles = roles.filter((_, idx) => idx !== index);
    setRoles(updatedRoles);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    onFormDataChange({ ...formData, roles, [name]: value });
  };

  const handleFileChange1 = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, docs1: file });
    onFormDataChange({ ...formData, roles, docs1: file });
  };

  const handleFileChange2 = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, docs2: file });
    onFormDataChange({ ...formData, roles, docs2: file });
  };

  const handleFileChange3 = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, docs3: file });
    onFormDataChange({ ...formData, roles, docs3: file });
  };

  const handleBranchesChange = (event, value) => {
    setFormData({ ...formData, eligible_branches: value });
    onFormDataChange({ ...formData, roles, eligible_branches: value });
  };

  return (
    <div className="">
      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Job Description:</label>
      <input
        type="text"
        name="job_description"
        value={formData.job_description}
        onChange={handleInputChange}
        placeholder="Job Description"
        className="w-full p-3 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Package details:</label>
      <input
        type="text"
        name="package_details"
        value={formData.package_details}
        onChange={handleInputChange}
        placeholder="Package"
        className="w-full p-3 border border-gray-300 rounded-md"
      />

      <div style={{ marginBottom: "10px" }}>
        <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Roles:</label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "10px",
          }}
        >
          {roles.map((role, index) => (
            <Chip
              key={index}
              label={role}
              onDelete={() => removeRole(index)}
              deleteIcon={<CancelIcon />}
              style={{ margin: "5px" }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <TextField
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            placeholder="Enter Role"
            style={{ flex: 1, minWidth: "120px", marginRight: "10px" }}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <button
            type="button"
            onClick={addRole}
            style={{
              padding: "8px 16px",
              backgroundColor: "#3784f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            +
          </button>
        </div>
      </div>

      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">10th Criteria:</label>
      <input
        type="number"
        name="criteria_10th"
        value={formData.criteria_10th}
        onChange={handleInputChange}
        placeholder="percentage"
        className="w-full p-3 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">12th Criteria:</label>
      <input
        type="number"
        name="criteria_12th"
        value={formData.criteria_12th}
        onChange={handleInputChange}
        placeholder="percentage"
        className="w-full p-3 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Degree Criteria (CGPA):</label>
      <input
        type="number"
        name="deg_criteria"
        value={formData.deg_criteria}
        onChange={handleInputChange}
        placeholder="CGPA"
        className="w-full p-3 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Diploma Criteria:</label>
      <input
        type="number"
        name="diploma_criteria"
        value={formData.diploma_criteria}
        onChange={handleInputChange}
        placeholder="percentage"
        className="w-full p-3 border border-gray-300 rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Eligible Branches:</label>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={options}
        disableCloseOnSelect
        getOptionLabel={(option) => option}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </li>
        )}
        value={formData.eligible_branches}
        onChange={handleBranchesChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Select Branches"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        )}
      />

      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Docs 1 (if any):</label>
      <input
        type="file"
        accept=".pdf"
        name="docs"
        onChange={handleFileChange1}
        placeholder="Add file"
        className="w-full p-3 border border-gray-300 rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Docs 2 (if any):</label>
      <input
        type="file"
        accept=".pdf"
        name="docs"
        onChange={handleFileChange2}
        placeholder="Add file"
        className="w-full p-3 border border-gray-300 rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Docs 3 (if any):</label>
      <input
        type="file"
        accept=".pdf"
        name="docs"
        onChange={handleFileChange3}
        placeholder="Add file"
        className="w-full p-3 border border-gray-300 rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">External Link (if any):</label >
      <input
          type="text"
          name="extLink"
          value={formData.extLink}
          onChange={handleInputChange}
          placeholder="External Link"
          className="w-full p-3 border border-gray-300 rounded-md"
      />

      {/* <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Select Slab:</label>
      <select
        name="salad_id"
        value={formData.salad_id}
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-300 rounded-md"
      >
        <option value="">Select a Slab</option>
        {availableSlabs.map((slab) => (
          <option key={slab.salad_id} value={slab.salad_id}>
            {slab.descs}
          </option>
        ))}
      </select> */}

      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Batch:</label>
      <select
        name="batch_date"
        value={formData.batch_date}
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-300 rounded-md"
      >
        <option value="">Select Batch Year</option>
        {batchYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Deadline:</label>
      <input
        type="datetime-local"
        name="deadline"
        value={formData.deadline}
        onChange={handleInputChange}
        placeholder="Deadline"
        className="w-full p-3 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default IntershipRegistrationForm;
