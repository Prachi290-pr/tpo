import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../../api";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [announcementsPerPage] = useState(5);
  const [editAnnouncementId, setEditAnnouncementId] = useState(null);
  const [editAnnouncementText, setEditAnnouncementText] = useState("");
  console.log(editAnnouncementText);

  useEffect(() => {
    fetchAnnouncements();
    fetchCompanies();
  }, []);

  // useEffect(() => {
  //   fetchCompanies();
  // }, []);

  // useEffect(() => {
  //   if (selectedCompany) {
  //     fetchAnnouncements();
  //   } else {
  //     setAnnouncements([]);
  //   }
  // }, [selectedCompany]);

  console.log(announcements);
  const fetchAnnouncements = async () => {
    try {
      const response = await api.get("announcements");
      setAnnouncements(response.data);
      // console.log(announcements);
    } catch (error) {
      // if
      console.error("Error fetching announcements:", error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await api.get("companies/getCompaniesWithJobPostings");
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleAddAnnouncement = async () => {
    console.log(selectedCompany);
    try {
      const newAnnouncementObj = {
        postid: selectedCompany,
        msg: newAnnouncement,
      };

      console.log(newAnnouncement);

      const response = await api.post("announcements", newAnnouncementObj);
      setAnnouncements([...announcements, response.data]);
      setMessage("Announcement added successfully");
      setNewAnnouncement("");
      setSelectedCompany("");
      window.location.reload();
    } catch (error) {
      if(error.response.data.error == "Cannot add or update a child row: a foreign key constraint fails (`tpo_final_database`.`announcements`, CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `job_postings` (`id`))")
        alert("No job posting exists for this company!!!");
      console.error("Error adding announcement:", error);
    }
  };

  const handleUpdateAnnouncement = async (id, msg) => {
    try {
     
      const res = await api.put(`announcements/${id}`, {
        msg,
      });
      console.log(res.data);
      setAnnouncements(
        announcements.map((announcement) =>
          announcement.id === id
            ? { ...announcement, announcement: editAnnouncementText }
            : announcement
        )
      );
      setMessage("Announcement updated successfully");
      setEditAnnouncementId(null);
      setEditAnnouncementText("");
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      await api.delete(`announcements/${id}`);
      setAnnouncements(
        announcements.filter((announcement) => announcement.id !== id)
      );
      setMessage("Announcement deleted successfully");
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const handleClearFilters = () => {
    setSelectedCompany("");
    setCurrentPage(1);
  };

  const filteredAnnouncements = selectedCompany
    ? announcements.filter(
        (announcement) =>
          // console.log(announcement),
        announcement.jobPostingId == selectedCompany
          // if(announcement.jobPostingId == selectedCompany){

          // }
          // announcement.jobPostingId === selectedCompany
          // companies.find( (company) => company.companyId === parseInt(selectedCompany),)
            // ?.name
      )
    : announcements;

  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement =
    indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = filteredAnnouncements.slice(
    indexOfFirstAnnouncement,
    indexOfLastAnnouncement
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function convertToLocalDate(isoDateString) {
    const date = new Date(isoDateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredAnnouncements.length / announcementsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className=" mx-auto p-4 my-6">
      {/* <h4 className="font-bold text-4xl text-center text-black-700 mb-4">
        Announcements
      </h4> */}

      <div className="mb-4">
        <div className="flex flex-wrap gap-3 w-full mb-4 space-x-4">
          <select
            value={selectedCompany}
            onChange={(e) => {
              console.log(e.target.value);
              setSelectedCompany(e.target.value);
              console.log(selectedCompany);
            }}
            className="flex-1 p-3 border rounded shadow-lg"
          >
            <option value="">Select the Company</option>
            {companies.map((company) => (
              <option key={company.companyId} value={company.jobPostingId}>
                {company.companyName} - {convertToLocalDate(company.jobPostDate)}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="New Announcement"
            value={newAnnouncement}
            onChange={(e) => setNewAnnouncement(e.target.value)}
            className="flex-1 p-3 border rounded shadow-lg"
          />
        </div>
        <div className="flex flex-wrap gap-3 justify-between">
          <button
            onClick={handleClearFilters}
            className="bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-700 w-full sm:w-1/4 "
          >
            Clear Filters
          </button>
          <button
            onClick={handleAddAnnouncement}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full sm:w-1/4"
          >
            Add Announcement
          </button>
        </div>
      </div>
      {message && <div className="mb-4 p-2 bg-green-200 ">{message}</div>}

      {/* <div className="flex items-center mb-4 w-1/3 justify-between">
        <select
          value={selectedCompany}
          onChange={(e) => {
            console.log(e.target.value);
            setSelectedCompany(e.target.value);
          }}
          className="flex-1 p-3 border rounded shadow-lg rounded-md "
        >
          <option value="">Select the Company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleClearFilters}
          className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-700  mx-2"
        >
          Clear Filters
        </button>
      </div>
      {message && <div className="mb-4 p-2 bg-green-200 ">{message}</div>}
      <div className="mb-4 flex ">
        <input
          type="text"
          placeholder="New Announcement"
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
          className="flex-1 p-3 border rounded shadow-lg rounded-md"
        />
        <button
          onClick={handleAddAnnouncement}
          className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-700  mx-2"
        >
          Add Announcement
        </button>
      </div> */}
      {/* <div className="max-w-8xl mx-auto my-4 p-4">
        <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
          <thead>
            <tr className=" bg-white text-black text-center">
              <th className="px-4 py-2 bg-white text-black text-center ">Company Name</th>
              <th className="px-4 py-2 bg-white text-black text-center">Announcement</th>
              <th className="px-4 py-2 bg-white text-black text-center">Created At</th>
              <th className="px-4 py-2 bg-white text-black text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAnnouncements.map((announcement) => (
              <tr key={announcement.id}>
                <td className="px-4 py-2">{announcement.name}</td>
                <td className=" px-4 py-2">
                  {editAnnouncementId === announcement.id ? (
                    <input
                      type="text"
                      value={editAnnouncementText}
                      onChange={(e) => setEditAnnouncementText(e.target.value)}
                      className=" p-2"
                    />
                  ) : (
                    announcement.announcement
                  )}
                </td>
                <td className=" px-4 py-2">
                  {new Date(announcement.createdAt).toLocaleString()}
                </td>
                <td className=" px-4 py-2">
                  <div className="flex space-x-2">
                    {editAnnouncementId === announcement.id ? (
                      <button
                        onClick={() =>
                          handleUpdateAnnouncement(
                            announcement.id,
                            editAnnouncementText
                          )
                        }
                        className="bg-blue-500 text-white p-2 rounded m-2 hover:bg-blue-700"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditAnnouncementId(announcement.id);
                          setEditAnnouncementText(announcement.announcement);
                        }}
                        className="bg-blue-500 text-white p-2 rounded m-2 hover:bg-blue-700"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 m-2"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <div className="max-w-8xl mx-auto  p-4">
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-xl rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr className="text-black text-center">
                <th className="px-4 py-2 text-center text-sm font-medium text-white">
                  Company Name
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">
                  Announcement
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">
                  Created At
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentAnnouncements.map((announcement) => (
                <tr
                  key={announcement.id}
                  className="text-center bg-white hover:bg-gray-100"
                >
                  <td className="px-6 py-4 sticky left-0 bg-white z-10">
                    {announcement.name}
                  </td>
                  <td className="px-6 py-4">
                    {editAnnouncementId === announcement.id ? (
                      <input
                        type="text"
                        value={editAnnouncementText}
                        onChange={(e) =>
                          setEditAnnouncementText(e.target.value)
                        }
                        className="p-2 border rounded"
                      />
                    ) : (
                      announcement.announcement
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(announcement.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-around space-x-4">
                      {editAnnouncementId === announcement.id ? (
                        <button
                          onClick={() =>
                            handleUpdateAnnouncement(
                              announcement.id,
                              editAnnouncementText
                            )
                          }
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditAnnouncementId(announcement.id);
                            setEditAnnouncementText(announcement.announcement);
                          }}
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() =>
                          handleDeleteAnnouncement(announcement.id)
                        }
                        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end ">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 mx-1 ${
              number === currentPage
                ? "bg-gray-500 text-white"
                : "bg-gray-200 hover:bg-gray-400 hover:text-white"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
