/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// import { utils, writeFile } from "xlsx";
import * as XLSX from "xlsx";
import axios from "axios";
import api from "../../api";

const TpoTable = () => {
  const columns = [
    "Sr. No.",
    // "TPO_ID",
    "College_ID",
    "First_Name",
    "Middle_Name",
    "Last_Name",
    "Branch",
    "Contact No.",
    "College Email Id",
    "SSC_(%)",
    "HSC_(%)",
    "Diploma (%)",
    "Degree (%)",
    "Degree (CGPA)",
  ];

  const [studentDetails, setStudentDetails] = useState([]);
  const [companyDetails, setCompanyDetails] = useState([]);
  const [eligible, setEligible] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [placed, setPlaced] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");

  useEffect(() => {
    fetchERPDetails();
    fetchERPCompanies();
    // fetchERPEligible();
    // fetchERPRegisteredStudents();
    // fetchERPPlacedStudents();
  }, []);

  useEffect(() => {
    if (companyDetails.length > 0) {
      fetchERPEligible();
      fetchERPRegisteredStudents();
      fetchERPPlacedStudents();
    }
  }, [companyDetails]);


  const fetchERPCompanies = () => {
    api
      .get("/erp/geterpcompanyreport")
      .then((res) => {
        setCompanyDetails(res.data);
      })
      .catch((err) => {
        console.error("Error fetching company details:", err);
      });
  };

  const fetchERPDetails = () => {
    api
      .get("/erp/geterpdetails")
      .then((res) => {
        setStudentDetails(res.data);
      })
      .catch((err) => {
        console.error("Error fetching placed students:", err);
      });
  };

  const fetchERPEligible = () => {
    api
      .get("/erp/geterpeligibility")
      .then((res) => {
        setEligible(res.data);
      })
      .catch((err) => {
        console.error("Error fetching registered students:", err);
      });
  };

  const fetchERPRegisteredStudents = () => {
    api
      .get("/erp/geterpregistered")
      .then((res) => {
        setRegistered(res.data);
      })
      .catch((err) => {
        console.error("Error fetching registered students:", err);
      });
  };

  const fetchERPPlacedStudents = () => {
    api
      .get("/erp/geterpplaced")
      .then((res) => {
        setPlaced(res.data);
      })
      .catch((err) => {
        console.error("Error fetching placed students:", err);
      });
  };

  
  const exportToExcel = () => {
    const createDataArray = (filterFunc) => {
      const data = [];
    
      // Add the first row with column headers
      const headerRow = columns.map((column) => column);
      filteredCompanies.forEach((company) => {
        headerRow.push(
          `${company.name} (E)`,
          `${company.name} (R)`,
          `${company.name} (R2)`,
          `${company.name} (R3)`,
          `${company.name} (R4)`,
          `${company.name} (P)`
        );
      });
    
      // Add total columns
      headerRow.push("Total E", "Total R", "Total R2", "Total R3", "Total R4", "Total P");
      data.push(headerRow);
    
      // Add the filtered student data
      studentDetails.forEach((student, index) => {
        const rowData = [
          index + 1,
          student.clg_id || "-",
          student.first_name || "-",
          student.middle_name || "-",
          student.last_name || "-",
          student.branch || "-",
          student.mobile || "-",
          student.email_id || "-",
          student.ssc_per || "-",
          student.hsc_per || "-",
          student.diploma_per || "-",
          student.degree_per || "-",
          student.degree_cgpa || "-"
        ];
    
        // Initialize total counts for each status
        let totalE = 0, totalR = 0, totalR2 = 0, totalR3 = 0, totalR4 = 0, totalP = 0;
    
        filteredCompanies.forEach((company) => {
          const isE = isStudentEligible(student.id, company.id) ? 1 : 0;
          const isR = isStudentRegistered(student.id, company.id) ? 1 : 0;
          const isR2 = isStudentR2(student.id, company.id) ? 1 : 0;
          const isR3 = isStudentR3(student.id, company.id) ? 1 : 0;
          const isR4 = isStudentR4(student.id, company.id) ? 1 : 0;
          const isP = isStudentPlaced(student.id, company.id) ? 1 : 0;
    
          // Push values for the current company
          rowData.push(isE, isR, isR2, isR3, isR4, isP);
    
          // Add to totals
          totalE += isE;
          totalR += isR;
          totalR2 += isR2;
          totalR3 += isR3;
          totalR4 += isR4;
          totalP += isP;
        });
    
        // Push total counts for the student
        rowData.push(totalE, totalR, totalR2, totalR3, totalR4, totalP);
    
        if (filterFunc(student)) {
          data.push(rowData);
        }
      });
    
      return data;
    };
    
    const SummaryArray = (filterFunc) => {
      const data = [];
    
      // Add the first row with column headers
      const headerRow = columns.map((column) => column);
    
      // Add total columns
      headerRow.push("Total E", "Total R", "Total R2", "Total R3", "Total R4", "Total P");
      data.push(headerRow);
    
      // Add the filtered student data
      studentDetails.forEach((student, index) => {
        const rowData = [
          index + 1,
          student.clg_id || "-",
          student.first_name || "-",
          student.middle_name || "-",
          student.last_name || "-",
          student.branch || "-",
          student.mobile || "-",
          student.email_id || "-",
          student.ssc_per || "-",
          student.hsc_per || "-",
          student.diploma_per || "-",
          student.degree_per || "-",
          student.degree_cgpa || "-"
        ];
    
        // Initialize total counts for each status
        let totalE = 0, totalR = 0, totalR2 = 0, totalR3 = 0, totalR4 = 0, totalP = 0;
    
        filteredCompanies.forEach((company) => {
          const isE = isStudentEligible(student.id, company.id) ? 1 : 0;
          const isR = isStudentRegistered(student.id, company.id) ? 1 : 0;
          const isR2 = isStudentR2(student.id, company.id) ? 1 : 0;
          const isR3 = isStudentR3(student.id, company.id) ? 1 : 0;
          const isR4 = isStudentR4(student.id, company.id) ? 1 : 0;
          const isP = isStudentPlaced(student.id, company.id) ? 1 : 0;
    
    
          // Add to totals
          totalE += isE;
          totalR += isR;
          totalR2 += isR2;
          totalR3 += isR3;
          totalR4 += isR4;
          totalP += isP;
        });
    
        // Push total counts for the student
        rowData.push(totalE, totalR, totalR2, totalR3, totalR4, totalP);
    
        if (filterFunc(student)) {
          data.push(rowData);
        }
      });
    
      return data;
    };

    const createDataArrayEligible = (filterFunc) => {
      const data = [];
    
      // Add the first row with column headers
      const headerRow = columns.map((column) => column);
      
      // Add headers for eligible status for each company
      filteredCompanies.forEach((company) => {
        headerRow.push(`${company.name} (E)`);
      });
      
      // Add the 'Total Eligible' column header
      headerRow.push("Total Eligible");
      data.push(headerRow);
    
      // Add the filtered student data
      studentDetails.forEach((student, index) => {
        const rowData = [
          index + 1,
          student.clg_id || "-",
          student.first_name || "-",
          student.middle_name || "-",
          student.last_name || "-",
          student.branch || "-",
          student.mobile || "-",
          student.email_id || "-",
          student.ssc_per || "-",
          student.hsc_per || "-",
          student.diploma_per || "-",
          student.degree_per || "-",
          student.degree_cgpa || "-"
        ];
    
        // Calculate total eligible companies for each student
        let totalEligible = 0;
        filteredCompanies.forEach((company) => {
          const isEligible = isStudentEligible(student.id, company.id) ? 1 : 0;
          rowData.push(isEligible);
          totalEligible += isEligible; // Increment total eligible
        });
    
        // Add the total eligible count for the student
        rowData.push(totalEligible);
    
        // Push the row if the filter condition is met
        if (filterFunc(student)) {
          data.push(rowData);
        }
      });
    
      return data;
    };
    

    const createDataArrayRegister = (filterFunc) => {
      const data = [];
    
      // Add the first row with column headers
      const headerRow = columns.map((column) => column);
    
      // Add headers for registered status for each company
      filteredCompanies.forEach((company) => {
        headerRow.push(`${company.name} (R)`);
      });
    
      // Add the 'Total Registered' column header
      headerRow.push("Total Registered");
      data.push(headerRow);
    
      // Add the filtered student data
      studentDetails.forEach((student, index) => {
        const rowData = [
          index + 1,
          student.clg_id || "-",
          student.first_name || "-",
          student.middle_name || "-",
          student.last_name || "-",
          student.branch || "-",
          student.mobile || "-",
          student.email_id || "-",
          student.ssc_per || "-",
          student.hsc_per || "-",
          student.diploma_per || "-",
          student.degree_per || "-",
          student.degree_cgpa || "-"
        ];
    
        // Calculate total registered companies for each student
        let totalRegistered = 0;
        filteredCompanies.forEach((company) => {
          const isRegistered = isStudentRegistered(student.id, company.id) ? 1 : 0;
          rowData.push(isRegistered);
          totalRegistered += isRegistered; // Increment total registered
        });
    
        // Add the total registered count for the student
        rowData.push(totalRegistered);
    
        // Push the row if the filter condition is met
        if (filterFunc(student)) {
          data.push(rowData);
        }
      });
    
      return data;
    };
    

    const createDataArrayR2 = (filterFunc) => {
      const data = [];
    
      // Add the first row with column headers
      const headerRow = columns.map((column) => column);
      filteredCompanies.forEach((company) => {
        headerRow.push(`${company.name} (R2)`);
      });
    
      // Add the 'Total R2' column header
      headerRow.push("Total R2");
      data.push(headerRow);
    
      // Add the filtered student data
      studentDetails.forEach((student, index) => {
        const rowData = [
          index + 1,
          student.clg_id || "-",
          student.first_name || "-",
          student.middle_name || "-",
          student.last_name || "-",
          student.branch || "-",
          student.mobile || "-",
          student.email_id || "-",
          student.ssc_per || "-",
          student.hsc_per || "-",
          student.diploma_per || "-",
          student.degree_per || "-",
          student.degree_cgpa || "-"
        ];
    
        let totalR2 = 0;
        filteredCompanies.forEach((company) => {
          const isR2 = isStudentR2(student.id, company.id) ? 1 : 0;
          rowData.push(isR2);
          totalR2 += isR2;
        });
    
        // Add the total R2 count for the student
        rowData.push(totalR2);
    
        if (filterFunc(student)) {
          data.push(rowData);
        }
      });
    
      return data;
    };
    

    const createDataArrayR3 = (filterFunc) => {
      const data = [];
    
      // Add the first row with column headers
      const headerRow = columns.map((column) => column);
      filteredCompanies.forEach((company) => {
        headerRow.push(`${company.name} (R3)`);
      });
    
      // Add the 'Total R3' column header
      headerRow.push("Total R3");
      data.push(headerRow);
    
      // Add the filtered student data
      studentDetails.forEach((student, index) => {
        const rowData = [
          index + 1,
          student.clg_id || "-",
          student.first_name || "-",
          student.middle_name || "-",
          student.last_name || "-",
          student.branch || "-",
          student.mobile || "-",
          student.email_id || "-",
          student.ssc_per || "-",
          student.hsc_per || "-",
          student.diploma_per || "-",
          student.degree_per || "-",
          student.degree_cgpa || "-"
        ];
    
        let totalR3 = 0;
        filteredCompanies.forEach((company) => {
          const isR3 = isStudentR3(student.id, company.id) ? 1 : 0;
          rowData.push(isR3);
          totalR3 += isR3;
        });
    
        // Add the total R3 count for the student
        rowData.push(totalR3);
    
        if (filterFunc(student)) {
          data.push(rowData);
        }
      });
    
      return data;
    };
    

    const createDataArrayR4 = (filterFunc) => {
      const data = [];
    
      // Add the first row with column headers
      const headerRow = columns.map((column) => column);
      filteredCompanies.forEach((company) => {
        headerRow.push(`${company.name} (R4)`);
      });
    
      // Add the 'Total R4' column header
      headerRow.push("Total R4");
      data.push(headerRow);
    
      // Add the filtered student data
      studentDetails.forEach((student, index) => {
        const rowData = [
          index + 1,
          student.clg_id || "-",
          student.first_name || "-",
          student.middle_name || "-",
          student.last_name || "-",
          student.branch || "-",
          student.mobile || "-",
          student.email_id || "-",
          student.ssc_per || "-",
          student.hsc_per || "-",
          student.diploma_per || "-",
          student.degree_per || "-",
          student.degree_cgpa || "-"
        ];
    
        let totalR4 = 0;
        filteredCompanies.forEach((company) => {
          const isR4 = isStudentR4(student.id, company.id) ? 1 : 0;
          rowData.push(isR4);
          totalR4 += isR4;
        });
    
        // Add the total R4 count for the student
        rowData.push(totalR4);
    
        if (filterFunc(student)) {
          data.push(rowData);
        }
      });
    
      return data;
    };
    

    const createDataArrayPlaced = (filterFunc) => {
      const data = [];
    
      // Add the first row with column headers
      const headerRow = columns.map((column) => column);
      filteredCompanies.forEach((company) => {
        headerRow.push(`${company.name} (P)`);
      });
    
      // Add the 'Total Placed' column header
      headerRow.push("Total Placed");
      data.push(headerRow);
    
      // Add the filtered student data
      studentDetails.forEach((student, index) => {
        const rowData = [
          index + 1,
          student.clg_id || "-",
          student.first_name || "-",
          student.middle_name || "-",
          student.last_name || "-",
          student.branch || "-",
          student.mobile || "-",
          student.email_id || "-",
          student.ssc_per || "-",
          student.hsc_per || "-",
          student.diploma_per || "-",
          student.degree_per || "-",
          student.degree_cgpa || "-"
        ];
    
        let totalPlaced = 0;
        filteredCompanies.forEach((company) => {
          const isPlaced = isStudentPlaced(student.id, company.id) ? 1 : 0;
          rowData.push(isPlaced);
          totalPlaced += isPlaced;
        });
    
        // Add the total placed count for the student
        rowData.push(totalPlaced);
    
        if (filterFunc(student)) {
          data.push(rowData);
        }
      });
    
      return data;
    };
    
    

    // Create data arrays for each category
    const allData = createDataArray(() => true);
    const SummaryData = SummaryArray(() => true);
    const eligibleData = createDataArrayEligible(student =>
      filteredCompanies.some(company => isStudentEligible(student.id, company.id))
    );
    const registeredData = createDataArrayRegister(student =>
      filteredCompanies.some(company => isStudentRegistered(student.id, company.id))
    );

    const placedData = createDataArrayPlaced(student =>
      filteredCompanies.some(company => isStudentPlaced(student.id, company.id))
    );

    const round2 = createDataArrayR2(student =>
      filteredCompanies.some(company => isStudentR2(student.id, company.id))
    );

    const round3 = createDataArrayR3(student =>
      filteredCompanies.some(company => isStudentR3(student.id, company.id))
    );

    const round4 = createDataArrayR4(student =>
      filteredCompanies.some(company => isStudentR4(student.id, company.id))
    );

    // Create a new workbook and add the data
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(allData), "All Students");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(eligibleData), "Eligible Students");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(registeredData), "Registered Students");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(round2), "Round 2");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(round3), "Round 3");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(round4), "Round 4");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(placedData), "Placed Students");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(SummaryData), "Summary ERP");

    // Export the workbook to an Excel file
    XLSX.writeFile(wb, "students.xlsx");
  };

  // const exportToExcel = () => {
  //   const ws = utils.json_to_sheet(studentDetails);
  //   const wb = utils.book_new();
  //   utils.book_append_sheet(wb, ws, "TPO Data");
  //   writeFile(wb, "tpo_data.xlsx");
  // };

  const isStudentEligible = (studentId, companyId) => {
    return eligible.some(
      (record) =>
        record.student_id === studentId && record.company_id === companyId
    )
      ? 1
      : 0;
  };

  const isStudentRegistered = (studentId, companyId) => {
    return registered.some(
      (record) => record.s_id === studentId && record.p_id === companyId
    )
      ? 1
      : 0;
  };

  const isStudentR2 = (studentId, companyId) => {
    return registered.some(
      (record) => record.s_id === studentId && record.p_id === companyId && Number(record.round2) == 1
    )
      ? 1
      : 0;
  };

  const isStudentR3 = (studentId, companyId) => {
    return registered.some(
      (record) => record.s_id === studentId && record.p_id === companyId && Number(record.round3) == 1
    )
      ? 1
      : 0;
  };

  const isStudentR4 = (studentId, companyId) => {
    return registered.some(
      (record) => record.s_id === studentId && record.p_id === companyId && Number(record.round4) == 1
    )
      ? 1
      : 0;
  };

  const isStudentPlaced = (studentId, companyId) => {
    return placed.some(
      (record) => record.s_id === studentId && record.p_id === companyId
    )
      ? 1
      : 0;
  };

  const handleAcademicYearChange = (event) => {
    setSelectedAcademicYear(event.target.value);
  };

  const filteredCompanies = selectedAcademicYear
    ? companyDetails.filter(
        (company) => company.batch_date === selectedAcademicYear
      )
    : companyDetails;

  const academicYears = [
    ...new Set(companyDetails.map((company) => company.batch_date)),
  ];

  return (
    <div className="table-container mx-4 overflow-x-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ERP List</h1>

      <div className="action-button flex space-x-4 mb-4">
        <button
          onClick={exportToExcel}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Export to Excel
        </button>
        <select
          onChange={handleAcademicYearChange}
          value={selectedAcademicYear}
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded"
        >
          <option value="">Select Academic Year</option>
          {academicYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

  
      <div className="overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto">
  <table className="">
    <thead className="sticky top-0 bg-gray-800 z-8">
      <tr className="place-content-center">
        {columns.map((column, index) => (
          <th
            key={column}
            className="px-4 py-2 text-center text-sm font-medium text-white"
            rowSpan={index < columns.length ? 2 : 1}
          >
            {column}
          </th>
        ))}
        {filteredCompanies.map((company, index) => (
          <th
            key={index}
            className="px-4 py-2 text-center text-sm font-medium text-white"
            colSpan={6}
          >
            {company.name} ({company.batch_date})
          </th>
        ))}
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        {filteredCompanies.map((company, index) => (
          <React.Fragment key={index}>
            <th className="px-4 py-2 text-center text-sm font-medium text-white ">
              E
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white ">
              R
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white ">
              R2
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white ">
              R3
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white ">
              R4
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-white ">
              P
            </th>
          </React.Fragment>
        ))}
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          Total E
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          Total R
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          Total R2
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          Total R3
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          Total R4
        </th>
        <th className="px-4 py-2 text-center text-sm font-medium text-white">
          Total P
        </th>
      </tr>
    </thead>
    <tbody>
      {studentDetails.map((student, index) => {
        // Totals for each student
        let studentTotalEligible = 0;
        let studentTotalR1 = 0;
        let studentTotalR2 = 0;
        let studentTotalR3 = 0;
        let studentTotalR4 = 0;
        let studentTotalPlaced = 0;

        return (
          <tr key={student.id}>
            <td className="py-2 px-8 border-b text-center">{index + 1}</td>
            <td className="py-2 px-8 border-b text-center">{student.clg_id || "-"}</td>
            <td className="py-2 px-8 border-b text-center">{student.first_name || "-"}</td>
            <td className="py-2 px-8 border-b text-center">{student.middle_name || "-"}</td>
            <td className="py-2 px-8 border-b text-center">{student.last_name || "-"}</td>
            <td className="py-2 px-8 border-b text-center">{student.branch || "-"}</td>
            <td className="py-2 px-8 border-b text-center">{student.mobile || "-"}</td>
            <td className="py-2 px-8 border-b text-center">{student.email_id || "-"}</td>
            <td className="py-2 px-8 border-b text-center">{student.ssc_per || "-"}</td>
            <td className="py-2 px-8 border-b text-center">{student.hsc_per || "-"}</td>
            <td className="py-2 px-8 border-b text-center">{student.diploma_per || "-"}</td>
            <td className="border px-4 py-2">{student.degree_per || "-"}</td>
            <td className="border px-4 py-2">{student.degree_cgpa || "-"}</td>

            {/* Company details */}
            {filteredCompanies.map((company, companyIndex) => {
              const isEligible = isStudentEligible(student.id, company.id) ? 1 : 0;
              const r1 = isStudentRegistered(student.id, company.id) ? 1 : 0;
              const r2 = isStudentR2(student.id, company.id) ? 1 : 0;
              const r3 = isStudentR3(student.id, company.id) ? 1 : 0;
              const r4 = isStudentR4(student.id, company.id) ? 1 : 0;
              const placed = isStudentPlaced(student.id, company.id) ? 1 : 0;

              // Increment student totals
              studentTotalEligible += isEligible;
              studentTotalR1 += r1;
              studentTotalR2 += r2;
              studentTotalR3 += r3;
              studentTotalR4 += r4;
              studentTotalPlaced += placed;

              return (
                <React.Fragment key={companyIndex}>
                  <td className="py-2 px-8 border-b text-center">{isEligible}</td>
                  <td className="py-2 px-8 border-b text-center">{r1}</td>
                  <td className="py-2 px-8 border-b text-center">{r2}</td>
                  <td className="py-2 px-8 border-b text-center">{r3}</td>
                  <td className="py-2 px-8 border-b text-center">{r4}</td>
                  <td className="py-2 px-8 border-b text-center">{placed}</td>
                </React.Fragment>
              );
            })}

            {/* Add totals for the student */}
            <td className="py-2 px-8 border-b text-center">{studentTotalEligible}</td>
            <td className="py-2 px-8 border-b text-center">{studentTotalR1}</td>
            <td className="py-2 px-8 border-b text-center">{studentTotalR2}</td>
            <td className="py-2 px-8 border-b text-center">{studentTotalR3}</td>
            <td className="py-2 px-8 border-b text-center">{studentTotalR4}</td>
            <td className="py-2 px-8 border-b text-center">{studentTotalPlaced}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default TpoTable;

// below code is before adding academic year filter 
// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import { utils, writeFile } from "xlsx";
// import axios from "axios";
// import api from "../../api";

// const TpoTable = () => {
//   const columns = [
//     "Sr. No.",
//     "TPO_ID",
//     "College_ID",
//     "First_Name",
//     "Middle_Name",
//     "Last_Name",
//     "Branch",
//     "Contact No.",
//     "College Email Id",
//     "SSC_(%)",
//     "HSC_(%)",
//     "Diploma (%)",
//     "Degree (%)",
//     "Degree (CGPA)",
//   ];

//   const [studentDetails, setStudentDetails] = useState([]);
//   const [companyDetails, setCompanyDetails] = useState([]);
//   const [eligible, setEligible] = useState([]);
//   const [registered, setRegistered] = useState([]);
//   const [placed, setPlaced] = useState([]);

//   useEffect(() => {
//     fetchERPDetails();
//     fetchERPCompanies();
//     // fetchERPEligible();
//     // fetchERPRegisteredStudents();
//     // fetchERPPlacedStudents();
//   }, []);

//   useEffect(() => {
//     if (companyDetails.length > 0) {
//       fetchERPEligible();
//       fetchERPRegisteredStudents();
//       fetchERPPlacedStudents();
//     }
//   }, [companyDetails]);

//   const fetchERPCompanies = () => {
//     api
//       .get("/erp/geterpcompanyreport")
//       .then((res) => {
//         setCompanyDetails(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching company details:", err);
//       });
//   };

//   const fetchERPDetails = () => {
//     api
//       .get("/erp/geterpdetails")
//       .then((res) => {
//         setStudentDetails(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching placed students:", err);
//       });
//   };

//   const fetchERPEligible = () => {
//     api
//       .get("/erp/geterpeligibility")
//       .then((res) => {
//         setEligible(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching registered students:", err);
//       });
//   };

//   const fetchERPRegisteredStudents = () => {
//     api
//       .get("/erp/geterpregistered")
//       .then((res) => {
//         setRegistered(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching registered students:", err);
//       });
//   };

//   const fetchERPPlacedStudents = () => {
//     api
//       .get("/erp/geterpplaced")
//       .then((res) => {
//         setPlaced(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching placed students:", err);
//       });
//   };

//   const exportToExcel = () => {
//     const ws = utils.json_to_sheet(studentDetails);
//     const wb = utils.book_new();
//     utils.book_append_sheet(wb, ws, "TPO Data");
//     writeFile(wb, "tpo_data.xlsx");
//   };

//   const isStudentEligible = (studentId, companyId) => {
//     return eligible.some(
//       (record) =>
//         record.student_id === studentId && record.company_id === companyId
//     )
//       ? 1
//       : 0;
//   };

//   const isStudentRegistered = (studentId, companyId) => {
//     return registered.some(
//       (record) => record.s_id === studentId && record.p_id === companyId
//     )
//       ? 1
//       : 0;
//   };

//   const isStudentPlaced = (studentId, companyId) => {
//     return placed.some(
//       (record) => record.s_id === studentId && record.p_id === companyId
//     )
//       ? 1
//       : 0;
//   };

//   return (
//     <div className="table-container mx-4 overflow-x-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">ERP List</h1>

//       <div className="action-button flex space-x-4 mb-4">
//         <button
//           onClick={exportToExcel}
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
//         >
//           Export to Excel
//         </button>
//       </div>
//       <div className="overflow-x-auto shadow-xl rounded-lg">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr className="place-content-center">
//               {columns.map((column, index) => (
//                 <th
//                   key={column}
//                   className="px-4 py-2 text-center text-sm font-medium text-white"
//                   rowSpan={index < columns.length ? 2 : 1}
//                 >
//                   {column}
//                 </th>
//               ))}
//               {companyDetails.map((company, index) => (
//                 <th
//                   key={index}
//                   className="px-4 py-2 text-center text-sm font-medium text-white"
//                   colSpan={3}
//                 >
//                   {company.name} ({company.batch_date})
//                 </th>
//               ))}
//             </tr>
//             <tr>
//               {companyDetails.map((company, index) => (
//                 <React.Fragment key={index}>
//                   <th className="px-4 py-2 text-center text-sm font-medium text-white ">
//                     E
//                   </th>
//                   <th className="px-4 py-2 text-center text-sm font-medium text-white ">
//                     R
//                   </th>
//                   <th className="px-4 py-2 text-center text-sm font-medium text-white ">
//                     P
//                   </th>
//                 </React.Fragment>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {studentDetails.map((student, index) => (
//               <tr
//                 key={student.id}
//                 className={
//                   index % 2 === 0 ? "bg-gray-100 hover:bg-gray-100" : ""
//                 }
//               >
//                 {/* Student details */}
//                 <td className="py-2 px-8 border-b text-center">{index + 1}</td>
//                 <td className="py-2 px-8 border-b text-center">
//                   {student.tpo_id || "-"}
//                 </td>
//                 <td className="py-2 px-8 border-b text-center">
//                   {student.clg_id || "-"}
//                 </td>
//                 <td className="py-2 px-8 border-b text-center">
//                   {student.first_name || "-"}
//                 </td>
//                 <td className="py-2 px-8 border-b text-center">
//                   {student.middle_name || "-"}
//                 </td>
//                 <td className="py-2 px-8 border-b text-center">
//                   {student.last_name || "-"}
//                 </td>
//                 <td className="py-2 px-8 border-b text-center">
//                   {student.branch || "-"}
//                 </td>
//                 <td className="py-2 px-8 border-b text-center">
//                   {student.mobile || "-"}
//                 </td>
//                 <td className="py-2 px-8 border-b text-center">
//                   {student.email_id || "-"}
//                 </td>
//                 <td className="py-2 px-8 border-b text-center">
//                   {student.ssc_per || "-"}
//                 </td>
//                 <td className="py-2 px-8 border-b text-center">
//                   {student.hsc_per || "-"}
//                 </td>
//                 <td className="py-2 px-8 border-b text-center">
//                   {student.diploma_per || "-"}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {student.degree_per || "-"}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {student.degree_cgpa || "-"}
//                 </td>

//                 {/* Company details */}
//                 {companyDetails.map((company, companyIndex) => (
//                   <React.Fragment key={companyIndex}>
//                     <td className="py-2 px-8 border-b text-center">
//                       {isStudentEligible(student.id, company.id) ? 1 : 0}
//                     </td>
//                     <td className="py-2 px-8 border-b text-center">
//                       {isStudentRegistered(student.id, company.id) ? 1 : 0}
//                     </td>
//                     <td className="py-2 px-8 border-b text-center">
//                       {isStudentPlaced(student.id, company.id) ? 1 : 0}
//                     </td>
//                   </React.Fragment>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TpoTable;
