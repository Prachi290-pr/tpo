import React, { useState, useEffect } from "react";
import nodeApi from "../../axiosConfig";
import { saveAs } from "file-saver";
import {
  CircularProgress,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

function History() {
  const [events, setEvents] = useState([]);
  const [progresses, setProgresses] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [currentPhotosPath, setCurrentPhotosPath] = useState(null);
  const [currentFileType, setCurrentFileType] = useState(null); // New state to track file type
  const [error, setError] = useState("");

  const getProgressValue = (value) => {
    switch (value) {
      case 1:
        return 20;
      case 2:
        return 45;
      case 3:
        return 70;
      case 4:
        return 100;
      default:
        return 0;
    }
  };

  //for online events seperate progress logic:
  const getOnlineProgressValue = (value) => {
    switch (value) {
      case 1:
        return 20;
      case 2:
        return 40;
      case 3:
        return 60;
      case 4:
        return 80;
      case 5:
        return 100;
      default:
        return 0;
    }
  };

  const updateProgress = async (id) => {
    try {
      const response = await nodeApi.get(`/eventStatus/${id}`);
      const progressStatus = response.data.status;
      const isOnline = response.data.isOnline;

      let mappedValue;
      isOnline
        ? (mappedValue = getOnlineProgressValue(progressStatus))
        : (mappedValue = getProgressValue(progressStatus));
      setProgresses((prevProgresses) => ({
        ...prevProgresses,
        [id]: mappedValue,
      }));
    } catch (error) {
      console.log("Failed to update progress.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await nodeApi.get(`/allEvents`);
      const fetchedEvents = response.data;
      setEvents(fetchedEvents);

      fetchedEvents.forEach((event) => updateProgress(event.eventId));
    } catch (error) {
      console.log("Failed to fetch events.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const data = await nodeApi.delete(`/event/${id}`);
        fetchEvents();
        alert(data.data.message);
      } catch (error) {
        setError("Failed to delete the event.");
      }
    }
  };

  const handleRemove = async (id) => {
    if (window.confirm("Are you sure you want to remove this event?")) {
      try {
        const data = await nodeApi.delete(`/removeEvent/${id}`);
        fetchEvents();
        alert(data.data.message);
      } catch (error) {
        setError("Failed to remove the event.");
      }
    }
  };

  const handleUndo = async (id) => {
    try {
      const data = await nodeApi.post(`/undoEvent/${id}`);
      fetchEvents();
      alert(
        "Event has been undone, you will have to manually update the event deadline"
      );
    } catch (error) {
      setError("Failed to undo the event deletion.");
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [currentEventId]: file,
    }));
  };

  // Handle file upload for Photos
  const handleFileUpload = async () => {
    const file = selectedFiles[currentEventId];
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("photos", file);

    try {
      const response = await nodeApi.post(
        `/uploadPhotos/${currentEventId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
      setOpenDialog(false);
      window.location.reload();
    } catch (error) {
      setError("Failed to upload the file.");
    }
  };

  // Handle file upload for Signed LOA
  const handleSignedLOAUpload = async () => {
    const file = selectedFiles[currentEventId];
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("signedLOA", file);

    try {
      const response = await nodeApi.post(
        `/uploadSignedLOA/${currentEventId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
      setOpenDialog(false);
      window.location.reload();
    } catch (error) {
      setError("Failed to upload the Signed LOA.");
    }
  };

  // Handle file upload for Online Attendance
  const handleOnlineAttendanceUpload = async () => {
    const file = selectedFiles[currentEventId];
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("attendanceReport", file);

    try {
      const response = await nodeApi.post(
        `/uploadAttendanceReport/${currentEventId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
      setOpenDialog(false);
      window.location.reload();
    } catch (error) {
      setError("Failed to upload the Online Attendance.");
    }
  };

  const handleDownload = async (fieldname) => {
    try {
      const response = await nodeApi.get(`/getEventById/${currentEventId}`);

      const filename = response.data[0][fieldname];

      const getFile = await nodeApi.get(`/getFile/${filename}`, {
        responseType: "blob",
      });

      // Create a new Blob object using the response data
      const blob = new Blob([getFile.data], {
        type: response.headers["content-type"],
      });
      saveAs(blob, filename);
    } catch (error) {
      setError("failed to download");
    }
  };

  const handleFileDelete = async (fieldname) => {
    try {
      let uri = "";
      if (fieldname === "attendanceReport") {
        uri = `/deleteAttendanceReport/${currentEventId}`;
      } else if (fieldname === "eventPhotos") {
        uri = `/deletePhotos/${currentEventId}`;
      } else if (fieldname === "signedLOA") {
        uri = `/deleteSignedLOA/${currentEventId}`;
      }

      const response = await nodeApi.delete(uri);
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      setError("failed to download");
      alert();
    }
  };

  const handleOpenDialog = (eventId, photoPath, fileType) => {
    setCurrentEventId(eventId);
    setCurrentPhotosPath(photoPath);
    setCurrentFileType(fileType); // Track file type
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="flex justify-center items-center ">
    <div className="md:w-[80%] w-full mt-9 flex justify-center p-8 flex-col bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-6 text-center font-bold text-gray-800">
        Event History
      </h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {events.length > 0 ? (
        <div className="overflow-x-auto rounded-xl">
          <table className="table-auto w-full min-w-[700px] text-left bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr className="bg-blue-600 text-white border-b border-gray-200">
                <th className="p-4 font-semibold">Event Name</th>
                <th className="p-4 font-semibold">Speaker</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">DeadLine</th>
                <th className="p-4 font-semibold">Paid</th>
                <th className="p-4 font-semibold">Cost</th>
                <th className="p-4 font-semibold">Mode</th>
              
                <th className="p-4 font-semibold">Progress</th>
                <th className="p-4 font-semibold">Actions</th>
                {/* <th className="p-4 font-semibold"></th> */}
                <th className="p-4 font-semibold">File Uploads</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.eventId} className="border-b border-gray-300">
                  <td className="p-4 text-gray-800">{event.eventName}</td>
                  <td className="p-4 text-gray-800">{event.nameOfSpeaker}</td>
                  <td className="p-4 text-gray-800">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-gray-800">
                    {new Date(event.eventDeadline).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-gray-800">
                    {event.isPaid ? "Paid" : "Not Paid"}
                  </td>
                  <td className="p-4 text-gray-800">
                    {event.cost ? event.cost : "Free"}
                  </td>
                  <td className="p-4 text-gray-800">{event.isOnline === 1? 'Online': "Offline"}</td>

                  <td className="p-4">
                    <div className="flex items-center">
                      <Box
                        sx={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgress
                          variant="determinate"
                          value={progresses[event.eventId] || 0}
                          size={60}
                          thickness={6}
                          style={{
                            color:
                              (progresses[event.eventId] || 0) === 100
                                ? "green"
                                : "blue",
                          }}
                        />
                        <Box
                          sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: "absolute",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            variant="caption"
                            component="div"
                            color="text.secondary"
                          >
                            {`${progresses[event.eventId] || 0}%`}
                          </Typography>
                        </Box>
                      </Box>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2"> 

                    <button
                      onClick={() => handleDelete(event.eventId)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                      >
                      Delete
                    </button>
                    {event.isDeleted === 0 ? (
                      <button
                        onClick={() => handleRemove(event.eventId)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                      onClick={() => handleUndo(event.eventId)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                      >
                        Undo
                      </button>
                    )}
                    </div>
                  </td>
                  <td className="p-4">
                  <div className="flex items-center gap-2"> 
                    {event.isOnline ? (
                      <button
                        onClick={() =>
                          handleOpenDialog(
                            event.eventId,
                            event.onlineAttendance,
                            "onlineAttendance"
                          )
                        }
                        className={`${
                          event.attendanceReport === null
                            ? `bg-blue-500  hover:bg-blue-600`
                            : `bg-green-500  hover:bg-green-600`
                        } text-white px-4 py-2 rounded-lg transition duration-200`}
                      >
                        Attendance
                      </button>
                    ) : (
                      <></>
                    )}

                    <button
                      onClick={() =>
                        handleOpenDialog(event.eventId, event.photos, "photos")
                      }
                      className={`${
                        event.eventPhotos === null
                          ? `bg-blue-500  hover:bg-blue-600`
                          : `bg-green-500  hover:bg-green-600`
                      } text-white px-4 py-2 rounded-lg transition duration-200`}
                    >
                      Photos
                    </button>
                    <button
                      onClick={() =>
                        handleOpenDialog(
                          event.eventId,
                          event.signedLOA,
                          "signedLOA"
                        )
                      }
                      className={`${
                        event.signedLOA === null
                          ? `bg-blue-500  hover:bg-blue-600`
                          : `bg-green-500  hover:bg-green-600`
                      } text-white px-4 py-2 rounded-lg transition duration-200`}
                    >
                      LOA
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500">No events found.</div>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept=".pdf,.zip" // Adjust file types as needed
            onChange={(e) => handleFileSelect(e.target.files[0])}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          {currentFileType === "photos" && (
            <>
              <Button onClick={handleFileUpload} color="primary">
                Upload
              </Button>
              <Button
                color="primary"
                onClick={() => handleDownload("eventPhotos")}
              >
                Download
              </Button>
              <Button
                color="secondary"
                onClick={() => handleFileDelete("eventPhotos")}
              >
                Delete
              </Button>
            </>
          )}
          {currentFileType === "signedLOA" && (
            <>
              <Button onClick={handleSignedLOAUpload} color="primary">
                Upload Signed LOA
              </Button>
              <Button
                color="primary"
                onClick={() => handleDownload("signedLOA")}
              >
                Download
              </Button>
              <Button
                color="secondary"
                onClick={() => handleFileDelete("signedLOA")}
              >
                Delete
              </Button>
            </>
          )}
          {currentFileType === "onlineAttendance" && (
            <>
              <Button onClick={handleOnlineAttendanceUpload} color="primary">
                Upload Online Attendance
              </Button>
              <Button
                color="primary"
                onClick={() => handleDownload("attendanceReport")}
              >
                Download
              </Button>
              <Button
                color="secondary"
                onClick={() => handleFileDelete("attendanceReport")}
              >
                Delete
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
    </div>
  );
}

export default History;