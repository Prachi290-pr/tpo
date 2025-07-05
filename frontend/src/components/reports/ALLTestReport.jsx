/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import * as XLSX from 'xlsx';
import api from '../../api';

const AllTestReprt = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [data, setData] = useState([]);
  const [companyDetails, setCompanyDetails] = useState([]);
  const [title, setTitle] = useState('');
  const [transformedData, setTransformedData] = useState({});

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCompanyChange = (selectedOption) => {
    setTitle(selectedOption.value);
    fetchRegistered(selectedOption.value);
  };

  const fetchCompanies = () => {
    api
      .get("/studentgen/getAallBatch")
      .then((res) => {
        setCompanyDetails(res.data);
      })
      .catch((err) => {
        console.error("Error fetching company details:", err);
      });
  };

  const fetchRegistered = (titles) => {
    api
      .post(`/studentgen/getAllTestReportByTitle`, { ques_title: titles })
      .then((res) => {
        transformData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching registered students:", err);
      });
  };

  const transformData = (rawData) => {
    const transformed = {};
    const allTitles = new Set();

    rawData.forEach((row) => {
      const key = `${row.clg_id}-${row.first_name}-${row.last_name}`;
      const currentTitle = row.title + "-" + row.type;
      allTitles.add(currentTitle);

      if (!transformed[key]) {
        transformed[key] = {
          clg_id: row.clg_id,
          name: `${row.first_name} ${row.last_name}`,
          branch: row.branch,
          titles: {},
        };
      }

      transformed[key].titles[currentTitle] = {
        noq: row.noq,
        total: row.correct_ans,
      };
    });

    // Fill missing titles with NA
    Object.values(transformed).forEach((row) => {
      allTitles.forEach((title) => {
        if (!row.titles[title]) {
          row.titles[title] = {
            noq: 'NA',
            total: 'NA',
          };
        }
      });
    });

    setTransformedData(transformed);
  };

  const downloadExcel = () => {
    const worksheetData = [];
    const titles = new Set();

    Object.values(transformedData).forEach((row) => {
      Object.keys(row.titles).forEach((title) => titles.add(title));
    });

    const headerRow = ['College Id', 'Name', 'Branch', ...Array.from(titles).flatMap((t) => [t])];
    worksheetData.push(headerRow);

    Object.values(transformedData).forEach((row) => {
      const dataRow = [row.clg_id, row.name, row.branch];

      Array.from(titles).forEach((title) => {
        const tData = row.titles[title] || {};
        dataRow.push(row.titles[title].total === 'Rejected' || row.titles[title].total === 'A' || row.titles[title].total === 'Accepted' ? row.titles[title].total : String(tData.total || 'NA') +'/'+ String(tData.noq || 'NA'));
      });

      worksheetData.push(dataRow);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${title}.xlsx`);
  };

  return (
    <div className='container mx-auto mt-5'>
      <Select
        className='w-1/3 mx-auto my-3'
        options={companyDetails.map((company) => ({ value: company.batch, label: company.batch }))}
        onChange={handleCompanyChange}
        placeholder="Select Aptitude Test"
      />
      {title && Object.keys(transformedData).length > 0 ? (
        <div>
          <div className='flex justify-end mb-3'>
            <button
              onClick={downloadExcel}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200"
            >
              Download as Excel
            </button>
          </div>
          <div className='overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto'>
            <table border="1" className="">
              <thead className='sticky top-0 bg-gray-800 z-8 w-full'>
                <tr>
                  <th className="px-4 py-2 text-center text-sm font-medium text-white">Sr No</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-white">College Id</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-white">Name</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-white">Branch</th>
                  {Array.from(new Set(Object.values(transformedData).flatMap((row) => Object.keys(row.titles)))).map((t, idx) => (
                    <React.Fragment key={idx}>
                      <th className="px-4 py-2 text-center text-sm font-medium text-white">{t} Total</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.values(transformedData).map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.clg_id}</td>
                    <td>{row.name}</td>
                    <td>{row.branch}</td>
                    {Object.keys(row.titles).map((title, idx) => (
                      <React.Fragment key={idx}>
                        <td>{row.titles[title].total === 'Rejected' || row.titles[title].total === 'A'  || row.titles[title].total === 'Accepted' ? row.titles[title].total : `${row.titles[title].total}/${row.titles[title].noq}`}</td>
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className='text-center'>No data available</p>
      )}
    </div>
  );
};

export default AllTestReprt;
