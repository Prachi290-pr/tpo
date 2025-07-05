import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../../../api';

const StartRegi = ({ email }) => {
  const [isActive, setIsActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await api.get('/register/registrationStatus');

        if (response.status === 200) {
          setIsActive(response.data.val);
        } else {
          setStatusMessage('Failed to fetch registration status.');
        }
      } catch (error) {
        setStatusMessage('Failed to fetch registration status. Please try again.');
      }
    };

    fetchStatus();
  }, []);


  const toggleStatus = async () => {
    try {
      const response = await api.get('/register/toggle-registration-status');

      if (response.status === 200) {
        setIsActive(!isActive);
        setStatusMessage(`User registration is now ${!isActive ? 'inactive' : 'active'}.`);
      }
    } catch (error) {
      setStatusMessage('Failed to change registration status. Please try again.');
    }
  };

  return (
    <div className="p-4 text-center">
      <button
        onClick={toggleStatus}
        className={`py-2 px-4 rounded ${
          isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}
      >
        {isActive ? 'Deactivate Registration' : 'Activate Registration'}
      </button>
      {statusMessage && <div className="mt-2 text-gray-700">{statusMessage}</div>}
    </div>
  );
};

export default StartRegi;
