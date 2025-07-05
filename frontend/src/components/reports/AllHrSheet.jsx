import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import api from '../../api';

const AllHrSheet = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    api.get('/hr/hrlists/allCompany')
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to export table data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.map((item, index) => ({
      'Sr No.': index + 1,
      'Company Name': item.cname,
      'HR Name': item.name,
      'HR Email': item.email,
      'Contact': item.contact,
      'Alternate Contact': item.alternate_contact
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "HR Data");
    XLSX.writeFile(workbook, "HR_Data.xlsx");
  };

  return (
    <div className="p-4">
      <button
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        onClick={exportToExcel}
      >
        Export to Excel
      </button>
        <div className='overflow-x-auto shadow-xl rounded-lg'>
        <div className="overflow-y-auto max-h-[500px]">
          <table className=''>
            <thead className="sticky top-0 bg-gray-800 z-8 w-fulls">
              <tr>
                <th className='px-4 py-2 text-center text-sm font-medium text-white'>Sr No.</th>
                <th className='px-4 py-2 text-center text-sm font-medium text-white'>Company Name</th>
                <th className='px-4 py-2 text-center text-sm font-medium text-white'>HR Name</th>
                <th className='px-4 py-2 text-center text-sm font-medium text-white'>HR Email</th>
                <th className='px-4 py-2 text-center text-sm font-medium text-white'>Contact</th>
                <th className='px-4 py-2 text-center text-sm font-medium text-white'>Alternate Contact</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.aid} className="bg-white hover:bg-gray-100">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">{item.cname}</td>
                  <td className="px-4 py-2 text-center">{item.name}</td>
                  <td className="px-4 py-2 text-center">{item.email}</td>
                  <td className="px-4 py-2 text-center">{item.contact}</td>
                  <td className="px-4 py-2 text-center">{item.alternate_contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

    </div>
  );
};

export default AllHrSheet;
