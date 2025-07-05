/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import * as XLSX from 'xlsx';
import api from '../../api';

const AllEventTestReprt = () => {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [data, setData] = useState([]);
  const [companyDetails, setCompanyDetails] = useState([]);
  const [eventDetails, setEventDetails] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleBatchChange = (selectedOption) => {
    setSelectedBatch(selectedOption.value);
    fetchEvents(selectedOption.value);
  };

  const handleEventChange = (selectedOption) => {
    setSelectedEvent(selectedOption.value);
    fetchRegistered(selectedOption.value);
  };

  const handleBranchChange = (selectedOption) => {
    setSelectedBranch(selectedOption?.value || null);
  };

  const fetchBatches = () => {
    api
      .get('/studentgen/getAallBatch')
      .then((res) => {
        setCompanyDetails(res.data);
      })
      .catch((err) => {
        console.error('Error fetching batch details:', err);
      });
  };

  const fetchEvents = (batch) => {
    api
      .post('/studentgen/getEventsByBatch', { batch })
      .then((res) => {
        setEventDetails(res.data);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
      });
  };

  const fetchRegistered = (eventId) => {
    api
      .post('/studentgen/getAllTestReportByEventId', { event_id: eventId })
      .then((res) => {
        setTransformedData(res.data);
        setFilteredData(res.data); // Initialize filtered data
      })
      .catch((err) => {
        console.error('Error fetching registered students:', err);
      });
  };

  // Apply filters for batch and branch
  useEffect(() => {
    if (transformedData.length > 0) {
      const filtered = transformedData.filter((row) => {
        const matchesBatch = selectedBatch ? row.degree_year === selectedBatch : true;
        const matchesBranch = selectedBranch ? row.branch === selectedBranch : true;
        return matchesBatch && matchesBranch;
      });
      setFilteredData(filtered);
    }
  }, [selectedBatch, selectedBranch, transformedData]);

  const downloadExcel = () => {
    const worksheetData = [];
    const headerRow = [
      'Sr No',
      'College Id',
      'Name',
      'Branch',
      'Batch',
      'Aptitude',
      'Interview',
      'Machine Test',
    ];
    worksheetData.push(headerRow);

    filteredData.forEach((row, index) => {
      const dataRow = [
        index + 1,
        row.clg_id,
        row.name,
        row.branch,
        row.degree_year,
        row.apti_correct_ans === 'A' ? row.apti_correct_ans : `${row.apti_correct_ans || 'NA'}/${row.apti_noq || 'NA'}`,
        row.inter_correct_ans === 'A' ? row.inter_correct_ans : `${row.inter_correct_ans || 'NA'}/${row.inter_noq || 'NA'}`,
        row.machine_test || 'NA',
      ];
      worksheetData.push(dataRow);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Event Test Report');
    XLSX.writeFile(workbook, `EventTestReport.xlsx`);
  };

  return (
    <div className="container mx-auto mt-5">
    
      <Select
        className="w-1/3 mx-auto my-3"
        options={companyDetails.map((company) => ({ value: company.batch, label: company.batch }))}
        onChange={handleBatchChange}
        placeholder="Select Academic Year"
      />
      {selectedBatch && (
        <Select
          className="w-1/3 mx-auto my-3"
          options={eventDetails.map((event) => ({ value: event.eventId, label: event.eventName }))}
          onChange={handleEventChange}
          placeholder="Select Event"
        />
      )}
      {selectedEvent && (
        <div>
          <Select
            className="w-1/3 mx-auto my-3"
            options={[
              ...new Set(transformedData.map((row) => row.branch)),
            ].map((branch) => ({ value: branch, label: branch }))}
            onChange={handleBranchChange}
            isClearable
            placeholder="Filter by Branch"
          />
          <div className="flex justify-end mb-3">
            <button
              onClick={downloadExcel}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200"
            >
              Download as Excel
            </button>
          </div>
          <div className="overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto">
            <table border="1" className="">
              <thead className="sticky top-0 bg-gray-800 z-8 w-full">
                <tr>
                  <th className="px-4 py-2 text-center text-sm font-medium text-white">Sr No</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-white">College Id</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-white">Name</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-white">Branch</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-white">Batch</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-white">Aptitude</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-white">Interview</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-white">Machine Test</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.clg_id}</td>
                    <td>{row.name}</td>
                    <td>{row.branch}</td>
                    <td>{row.degree_year}</td>
                    <td>{row.apti_correct_ans === 'A' ? row.apti_correct_ans : `${row.apti_correct_ans}/${row.apti_noq}`}</td>
                    <td>{row.inter_correct_ans === 'A' ? row.inter_correct_ans : `${row.inter_correct_ans}/${row.inter_noq}`}</td>
                    <td>{row.machine_test || 'NA'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!selectedEvent && <p className="text-center">No data available</p>}
    </div>
  );
};

export default AllEventTestReprt;