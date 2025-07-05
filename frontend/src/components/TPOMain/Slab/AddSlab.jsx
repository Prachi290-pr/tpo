import React, { useState, useEffect } from 'react';
import api from '../../../api';

const AddSlagForm = () => {
  const [slag, setSlag] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [slab, setSlab] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchSlab();
  }, []);

  const fetchSlab = async () => {
    try {
      const response = await api.get('/slab/slabs');
      setSlab(response.data);
    } catch (err) {
      console.error('Failed to fetch slab', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!slag || !minSalary || !maxSalary) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await api.post('/slab/slabs', {
        descs: slag,
        min_sal: minSalary,
        max_sal: maxSalary,
      });
      if (response.status === 200) {
        setSuccess('Slab added successfully!');
        setSlag('');
        setMinSalary('');
        setMaxSalary('');
        fetchSlab(); // Update the list after adding a new slab
      }
    } catch (err) {
      setError('Failed to add slab. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/slab/slabs/${id}`);
      if (response.status === 200) {
        setSuccess('Slab deleted successfully!');
        fetchSlab(); // Update the list after deleting a slab
      }
    } catch (err) {
      setError('Failed to delete slab. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add Slab</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="slag" className="block text-sm font-medium text-gray-700">
            Slab Description
          </label>
          <input
            type="text"
            id="slag"
            value={slag}
            onChange={(e) => setSlag(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="minSalary" className="block text-sm font-medium text-gray-700">
            Minimum Salary
          </label>
          <input
            type="number"
            id="minSalary"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="maxSalary" className="block text-sm font-medium text-gray-700">
            Maximum Salary
          </label>
          <input
            type="number"
            id="maxSalary"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Slab
        </button>
      </form>

      <h3 className="text-lg font-bold mt-8">Available Slabs</h3>
      {slab.length !== 0 ? (
        <table className="min-w-full bg-white mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Slab Description</th>
              <th className="py-2 px-4 border-b">Min Salary</th>
              <th className="py-2 px-4 border-b">Max Salary</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slab.map((slag) => (
              <tr key={slag.salad_id}>
                <td className="py-2 px-4 border-b">{slag.salad_id}</td>
                <td className="py-2 px-4 border-b">{slag.descs}</td>
                <td className="py-2 px-4 border-b">{slag.min_sal}</td>
                <td className="py-2 px-4 border-b">{slag.max_sal}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDelete(slag.salad_id)}
                    className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mt-4">No slabs available.</p>
      )}
    </div>
  );
};

export default AddSlagForm;
