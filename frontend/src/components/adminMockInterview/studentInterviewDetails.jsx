import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../../api';
import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

const StudentInterviewDetails = () => {
  const [interviewId, setSearchParams] = useState(new URLSearchParams(window.location.search));
  const [interviewDetails, setInterviewDetails] = useState(null);

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const response = await api.get(`/interviews/details/${interviewId.get('id')}`);
        console.clear();
        console.log(response.data);
        setInterviewDetails([response.data]);
      } catch (error) {
        console.error('Error fetching interview details:', error);
      }
    };

    fetchInterviewDetails();
  }, [interviewId]);

  const addWrappedText = (pdf, text, x, y, maxWidth) => {
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * 6); // Adjust line height as needed
  };

  const generatePDF = () => {
    if (!interviewDetails) return;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    let yOffset = 10;

    // Add interview details
    pdf.setFontSize(16);
    pdf.text("Interview Details", 15, yOffset);
    yOffset += 10;

    pdf.setFontSize(12);
    pdf.text(`Id: ${interviewDetails[0].clg_id}`, 15, yOffset);
    yOffset += 5;
    pdf.text(`Name: ${interviewDetails[0].name}`, 15, yOffset);
    yOffset += 5;
    pdf.text(`Email: ${interviewDetails[0].email_id}`, 15, yOffset);
    yOffset += 10;
    pdf.text(`Role: ${interviewDetails[0].role}`, 15, yOffset);
    yOffset += 10;
    pdf.text(`Date: ${new Date(interviewDetails[0].createdAt).toLocaleDateString('en-GB')}`, 15, yOffset);
    yOffset += 15;

    // Loop through interview contents
    interviewDetails[0].contents.forEach((q, index) => {
      if (yOffset > 260) { // Adjust this value based on your content and page size
        pdf.addPage();
        yOffset = 10; // Reset yOffset for new page
      }

      pdf.setFontSize(14);
      yOffset = addWrappedText(pdf, `Question ${index + 1}: ${q.content}`, 15, yOffset, 180);
      yOffset += 10;

      pdf.setFontSize(12);
      yOffset = addWrappedText(pdf, `Answer: ${q.answer || 'N/A'}`, 20, yOffset, 180);
      yOffset += 10;

      yOffset = addWrappedText(pdf, `Ideal Answer: ${q.ideal_answer || 'N/A'}`, 20, yOffset, 180);
      yOffset += 10;

      pdf.text(`Score: ${q.score != null ? `${q.score}/10` : 'N/A'}`, 20, yOffset);
      yOffset += 15;

      pdf.setDrawColor(0); // Black color for the line
      pdf.setLineWidth(0.1); // Line width
      pdf.line(15, yOffset, 195, yOffset); // Draw a line
      yOffset += 5; // Adjust spacing after the line
    });

    // Save the PDF
    pdf.save(`${interviewDetails[0].role} interview-details.pdf`);
  };

  if (!interviewDetails) {
    return <div>Loading...</div>;
  }

  const interviewContent = interviewDetails[0].contents;
  const totalMarks = 100;
  const maxMarks = interviewContent.length * 10;
  const totalMarksColor = interviewContent[0].score >= 50 ? "text-green-500" : "text-red-500";

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8 flex flex-col justify-between">
      <div id="pdfContent" className="bg-white shadow-2xl rounded-lg p-6 md:p-8 mb-8 w-full max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-2xl font-bold text-gray-800"
            style={{
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
            }}
          >
            Interview Details
          </h2>
          <div>
            <button
              onClick={() => window.history.back()}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none mr-2"
            >
              <svg
                className="w-6 h-6 inline-block mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              Back
            </button>
            <button
              onClick={generatePDF}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none"
            >
              Download PDF
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
          <div className="bg-gray-200 shadow-md hover:bg-gray-300 rounded-lg p-4 mb-4 md:mb-0 md:mr-4 transform transition duration-300 hover:scale-102">
            <p className="mb-2">
              <strong>Role:</strong> {interviewDetails[0].role}
            </p>
          </div>
          <div className="bg-gray-200 shadow-md hover:bg-gray-300 rounded-lg p-4 mb-4 md:mb-0 transform transition duration-300 hover:scale-102">
            <p className="mb-2">
              <strong>Date:</strong> {new Date(interviewDetails[0].createdAt).toLocaleDateString('en-GB')}
            </p>
          </div>
          <div
            className={`bg-gray-200 hover:bg-green-100 rounded-full shadow-2xl p-4 ml-0 md:ml-4 hover:scale-102 ${totalMarksColor} bg-white`}
            style={{
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
            }}
          >
            <p className="text-xl font-bold ">
              {interviewDetails[0].score ? interviewDetails[0].score : "0"}/{maxMarks}
            </p>
            <p className="text-center">Total</p>
          </div>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto pb-8">
          {interviewContent.map((q, index) => (
            <div
              key={q.id}
              className="bg-white shadow-xl hover:bg-blue-100 rounded-lg p-6 transform transition duration-300 hover:scale-102 overflow-x-auto"
            >
              <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4 min-w-[300px]">
                <p className="mb-2">
                  <strong>Question {index + 1}:</strong> {q.content}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-inner min-w-[300px]">
                <p className="mb-2">
                  <strong>Answer:</strong> {q.answer || 'N/A'}
                </p>
                <p className="text-right">
                  <strong>Marks:</strong> {q.score != null ? `${q.score}/10` : 'N/A'}
                </p>
              </div>
              <div className="bg-blue-50 p-4 mt-4 rounded-lg shadow-inner min-w-[300px]">
                <p className="mb-2">
                  <strong>Ideal Answer:</strong> {q.ideal_answer || 'N/A'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentInterviewDetails;
