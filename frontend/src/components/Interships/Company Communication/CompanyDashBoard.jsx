import React, { useEffect, useState } from "react";
import CompanyList from "./CompanyList";
import FilterForm from "./FilterForm";
// import AddCompanyPopup from "./AddCompanyPopup";
import InternEditCompanyPopup from "./EditCompanyPopup";
// import api from "../../api";
import AddInterCompanyPopup from "./AddCompanyPopup";
import api from "../../../api";

function IntenrCompanyDashboard() {
  const [companies, setCompanies] = useState([]);
  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const [filterMode, setFilterMode] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCompany, setEditingCompany] = useState(null);

  useEffect(() => {
    const getTeamData = async () => {
      try {
        const res = await api.get("companies/intership/getAll");
        console.log("Fetched companies:", res.data);
        setCompanies(res.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    getTeamData();
  }, []);

  const validateYear = (year) => {
    const yearRegex = /^(19|20)\d{2}$/;
    return yearRegex.test(year);
  };

  const addCompany = (newCompany) => {
    setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
    setIsAddPopupVisible(false);
    window.location.reload(); // Reload the page
  };

  const updateCompany = (updatedCompany) => {
    const updatedCompanies = companies.map((company, index) =>
      index === editingCompany.index ? updatedCompany : company
    );
    setCompanies(updatedCompanies);
    setEditingCompany(null);
    setIsEditPopupVisible(false);
    window.location.reload(); // Reload the page
  };

  const editCompany = (index) => {
    console.log("Editing company at index:", index);
    setEditingCompany({ ...filteredCompanies[index], index });
    setIsEditPopupVisible(true);
  };

  const openAddCompanyPopup = () => {
    setIsAddPopupVisible(true);
  };

  const deleteCompany = async (index) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      const id = index;
      try {
        // await api.delete(`companies/${id}`);
        // onSave(updatedCompany);
        // clearForm();
        window.location.reload();
      } catch (error) {
        console.error("Error:", error);
      }

      const updatedCompanies = [...companies];
      updatedCompanies.splice(index, 1);
      setCompanies(updatedCompanies);
    }
  };

  const clearFilters = () => {
    setFilterMode("");
    setFilterYear("");
    setSearchQuery("");
  };

  const filteredCompanies = companies
    .filter(
      (company) =>
        !searchQuery ||
        company.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (company) => !filterYear || company.academic_year.includes(filterYear)
    );

  return (
    <div className=" mx-auto p-4 my-5">
     
      <div className="flex flex-col sm:flex-row sm:items-center mb-3 space-y-2 sm:space-y-2 sm:space-x-2 gap-3">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-lg sm:mt-2"
          onClick={openAddCompanyPopup}
        >
          Add
        </button>
        {/* <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Search by Company Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        /> */}
        {/* <select
          className="flex-1 p-2 border rounded"
          onChange={(e) => setSearchQuery(e.target.value)}
        >
          <option>Select the Company</option>
          {companies.map((data, i) => (
            <option key={i}>{data.name}</option>
          ))}
        </select> */}
        <select
          className="flex-1 p-3 border rounded shadow-lg rounded-md"
          onChange={(e) => setSearchQuery(e.target.value)}
        >
          <option>Select the Company</option>
          {companies.map((data, i) => (
            <option key={i} value={data.name}>
              {data.name}
            </option>
          ))}
        </select>
        {/* <div className="mb-4 flex">
          <select className='w-100'
            onChange={(e) => setSearchQuery(e.target.value)}>

            <option defaultChecked>Select the Company</option>

            {companies.map((data, i) => (
              <option key={i} value={data.company_name}>{data.company_name}</option>
            ))}

          </select>
        </div> */}
        <FilterForm
          filterMode={filterMode}
          setFilterMode={setFilterMode}
          filterYear={filterYear}
          setFilterYear={setFilterYear}
          clearFilters={clearFilters}
        />
      </div>

      {isAddPopupVisible && (
        <AddInterCompanyPopup
          onSave={addCompany}
          onCancel={() => setIsAddPopupVisible(false)}
        />
      )}

      {isEditPopupVisible && (
        <InternEditCompanyPopup
          onSave={updateCompany}
          onCancel={() => setIsEditPopupVisible(false)}
          editingCompany={editingCompany}
        />
      )}

      <CompanyList
        companies={filteredCompanies}
        editCompany={editCompany}
        deleteCompany={deleteCompany}
      />
    </div>
  );
}

export default IntenrCompanyDashboard;
