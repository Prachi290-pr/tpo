import React, { useState, useEffect } from "react";
import HRList from "./HRList";
import FilterForm from "./FilterForm";
import AddHR from "./AddHR";
import EditHR from "./EditHR";
import api from "../../api";

function HRDash() {
  const [companies, setCompanies] = useState([]);
  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
  const [filterMode, setFilterMode] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCompany, setEditingCompany] = useState(null);
  const [companyid, setCompanyID] = useState(0);
  const [showlist, setShowList] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [hrdata, setHRData] = useState([]);
  const [isediting, setIsEditing] = useState(false);
  const [isHRListButtonVisible, setIsHRListButtonVisible] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const getTeamData = async () => {
      try {
        const res = await api.get("companies/getAll");
        console.log("Fetched companies:", res.data);
        const validCompanies = res.data.filter(
          (company) => company && company.name
        );
        setCompanies(validCompanies);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    getTeamData();
  }, []);

  const getHRList = async (e) => {
    e.preventDefault();
    if (!selectedCompany) {
      alert("Please select a company!!");
    } else {
      setShowList(true);
      try {
        console.log(selectedCompany);
        const res = await api.get(`hr/hrlist/${selectedCompany.id}`);
        console.log("Fetched HR Data:", res.data);
        setHRData(res.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filteredSuggestions = companies.filter((company) =>
        company.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (company) => {
    setSelectedCompany(company);
    setSearchQuery(company.name);
    setSuggestions([]);
  };

  return (
    <div className="mx-auto p-4 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center mb-3 space-y-2 sm:space-y-2 sm:space-x-2 gap-3">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2 mx-2"
          onClick={() => {
            setIsAddPopupVisible(true);
            setEditingCompany(null);
            setCompanyID(selectedCompany?.id || "");
          }}
        >
          Add
        </button>

        {/* Input field for company search with suggestions */}
        <div className="relative flex-1">
          <input
            type="text"
            className="p-3 border rounded shadow-lg w-full"
            placeholder="Search for a company"
            value={searchQuery}
            onChange={handleInputChange}
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded shadow-lg w-full max-h-40 overflow-y-auto">
              {suggestions.map((company, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSuggestionClick(company)}
                >
                  {company.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <FilterForm
          filterMode={filterMode}
          setFilterMode={setFilterMode}
          filterYear={filterYear}
          setFilterYear={setFilterYear}
          clearFilters={() => {
            setFilterMode("");
            setFilterYear("");
            setSearchQuery("");
            setSelectedCompany(null);
            setShowList(false);
            setIsHRListButtonVisible(true);
            setHRData([]);
          }}
        />
      </div>

      {isAddPopupVisible && (
        <AddHR
          onSave={(company) => {
            if (editingCompany) {
              const updatedCompanies = companies.map((comp, index) =>
                index === editingCompany.index ? company : comp
              );
              setCompanies(updatedCompanies);
            } else {
              setCompanies([...companies, company]);
            }
            setEditingCompany(null);
            setIsAddPopupVisible(false);
          }}
          onCancel={() => setIsAddPopupVisible(false)}
          editingCompany={editingCompany}
          setEditingCompany={setEditingCompany}
          validateYear={(year) => /^(19|20)\d{2}$/.test(year)}
          companyid={selectedCompany?.id || ""}
          company_name={selectedCompany?.name || ""}
        />
      )}

      {isediting && (
        <EditHR
          onSave={(company) => {
            const updatedCompanies = companies.map((comp, index) =>
              index === editingCompany.index ? company : comp
            );
            setCompanies(updatedCompanies);
            setEditingCompany(null);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
          editingCompany={editingCompany}
          setEditingCompany={setEditingCompany}
          validateYear={(year) => /^(19|20)\d{2}$/.test(year)}
          companyid={selectedCompany?.id || ""}
          company_name={selectedCompany?.name || ""}
        />
      )}

      {isHRListButtonVisible && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mx-auto block w-full"
          onClick={getHRList}
        >
          Get HR List
        </button>
      )}
      {showlist && (
        <HRList
          companies={hrdata}
          editCompany={(index) => {
            setEditingCompany({ ...hrdata[index], index });
            setIsEditing(true);
          }}
          deleteCompany={async (hrid) => {
            if (window.confirm("Are you sure you want to delete this HR?")) {
              try {
                const res = await api.delete(`hr/${hrid}`);
                console.log(res.data);
                setHRData(hrdata.filter((hr) => hr.id !== hrid));
              } catch (error) {
                console.error("Error deleting HR:", error);
              }
            }
          }}
        />
      )}
    </div>
  );
}

export default HRDash;
