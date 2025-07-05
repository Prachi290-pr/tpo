import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import api from "../../api";
import AddRemarkForm from "../Company Remark/AddRemarkForm";

const Reconnect = () => {
  const [record, setRecord] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [editRemark, setEditRemark] = useState("");
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [flagCompanies, setFlagCompanies] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [totaldata, setTotalData] = useState([]);
  const [remarkModalOpen, setRemarkModalOpen] = useState(false); // State for the modal
  const [selectedCompany, setSelectedCompany] = useState(null); // State to track selected company for remark
  const [showAddRemarkForm, setShowAddRemarkForm] = useState(false);

  const getData = () => {
    api
      .get(`remarks/flag`)
      .then((response) => {
        setRecord(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getTotalCompanies = () => {
    api
      .get(`companies/getAll`)
      .then((response) => {
        setTotalData(response.data);
        setTotalCompanies(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching total companies:", error);
      });
  };

  const getFlagCompanies = () => {
    api
      .get(`remarks/flag`)
      .then((response) => {
        setFlagCompanies(response.data.length); 
      })
      .catch((error) => {
        console.error("Error fetching flagged companies:", error);
      });
  };

  useEffect(() => {
    getData();
    getTotalCompanies();
    getFlagCompanies();
  }, []);

  const handleEdit = (id) => {
    setEditId(id);
    const recordToEdit = record.find((item) => item.id === id);
    setEditStatus(recordToEdit.status);
    setEditRemark(recordToEdit.remark);
  };

  const handleStatusChange = (event) => {
    setEditStatus(event.target.value);
  };

  const handleRemarkChange = (event) => {
    setEditRemark(event.target.value);
  };

  const handleSave = () => {
    api
      .put(
        `http://localhost:8000/api/companies/update-flagged-remark/${editId}`,
        {
          status: editStatus,
          remark: editRemark,
        }
      )
      .then((response) => {
        const updatedRecords = record.map((item) =>
          item.id === editId
            ? { ...item, status: editStatus, remark: editRemark }
            : item
        );
        setRecord(updatedRecords);
        setEditId(null);
        setEditStatus("");
        setEditRemark("");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating record:", error);
      });
  };

  const handleAddRemarkClick = (company) => {
    console.log(company)
    setSelectedCompany(company.companyId);
    setShowAddRemarkForm(true); // Open the modal to add a remark
  };

  const handleAddRemark = async (newRemark) => {
    try {
      console.log("Sending new remark:", newRemark);

      const response = await api.post(
        `companies/${selectedCompany}/remarks`,
        JSON.stringify(newRemark),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from backend:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error adding remark:", error);
    }
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd-MM-yyyy");
  };

  const filteredCompanies = record.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-5">
      <div className="col main pt-5 mt-3">

      
      <div className="overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto">
          <table className="">
            <thead className="sticky top-0 bg-gray-800 z-8 w-fulls">
              <tr>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">No</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Company Name</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Remark</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Remark Date</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Status</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredCompanies.map((output, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{output.name}</td>
                  <td className="px-4 py-2">
                    {editId === output.id ? (
                      <input
                        type="text"
                        className="form-input border rounded w-full"
                        placeholder="Enter Remark"
                        value={editRemark}
                        onChange={handleRemarkChange}
                      />
                    ) : (
                      output.remark
                    )}
                  </td>
                  <td className="px-4 py-2">{formatDate(output.lastRemarkTime)}</td>
                  <td className="px-4 py-2">
                    {editId === output.id ? (
                      <select
                        className="form-select border rounded w-full"
                        value={editStatus}
                        onChange={handleStatusChange}
                      >
                        <option value="1">Still Communication</option>
                        <option value="2">Confirmed</option>
                        <option value="3">HR</option>
                        <option value="4">Paused</option>
                      </select>
                    ) : (
                      output.status
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleAddRemarkClick(output)}
                    >
                      Add Remark
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAddRemarkForm && (
          <AddRemarkForm
          onAddRemark={handleAddRemark}
          showModal={showAddRemarkForm}
          setShowModal={setShowAddRemarkForm}
        />
        )}
      </div>
    </div>
  );
};

export default Reconnect;
