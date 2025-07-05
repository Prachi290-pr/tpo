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
//     job_description:data.job_description,
//     package_details:data.package_details,
//     criteria_10th:data.criteria_10th,
//     criteria_12th:data.criteria_12th,
//     deg_criteria:data.deg_criteria,
//     diploma_criteria:data.diploma_criteria,
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
//       <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Job Description:</label >
//       <input
//         type="text"
//         name="job_description"
//         value={formData.job_description}
//         onChange={handleInputChange}
//         placeholder="Job Description"
//       />
//       <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Package details:</label >
//       <input
//         type="text"
//         name="package_details"
//         value={formData.package_details}
//         onChange={handleInputChange}
//         placeholder="Package"
//       />

//       <div style={{ marginBottom: "10px" }}>
//         <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Roles:</label >
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
//               label ={role}
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

//       <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">10th Criteria:</label >
//       <input
//         type="number"
//         name="criteria_10th"
//         value={formData.criteria_10th}
//         onChange={handleInputChange}
//         placeholder="percentage"
//       />
//       <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">12th Criteria:</label >
//       <input
//         type="number"
//         name="criteria_12th"
//         value={formData.criteria_12th}
//         onChange={handleInputChange}
//         placeholder="percentage"
//       />
//       <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Degree Criteria:</label >
//       <input
//         type="number"
//         name="deg_criteria"
//         value={formData.deg_criteria}
//         onChange={handleInputChange}
//         placeholder="percentage"
//       />
//       <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Diploma Criteria:</label >
//       <input
//         type="number"
//         name="diploma_criteria"
//         value={formData.diploma_criteria}
//         onChange={handleInputChange}
//         placeholder="percentage"
//       />

//       <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Eligible Branches:</label >
//       <Autocomplete
//         multiple
//         id="checkboxes-tags-demo"
//         options={options}
//         disableCloseOnSelect
//         getOptionLabel ={(option) => option}
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

//       <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Docs (if any):</label >
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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const RegistrationForm = ({ onFormDataChange, data }) => {
  const options = ["CS", "IT", "AIDS"];

  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [batchYears, setBatchYears] = useState([]);
  const [formData, setFormData] = useState({
    id:data[0].id,
    job_description: data[0].job_description,
    package_details:data[0].package_details,
    criteria_10th:data[0].criteria_10th,
    criteria_12th:data[0].criteria_12th,
    deg_criteria:data[0].deg_criteria,
    diploma_criteria:data[0].diploma_criteria,
    eligible_branches: data[0].eligible_branches[0]=='[' ? JSON.parse(data[0].eligible_branches) : [data[0].eligible_branches],
    docs: data[0].docs,
    roles: data[0].roles[0]=='[' ? JSON.parse(data[0].roles) : [data[0].roles],
    deadline:data[0].deadline,
    batch_date:data[0].batch_date,
    company_type:data[0].company_type
  });

  console.log(data)

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2020; year <= currentYear + 4; year++) {
      years.push(year);
    }
    setBatchYears(years);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, docs: file });
    onFormDataChange({ ...formData, roles, docs: file });
  };

  const handleBranchesChange = (event, value) => {
    setFormData({ ...formData, eligible_branches: value });
    onFormDataChange({ ...formData, roles, eligible_branches: value });
  };

  const handleCompanyTypeChange = (e) => {
    setFormData({ ...formData, company_type: e.target.value });
    onFormDataChange({ ...formData, roles, company_type: e.target.value });
  };


  return (
    <div className="">
      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Job Description:</label >
      <input
        type="text"
        name="job_description"
        value={formData.job_description}
        onChange={handleInputChange}
        placeholder="Job Description"
        className="w-full p-3 border border-gray-300 rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Company Type:</label>
      
             <TextField
              fullWidth
              select
              name="company_type"
              value={formData.company_type}
              onChange={handleCompanyTypeChange}
              SelectProps={{ native: true }}
            >
              <option value="">Select Company Type</option>
              <option value="IT">IT</option>
              <option value="Non IT">Non IT</option>
            </TextField>

      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Package details:</label >
      <input
        type="text"
        name="package_details"
        value={formData.package_details}
        onChange={handleInputChange}
        placeholder="Package"
        className="w-full p-3 border border-gray-300 rounded-md"
      />

      <div style={{ marginBottom: "10px" }}>
        <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Roles:</label >
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
              label ={role}
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

      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">10th Criteria:</label >
      <input
        type="number"
        name="criteria_10th"
        value={formData.criteria_10th}
        onChange={handleInputChange}
        placeholder="percentage"
        className="w-full p-3 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">12th Criteria:</label >
      <input
        type="number"
        name="criteria_12th"
        value={formData.criteria_12th}
        onChange={handleInputChange}
        placeholder="percentage"
        className="w-full p-3 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Degree Criteria (CGPA):</label >
      <input
        type="number"
        name="deg_criteria"
        value={formData.deg_criteria}
        onChange={handleInputChange}
        placeholder="percentage"
        className="w-full p-3 border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Diploma Criteria:</label >
      <input
        type="number"
        name="diploma_criteria"
        value={formData.diploma_criteria}
        onChange={handleInputChange}
        placeholder="percentage"
        className="w-full p-3 border border-gray-300 rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Eligible Branches:</label >
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={options}
        disableCloseOnSelect
        getOptionLabel ={(option) => option}
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
        // style={{ width: 860 }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Select Branches"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        )}
      />

      <div style={{ marginBottom: "10px" }}>
        {/* <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Eligible Branches:</label >
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
              label ={role}
              onDelete={() => removeRole(index)}
              deleteIcon={<CancelIcon />}
              style={{ margin: "5px" }}
            />
          ))}
        </div> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {/* <TextField
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            placeholder="Enter Branch"
            style={{ flex: 1, minWidth: "120px", marginRight: "10px" }}
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
          </button> */}
        </div>
      </div>

      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Deadline:</label >
      <TextField
        type="datetime-local"
        name="deadline"
        value={formData.deadline}
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-300 rounded-md"
        InputLabel Props={{
          shrink: true,
        }}
        style={{ flex: 1, minWidth: "120px", marginBottom: "10px" }} // Adjusted width
      />

      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">Batch :</label >
        <TextField
        select
        name="batch_date"
        value={formData.batch_date}
        onChange={handleInputChange}
        variant="outlined"
        className="w-full p-3 border border-gray-300 rounded-md"
        style={{ flex: 1, minWidth: "120px", marginBottom: "10px" }} // Adjusted width
      >
        {batchYears.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default RegistrationForm;
