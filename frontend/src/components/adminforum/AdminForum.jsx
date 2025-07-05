// // import React, { useEffect, useState } from 'react';
// // import api from 'api';
// // import api from "../../api";
// // import { useLocation } from 'react-router-dom';
// // import { format } from 'date-fns';

// // const AdminForum = ({uid}) => {
// //   const [postDetails, setPostDetails] = useState(null);
// //   const [chats, setChats] = useState([]);
// //   const [newMessage, setNewMessage] = useState('');
// //   const location = useLocation();
// //   const { id, name, location: jobLocation, job_description, package_details, roles, createdAt } = location.state;

// //   useEffect(() => {
// //     // Fetch job post details
// //     // api.get(`/forums/admin/jobpost/${id}`)
// //     //   .then(response => {
// //     //     setPostDetails(response.data);
// //     //   })
// //     //   .catch(error => {
// //     //     console.error('Error fetching job post details:', error);
// //     //   });

// //     // Fetch chats related to the job post
// //     api.get(`/forums/chats/${id}`)
// //       .then(response => {
// //         console.log(response.data)
// //         setChats(response.data);
// //       })
// //       .catch(error => {
// //         console.error('Error fetching chats:', error);
// //       });
// //   }, [id]);

// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     return format(date, 'dd-MM-yyyy HH:mm');
// //   };

// //   const handleSendMessage = async () => {
// //     try {
// //       const timestamp = new Date().toISOString();
// //       const response = await api.post(`/forums/admin/chats`, {
// //         jobCompanyId:id,
// //         message: newMessage,
// //         userId: uid, // Include the user ID
// //         timestamp: timestamp,
// //         // You might need to include other data like user ID or admin status here
// //       });
// //       // Assuming the API returns the updated chat list after posting
// //       setNewMessage('');
// //       window.location.reload();
// //     } catch (error) {
// //       console.error('Error sending message:', error);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto mt-8">
// //       <h1 className="text-2xl font-bold mb-4">{name} Details</h1>
// //       <div className="bg-white shadow-md rounded-lg p-4 mb-4">
// //         <p><strong>Location:</strong> {jobLocation}</p>
// //         <p><strong>Job Description:</strong> {job_description}</p>
// //         <p><strong>Package Details:</strong> {package_details}</p>
// //         <p><strong>Roles:</strong> {roles}</p>
// //         {/* <p><strong>Created At:</strong> {formatDate(createdAt)}</p> */}
// //       </div>

// //       <h2 className="text-2xl font-bold mb-4">Chats</h2>
// //       <div className="bg-white shadow-md rounded-lg p-4">
// //         {chats.length > 0 ? (
// //           chats.map(chat => (
// //             <div key={chat.id} className="mb-2">
// //               {/* <p className="text-gray-500 mb-1">{formatDate(chat.timestamp)}</p> */}
// //               <p className="mb-2"><strong>{chat.isadmin === '2' ? 'Admin' : chat.fullname}</strong>: {chat.message}</p>
// //             </div>
// //           ))
// //         ) : (
// //           <p>No chats available for this post.</p>
// //         )}
// //       </div>

// //       <div className="mt-4">
// //         <input
// //           type="text"
// //           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
// //           placeholder="Type your message..."
// //           value={newMessage}
// //           onChange={(e) => setNewMessage(e.target.value)}
// //         />
// //         <button
// //           className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// //           onClick={handleSendMessage}
// //         >
// //           Send Message
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminForum;

// // import React, { useEffect, useState } from "react";
// // import api from "api";
// // import { useLocation } from "react-router-dom";
// // import { format } from "date-fns";

// // const AdminForum = ({ uid }) => {
// //   const [postDetails, setPostDetails] = useState(null);
// //   const [chats, setChats] = useState([]);
// //   const [newMessage, setNewMessage] = useState("");
// //   const location = useLocation();
// //   const {
// //     id,
// //     name,
// //     location: jobLocation,
// //     job_description,
// //     package_details,
// //     roles,
// //     createdAt,
// //   } = location.state;

// //   useEffect(() => {
// //     // Fetch job post details
// //     // api.get(`/forums/admin/jobpost/${id}`)
// //     //   .then(response => {
// //     //     setPostDetails(response.data);
// //     //   })
// //     //   .catch(error => {
// //     //     console.error('Error fetching job post details:', error);
// //     //   });

// //     // Fetch chats related to the job post
// //     api
// //       .get(`/forums/chats/${id}`)
// //       .then((response) => {
// //         console.log(response.data);
// //         setChats(response.data);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching chats:", error);
// //       });
// //   }, [id]);

// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     return format(date, "dd-MM-yyyy HH:mm");
// //   };

