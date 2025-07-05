import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api"; // Custom API service
import Select from "react-select"; // Import React Select

const PracticalCreation = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [srNo, setSrNo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [programmingLanguages, setProgrammingLanguages] = useState([]); // Store selected languages
  const [testCases, setTestCases] = useState([
    { input: "", output: "" },
  ]);
  const [languageOptions, setLanguageOptions] = useState([]); // Store all available languages

  const [events, setEvents] = useState([]); // State to store event list
  const [selectedEvent, setSelectedEvent] = useState(''); 

  // Fetch available programming languages for the dropdown
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await api.get("/machineTest/programming-languages");
        const availableLanguages = response.data.data.map((lang) => ({
          label: lang.language_name, // Correct label for react-select
          value: lang.programming_language, // Correct value for react-select
        }));

        // Add "Select All" option at the top of the options list
        const selectAllOption = {
          label: "Select All",
          value: "select_all",
        };

        setLanguageOptions([selectAllOption, ...availableLanguages]);
      } catch (error) {
        console.error("Failed to fetch programming languages:", error);
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
      const fetchEvents = async () => {
        try {
          const res = await api.get('/event/getAllActiveEvents');
          console.log(res.data); // Adjust endpoint based on your API
          setEvents(res.data.data); // Assume response contains an array of events
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
      fetchEvents();
    }, []);

  // Handle select change
  const handleLanguageChange = (selectedOptions) => {
    // Check if "Select All" is selected
    const isSelectAllSelected = selectedOptions.some(
      (option) => option.value === "select_all"
    );

    if (isSelectAllSelected) {
      // If "Select All" is selected, select all available options (excluding the "Select All" option)
      setProgrammingLanguages(languageOptions.filter((option) => option.value !== "select_all"));
    } else {
      // Otherwise, just update with the selected options
      setProgrammingLanguages(selectedOptions);
    }
  };

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = testCases.map((testCase, i) =>
      i === index ? { ...testCase, [field]: value } : testCase
    );
    setTestCases(updatedTestCases);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const removeTestCase = (index) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    console.log("This is tesy",programmingLanguages);
    e.preventDefault();
    try {
      await api.post("/machineTest/practicals", {
        practical_name: title,
        description,
        batch: String(pdfUrl).trim(),
        prac_io: testCases,
        event_id:selectedEvent,
        prac_language: programmingLanguages.map((lang) => ({
          programming_language_id: parseInt(lang.value),
        })),
      });
      // Success handling (e.g., a toast notification)
      // navigate(`/`);
      alert("Created !!");
      window.location.reload();
    } catch (error) {
      console.error("Failed to create practical:", error);
      // Error handling (e.g., a toast notification)
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-6">
      <div className="max-w-3xl w-full space-y-4 bg-white p-10 shadow-lg rounded-lg">

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter Practical Title"
              />
            </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Select Event</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option value="">Select an Event</option>
              {events.map((event) => (
                <option key={event.eventId} value={event.eventId}>
                  {event.eventName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter Practical Description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Batch
            </label>
            <input
              type="text"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="For multiple batches use ,"
            />
          </div>

          {/* Multi-select dropdown for programming languages */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Programming Languages
            </label>
            <Select
              isMulti
              options={languageOptions}
              value={programmingLanguages}
              onChange={handleLanguageChange}
              placeholder="Select Programming Languages"
              className="mt-1"
              isSearchable // Allows searching for languages
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Test Cases</h2>

            {testCases.map((testCase, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Input
                  </label>
                  <textarea
                    value={testCase.input}
                    onChange={(e) =>
                      handleTestCaseChange(index, "input", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Enter input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Output
                  </label>
                  <textarea
                    value={testCase.output}
                    onChange={(e) =>
                      handleTestCaseChange(index, "output", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Enter output"
                    required
                  />
                </div>

                {/* <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={testCase.is_public}
                    onChange={(e) =>
                      handleTestCaseChange(index, "is_public", e.target.checked)
                    }
                    className="mr-2"
                  />
                  <span>Public Test Case</span>
                </div> */}

                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeTestCase(index)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-100"
                  >
                    Remove Test Case
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addTestCase}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-100"
            >
              Add Test Case
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-100"
            >
              Create Machine Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PracticalCreation;
