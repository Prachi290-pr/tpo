import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../../api';

const AllTest = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    api.get('/aptitude')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleEdit = (id) => {
    // Handle edit action
    // const updatedData = prompt("Enter new title for the test:");
    // if (updated Data) {
      api.put(`/aptitude/${id}`)
        .then(response => {
          alert("Test Status Has been updated!")
          window.location.reload()
        })
        .catch(error => {
          console.error('Error updating data:', error);
        });
    // }
  };

  

  return (
    <div className="p-4">
         <div className='overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto'>
      <table className=''>
        <thead className='sticky top-0 bg-gray-800 z-8 w-fulls'>
          <tr>
            <th className='px-4 py-2 text-center text-sm font-medium text-white'>ID</th>
            <th className='px-4 py-2 text-center text-sm font-medium text-white'>Type</th>
            <th className='px-4 py-2 text-center text-sm font-medium text-white'>Level</th>
            <th className='px-4 py-2 text-center text-sm font-medium text-white'>No. of Questions</th>
            <th className='px-4 py-2 text-center text-sm font-medium text-white'>Time</th>
            <th className='px-4 py-2 text-center text-sm font-medium text-white'>Title</th>
            <th className='px-4 py-2 text-center text-sm font-medium text-white'>Date Of Creation</th>
            <th className='px-4 py-2 text-center text-sm font-medium text-white'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item,index) => (
            
            <tr key={item.aid}>
              {console.log('Statsus',item.status)}
              <td>{index+1}</td>
              <td>{item.aptitudetype}</td>
              <td>{item.level}</td>
              <td>{item.noq}</td>
              <td>{item.time}</td>
              <td>{item.title}</td>
              <td>{new Date(item.date_of_creation).toDateString('en-CA')}</td>
              <td className='flex justify-around' >
                <button className={`bg-${item.status==0 ? "red": "blue"}-500 p-4 text-white`} onClick={() => handleEdit(item.aid)}>Active/InActive Test</button>
                {/* <button className='bg-blue-500 p-4 text-white' onClick={() => handleDelete(item.aid)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
</div>   
  );
};

export default AllTest;