// //   const handleSendMessage = async () => {
// //     try {
// //       const timestamp = new Date().toISOString();
// //       const response = await api.post(
// //         `/forums/admin/chats`,
// //         {
// //           jobCompanyId: id,
// //           message: newMessage,
// //           userId: uid, // Include the user ID
// //           timestamp: timestamp,
// //           // You might need to include other data like user ID or admin status here
// //         }
// //       );
// //       // Assuming the API returns the updated chat list after posting
// //       setNewMessage("");
// //       window.location.reload();
// //     } catch (error) {
// //       console.error("Error sending message:", error);
// //     }
// //   };

// //   return (
// //     <div className="w-full mx-auto px-4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl bg-white shadow-md rounded-lg p-4 mt-10">
// //       <h1 className="text-2xl font-bold mb-4">{name} Details</h1>
// //       <div className="bg-white shadow-md rounded-lg p-4 mb-4">
// //         <p>
// //           <strong>Location:</strong> {jobLocation}
// //         </p>
// //         <p>
// //           <strong>Job Description:</strong> {job_description}
// //         </p>
// //         <p>
// //           <strong>Package Details:</strong> {package_details}
// //         </p>
// //         <p>
// //           <strong>Roles:</strong> {roles}
// //         </p>
// //         {/* <p><strong>Created At:</strong> {formatDate(createdAt)}</p> */}
// //       </div>

// //       <h2 className="text-2xl font-bold mb-4">Chats</h2>
// //       <div
// //         className="bg-gray-100 shadow-md rounded-lg p-4 "
        
// //       >
// //         {chats.length > 0 ? (
// //           chats.map((chat) => (
// //             <div key={chat.id} className="mb-2" style={{ maxHeight: "400px", overflow: "auto" }}>
// //               {/* <p className="text-gray-500 mb-1">{formatDate(chat.timestamp)}</p> */}
// //               <p className="mb-2">
// //                 <strong>
// //                   {chat.isadmin === "2" ? "Admin" : chat.fullname}
// //                 </strong>
// //                 : {chat.message}
// //               </p>
// //             </div>
// //           ))
// //         ) : (
// //           <p>No chats available for this post.</p>
// //         )}
// //       </div>

// //       <div className="mt-4">
// //         <div className="flex items-center mt-10 space-x-4">
// //           <input
// //             type="text"
// //             className="flex-1 p-4 rounded-full border-0 shadow-md"
// //             placeholder="Type your message..."
// //             value={newMessage}
// //             onChange={(e) => setNewMessage(e.target.value)}
// //           />
// //           <button
// //             className="p-5 bg-blue-500 text-white rounded-full shadow-md"
// //             onClick={handleSendMessage}
// //           >
// //             Send
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminForum;

// import React, { useEffect, useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { format } from "date-fns";
// import api from "../../api";

// const AdminForum = ({ uid }) => {
//   const [chats, setChats] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const location = useLocation();
//   const chatContainerRef = useRef(null);
//   const inputRef = useRef(null);
  
//   const {
//     id,
//     name,
//     location: jobLocation,
//     job_description,
//     package_details,
//     roles,
//   } = location.state;

//   useEffect(() => {
//     api
//       .get(`/forums/chats/${id}`)
//       .then((response) => {
//         setChats(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching chats:", error);
//       });
//   }, [id]);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [chats]);

//   const handleSendMessage = async () => {
//     if (newMessage.trim()) {
//       const timestamp = new Date().toISOString();
//       try {
//         await api.post(`/forums/admin/chats`, {
//           jobCompanyId: id,
//           message: newMessage,
//           userId: uid,
//           timestamp: timestamp,
//         });
//         setChats([
//           ...chats,
//           {
//             job_company_id: id,
//             message: newMessage,
//             user_id: uid,
//             fullname: "You",
//             timestamp: timestamp,
//             isadmin: "1",
//           },
//         ]);
//         setNewMessage("");
//       } catch (error) {
//         console.error("Error sending message:", error);
//       }
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="flex flex-col h-full max-w-4xl mx-auto mt-10">
//       <div className="bg-white shadow-md rounded-lg p-4 mb-4">
//         <h1 className="text-2xl font-bold mb-4">{name} Details</h1>
//       </div>

//       <div className="flex-1 flex flex-col bg-white p-4 overflow-hidden rounded-lg shadow-md">
//         <h2 className="text-xl font-bold mb-4">Chats</h2>
//         <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar" ref={chatContainerRef}>
//           <div className="flex flex-col space-y-4">
//             {chats.length > 0 ? (
//               chats.map((chat) => (
//                 <div key={chat.id} className={`p-4 ${chat.isadmin === '2' ? 'bg-green-100' : 'bg-blue-100'} rounded-2xl shadow`} style={{}}>
//                   <p className="text-sm font-bold">{chat.isadmin === '2' ? 'Admin' : chat.fullname}</p>
//                   <p><pre className="text-sm" style={{whiteSpace:"break-spaces"}}>{chat.message}</pre></p>
//                   <p className="text-xs text-gray-500 text-left mt-1">{new Date(chat.timestamp).toLocaleString('en-GB')}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-sm">No chats available for this post.</p>
//             )}
//           </div>
//         </div>

