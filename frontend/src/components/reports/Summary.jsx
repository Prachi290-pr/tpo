import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import api from '../../api';

const SummarySheet = () => {
  const [strength, setStrength] = useState([]);
  const [regis, setRegis] = useState([]);
  const [campusType, setCampusType] = useState([]);
  const [offered, setOffered] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [totals, setTotals] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/getSummary');
        setStrength(response.data.strength);
        setRegis(response.data.regis);
        setCampusType(response.data.campusType);
        processSummaryData(response.data.strength, response.data.regis, response.data.campusType,response.data.offered);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Process data to form the summary
  const processSummaryData = (strengthData, regisData, campusData,offered) => {
    // Map to hold department-wise summary
    const summary = {};

    const totals = {
      strength: 0,
      placementTotal: 0,
      placementOnCampus: 0,
      placementOffCampus: 0,
      higherStudies: 0,
      entrepreneurship: 0,
      unplaced: 0,
      companiesOnCampus: 0,
      companiesOffCampus: 0,
      companiesTotal: 0,
      placed:0
    };

    // Initialize departments from the strength data
    strengthData.forEach((item) => {
      if (!summary[item.branch]) {
        summary[item.branch] = {
          department: item.branch,
          strength: item.s,
          placement: { total: 0, onCampus: 0, offCampus: 0 },
          higherStudies: 0,
          entrepreneurship: 0, // Assuming no data for entrepreneurship
          unplaced: 0,
          companies: { onCampus: 0, offCampus: 0, total: 0 },
          maxoffered:0,
          minoffred:0,
          avgoffred:0,
          placed:0
        };
      }
    });

    // Populate Placement, Higher Studies, Unplaced based on regisData
    regisData.forEach((item) => {
      const branch = item.branch;
      if (summary[branch]) {
        if (item.interested_in === 'Placement') {
          summary[branch].placement.total += Number(item.total_students);
          summary[branch].placement.onCampus += Number(item.count_on); // Assuming all placements are on-campus
          summary[branch].placement.offCampus += Number(item.count_off);
          summary[branch].unplaced += Number(item.unplaced_students);
          summary[branch].placed += Number(item.count_on);
          summary[branch].placed += Number(item.count_off);

          totals.placementTotal += Number(item.total_students);
          totals.placementOnCampus += Number(item.count_on);
          totals.placementOffCampus += Number(item.count_off);
          totals.unplaced += Number(item.unplaced_students);
          totals.placed += Number(item.count_on);
          totals.placed += Number(item.count_off);
        } else if (item.interested_in === 'Higher Studies') {
          summary[branch].higherStudies += Number(item.total_students);
          totals.higherStudies += Number(item.total_students);
        }
        else if (item.interested_in === 'Entrepreneurship') {
          summary[branch].entrepreneurship += Number(item.entrepreneurship);
          totals.entrepreneurship += Number(item.total_students);
        }
        totals.strength += Number(item.total_students);

      }
    });

    // Populate Companies data based on campusType
    campusData.forEach((item) => {
      const branch = item.Branch;
      if (summary[branch]) {
        if (item.onoff === 'on') {
          summary[branch].companies.onCampus += Number(item.Total_Count);
          totals.companiesOnCampus += Number(item.Total_Count);
        } else if (item.onoff === 'off') {
          summary[branch].companies.offCampus += Number(item.Total_Count);
          totals.companiesOffCampus += Number(item.Total_Count);
        }
        summary[branch].companies.total += Number(item.Total_Count);
        summary[branch].maxoffered = String(Number(offered[0].max_offered)) +'-'+ offered[0].maxCompanyOffered;
        summary[branch].minoffred = String(Number(offered[0].min_offered)) +'-'+offered[0].minCompanyOffered;
        summary[branch].avgoffred = Number(offered[0].avg_offered);
        summary[branch].maxse = Number(offered[0].max_se)  +'-'+ offered[0].maxCompanySecured;
        summary[branch].minse = Number(offered[0].min_se) +'-'+ offered[0].minCompanySecured;
        summary[branch].avgse = Number(offered[0].avg_se);
        totals.companiesTotal += Number(item.Total_Count);
      }
    });

    // console.log(offered)
    

    // Convert summary object to array for renderingsetTotals(totals);
    setTotals(totals);
    setSummaryData(Object.values(summary));
  };

  // Handle the download of the Excel file
  const handleDownload = () => {
    // Define the data structure for the Excel sheet based on the fetched data
    const sheetData = [
        [
            'Academic Year', 'Department', 'Strength', 'Placement', 'Placed', '', '', 'Higher Studies',
            'Entrepreneurship', 'Unplaced', 'Companies', '', '', 'Max Salary Offered', 'Min Salary Offered', 'Average Salary Offered',
            'Max Salary Secured', 'Min Salary Secured', 'Average Salary Secured'
        ],
        ['', '', '', '', 'Total', 'On Campus', 'Off Campus', '', '', '', 'On Campus', 'Off Campus', 'Total'],
        ...summaryData.map(row => [
            '2024-2025', // Static for the demo; replace with actual dynamic values if available
            row.department, row.strength,
            row.placement.total, row.placed, row.placement.onCampus, row.placement.offCampus,
            row.higherStudies, row.entrepreneurship, row.unplaced,
            row.companies.onCampus, row.companies.offCampus, row.companies.total,
            row.maxoffered, row.minoffred, row.avgoffred,
            row.maxse, row.minse, row.avgse
        ]),
        [
            '', 'Total', totals.strength, totals.placementTotal, totals.placed, totals.placementOnCampus, totals.placementOffCampus,
            totals.higherStudies, totals.entrepreneurship, totals.unplaced,
            totals.companiesOnCampus, totals.companiesOffCampus, totals.companiesTotal,
            '', '', '', '', '', '' // For max, min, avg columns if needed
        ]
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    // Adjusted merges
    worksheet['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },  // Merge "Academic Year" vertically (rowspan 2)
        { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },  // Merge "Department" vertically (rowspan 2)
        { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } },  // Merge "Strength" vertically (rowspan 2)
        { s: { r: 0, c: 3 }, e: { r: 1, c: 3 } },  // Merge "Placement" header (colspan 4)
        { s: { r: 0, c: 7 }, e: { r: 1, c: 7 } },  // Merge "Higher Studies" vertically (rowspan 2)
        { s: { r: 0, c: 8 }, e: { r: 1, c: 8 } },  // Merge "Entrepreneurship" vertically (rowspan 2)
        { s: { r: 0, c: 9 }, e: { r: 1, c: 9 } },  // Merge "Unplaced" vertically (rowspan 2)
        { s: { r: 0, c: 10 }, e: { r: 0, c: 12 } }, // Merge "Companies" header (colspan 3)
        { s: { r: 0, c: 13 }, e: { r: 1, c: 13 } }, // Merge "Max Salary Offered" vertically (rowspan 2)
        { s: { r: 0, c: 14 }, e: { r: 1, c: 14 } }, // Merge "Min Salary Offered" vertically (rowspan 2)
        { s: { r: 0, c: 15 }, e: { r: 1, c: 15 } }, // Merge "Average Salary Offered" vertically (rowspan 2)
        { s: { r: 0, c: 16 }, e: { r: 1, c: 16 } }, // Merge "Max Salary Secured" vertically (rowspan 2)
        { s: { r: 0, c: 17 }, e: { r: 1, c: 17 } }, // Merge "Min Salary Secured" vertically (rowspan 2)
        { s: { r: 0, c: 18 }, e: { r: 1, c: 18 } }  // Merge "Average Secured" vertically (rowspan 2)
    ];

    // Write to Excel
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Placement Data');
    XLSX.writeFile(workbook, `Placement_Data_${Date.now()}.xlsx`);
};




  return (
    <div className='p-4'>
    <div className="overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto">
      {/* <h2 className="text-2xl font-bold mb-4">Placement Data Summary</h2> */}
      <table className="">
        <thead>
          <tr className="sticky top-0 bg-gray-800 z-8 w-fulls">
            <th className="px-4 py-2 text-center text-sm font-medium text-white" rowSpan='2'>Academic Year</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white" rowSpan='2'>Department</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white" rowSpan='2'>Strength</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white" rowSpan="2">Placement</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white" colSpan="3">Placed</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white" rowSpan='2'>Higher Studies</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white" rowSpan='2'>Entrepreneurship</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white" rowSpan='2'>Unplaced</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white" colSpan="3">Companies</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white" rowSpan="2">Max Offered</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white" rowSpan="2">Min Offered</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white" rowSpan="2">Average Offered</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white" rowSpan="2">Max Secured</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white" rowSpan="2">Min Secured</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white" rowSpan="2">Average Secured</th>
          </tr>
          <tr className="bg-gray-100">
            {/* <th className="py-2 border"></th>
            <th className="py-2 border"></th>
            <th className="py-2 border"></th> */}
            <th className="px-4 py-2 text-center text-sm font-medium text-white">Total</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white">On Campus</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white">Off Campus</th>
            {/* <th className="py-2 border"></th>
            <th className="py-2 border"></th>
            <th className="py-2 border"></th> */}
            <th className="px-4 py-2 text-center text-sm font-medium text-white">On Campus</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white">Off Campus</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan="4">2025</td>
          </tr>
          {summaryData.map((row, index) => (
            <tr key={index}>
             {/* Adjust as necessary */}
              <td className="py-2 border">{row.department}</td>
              <td className="py-2 border">{row.strength}</td>
              <td className="py-2 border">{row.placement.total}</td>
              <td className="py-2 border">{row.placed}</td>
              <td className="py-2 border">{row.placement.onCampus}</td>
              <td className="py-2 border">{row.placement.offCampus}</td>
              <td className="py-2 border">{row.higherStudies}</td>
              <td className="py-2 border">{row.entrepreneurship}</td>
              <td className="py-2 border">{row.unplaced}</td>
              <td className="py-2 border">{row.companies.onCampus}</td>
              <td className="py-2 border">{row.companies.offCampus}</td>
              <td className="py-2 border">{row.companies.total}</td>
              <td className="py-2 border">{row.maxoffered}</td>
              <td className="py-2 border">{row.minoffred}</td>
              <td className="py-2 border">{row.avgoffred}</td>
              <td className="py-2 border">{row.maxse}</td>
              <td className="py-2 border">{row.minse}</td>
              <td className="py-2 border">{row.avgse}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th className='px-4 py-2 text-center text-sm font-medium text-white' colSpan={2}>Total</th>
            <td>{totals.strength}</td>
            <td>{totals.placementTotal}</td>
            <td>{totals.placed}</td>
            <td>{totals.placementOnCampus}</td>
            <td>{totals.placementOffCampus}</td>
            <td>{totals.higherStudies}</td>
            <td>{totals.entrepreneurship}</td>
            <td>{totals.unplaced}</td>
            <td>{totals.companiesOnCampus}</td>
            <td>{totals.companiesOffCampus}</td>
            <td>{totals.companiesTotal}</td>
          </tr>
        </tfoot>
      </table>
      <button
        onClick={handleDownload}
        className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
      >
        Download Excel
      </button>
    </div>
    </div>
  );
};

export default SummarySheet;
