import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompleteTest = () => {
  const [seconds, setSeconds] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        // Navigate to the login page after countdown ends
        navigate("/");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2>Test Completed</h2>
        <p>Returning to dashboard in {seconds} seconds...</p>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Ensure component fills the entire viewport
    backgroundColor: '#f0f0f0',
  },
  content: {
    textAlign: 'center',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default CompleteTest;