//         <div className="sticky bottom-0 bg-white p-4">
//           <div className="flex items-center space-x-4">
//             <textarea
//               type="text"
//               ref={inputRef}
//               className="flex-1 p-4 rounded-full border-0 shadow"
//               placeholder="Type your message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               // onKeyDown={handleKeyDown}
//             />
//             <button className="p-4 bg-blue-500 text-white rounded-full shadow" htmlFor='attchFile'>
//               <input type="file" style={{display:'none',width:'20px'}} id="attchFile"/>
//               <label htmlFor="attchFile"><span class="material-symbols-outlined">
//                 attach_file
//               </span></label>
//             </button>
//             <button className="p-4 bg-blue-500 text-white rounded-full shadow" onClick={handleSendMessage}>
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminForum;


import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import api from "../../api";

const AdminForum = ({ uid }) => {
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const location = useLocation();
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  const { id, name, location: jobLocation, job_description, package_details, roles } = location.state;

  useEffect(() => {
    api
      .get(`/forums/chats/${id}`)
      .then((response) => {
        setChats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching chats:", error);
      });
  }, [id]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const timestamp = new Date().toISOString();
      try {
        await api.post(`/forums/admin/chats`, {
          jobCompanyId: id,
          message: newMessage,
          userId: uid,
          timestamp: timestamp,
        });
        setChats([
          ...chats,
          {
            job_company_id: id,
            message: newMessage,
            user_id: uid,
            fullname: "You",
            timestamp: timestamp,
            isadmin: "1",
          },
        ]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    // Validate file size (5MB limit) and type (images and PDFs only)
    const fileSizeLimit = 5 * 1024 * 1024; // 5MB in bytes
    const allowedTypes = [
      "image/jpeg", 
      "image/png", 
      "image/gif", 
      "application/pdf",
      "application/vnd.ms-excel",            // For old .xls Excel files
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // For .xlsx Excel files
      "text/csv" // For .csv files
    ];
    
    if (selectedFile.size > fileSizeLimit) {
      alert("File size exceeds the 5MB limit.");
      return;
    }

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Only image and PDF files are allowed.");
      return;
    }

    setFile(selectedFile);

    // Create FormData to send file
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("jobCompanyId", id);
    formData.append("userId", uid);

    try {
      // Call the API to upload the file
      const response = await api.post("/api/chat/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if(response.status==200){
        alert("File uploaded successfully.");
        // setNewMessage(response.data.link);
        if (response.data.link.trim()) {
          const timestamp = new Date().toISOString();
          try {
            await api.post(`/forums/admin/chats`, {
              jobCompanyId: id,
              message: response.data.link,
              userId: uid,
              timestamp: timestamp,
            });
            setChats([
              ...chats,
              {
                job_company_id: id,
                message: response.data.link,
                user_id: uid,
                fullname: "You",
                timestamp: timestamp,
                isadmin: "1",
              },
            ]);
            setNewMessage("");
          } catch (error) {
            console.error("Error sending message:", error);
          }
        }
      }
      
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }

  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h1 className="text-2xl font-bold mb-4">{name} Details</h1>
      </div>

      <div className="flex-1 flex flex-col bg-white p-4 overflow-hidden rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar" ref={chatContainerRef}>
          <div className="flex flex-col space-y-4">
            {chats.length > 0 ? (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-4 ${chat.isadmin === "2" ? "bg-green-100" : "bg-blue-100"} rounded-2xl shadow`}
                >
                  <p className="text-sm font-bold">{chat.isadmin === "2" ? "Admin" : chat.fullname}</p>
                  <p>
                    {
                      String(chat.message).startsWith('http') ?
                      <a href={`${chat.message}`} style={{textDecoration:"underline",color:'blue'}}>View</a> :
                      <pre className="text-sm" style={{ whiteSpace: "break-spaces" }}>
                        {chat.message}
                      </pre>
                    }
                   
                  </p>
                  <p className="text-xs text-gray-500 text-left mt-1">
                    {new Date(chat.timestamp).toLocaleString("en-GB")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm">No chats available for this post.</p>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white p-4">
          <div className="flex items-center space-x-4">
            <textarea
              type="text"
              ref={inputRef}
              className="flex-1 p-4 rounded-full border-0 shadow"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <input
              type="file"
              id="attachFile"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="attachFile" className="p-4 bg-blue-500 text-white rounded-full shadow cursor-pointer">
              <span className="material-symbols-outlined">attach_file</span>
            </label>
            <button
              className="p-4 bg-blue-500 text-white rounded-full shadow"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForum;