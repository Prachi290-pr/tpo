import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api";
// import { useAuthStore } from "../store/authStore";

const PracticalList = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [practicals, setPracticals] = useState([]);
  const [course, setCourse] = useState(null);
  const [batchAccess, setBatchAccess] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPracticalId, setSelectedPracticalId] = useState(null);
//   const user = useAuthStore((state) => state.user);
  const isStudent = true;

  useEffect(() => {
    fetchPracticals();
    // fetchCourse();
  }, []);

  const fetchPracticals = async () => {
    try {
      let response;
      response = await api.get(`/machinetest/practicals/`);
      console.log(response.data)
    //   if (false) {
    //     response = await api.get(`/machinetest/practicals/`);
    //   } else {
    //     response = await api.get(`/practicals/course/${courseId}`);
    //   }
      setPracticals(response.data);
    } catch (error) {
      console.error("Error fetching practicals:", error);
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await api.get(`/courses/${courseId}`);
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const fetchBatchAccess = async (practicalId) => {
    try {
      const response = await api.get(`/batch-practical-access/${practicalId}`);
      setBatchAccess(response.data);
    } catch (error) {
      console.error("Error fetching batch access:", error);
    }
  };

  const handleAccessClick = (practicalId) => {
    setSelectedPracticalId(practicalId);
    fetchBatchAccess(practicalId);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (practicalId) => {
    try {
      await api.delete(`/practicals/${practicalId}`);
      fetchPracticals();
    } catch (error) {
      console.error("Error deleting practical:", error);
    }
  };

  

  const renderStudentCard = (practical) => {
    const isLocked = practical.lock;
    return (
      <div key={practical.practical_id} className="aptitude-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full sm:w-72 md:w-80 lg:w-96 xl:w-1/4"
      onClick={() => navigate(`/coding/${practical.practical_id}`)}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
             {practical.practical_name}
          </h3>
          {/* <span className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs">Status: {practical.status || "Not Submitted"}</span> */}
        </div>
        {/* <p className="text-gray-700">{practical.description}</p> */}
        {/* <p className="mt-2 text-sm text-gray-500">Deadline: {new Date(practical.deadline).toLocaleString()}</p> */}
      </div>
    );
  };

  return (
    <div className="container mx-auto mt-4 p-4">
      {/* <h1 className="text-3xl font-bold mb-6">Tests</h1> */}

      <div className="flex flex-wrap justify-center gap-6">
        {practicals && practicals.map((practical) => 
            renderStudentCard(practical)
        )}
      </div>
       
    </div>
  );
};

export default PracticalList;