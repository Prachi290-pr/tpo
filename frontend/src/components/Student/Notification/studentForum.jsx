import React, { useEffect, useRef, useState } from "react";
import api from "../../../api";

const StudentForumPage = ({ uid }) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [jobCompanies, setJobCompanies] = useState([]);
  const [chats, setChats] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    api
      .get(`/forums/${uid}`)
      .then((res) => {
        setJobCompanies(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [uid]);

  useEffect(() => {
    if (selectedCompany) {
      api
        .get(`/forums/chats/${selectedCompany.id}`)
        .then((res) => {
          setChats(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedCompany) {
      const timestamp = new Date().toISOString(); // Current date and time in ISO format

      await api
        .post("/forums/chats", {
          jobCompanyId: selectedCompany.id,
          message: newMessage,
          userId: uid, // Include the user ID
          timestamp: timestamp, // Include the timestamp
        })
        .then(() => {
          setChats([
            ...chats,
            {
              job_company_id: selectedCompany.id,
              message: newMessage,
              user_id: uid,
              fullname: "You",
              timestamp: timestamp,
            },
          ]);
          setNewMessage("");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handlekeyDown = (event) => {
    if (event.key === 'Enter'){
      handleSendMessage();
    }
  }

  return (
    <div className="flex flex-col h-full sm:h-[620px]">
      <div className="flex flex-1 overflow-hidden">
        <div className={`w-full md:w-1/4 bg-gray-200 p-4 ${selectedCompany && "hidden md:block lg:w-1/4"}`}>
          {!selectedCompany || window.innerWidth >= 700 ? (
            <>
              <h2 className="text-xl font-bold mb-4">Job Companies</h2>
              <div className="h-full overflow-y-auto custom-scrollbar">
                <ul>
                  {jobCompanies.map((company) => (
                    <li
                      key={company.id}
                      className="p-4 mb-4 bg-white rounded-2xl hover:bg-blue-100 hover:shadow-md transition duration-300 cursor-pointer"
                      onClick={() => setSelectedCompany(company)}
                    >
                      <h3 className="font-semibold">{company.company_name}</h3>
                      <p className="text-sm">{company.job_description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <button
              className="mb-4 p-2 bg-blue-500 text-white rounded shadow"
              onClick={() => setSelectedCompany(null)}
            >
              Back to Companies
            </button>
          )}
        </div>

        <div className={`flex-1 flex flex-col bg-gray-100 p-4 overflow-hidden ${!selectedCompany && "hidden md:flex"}`}>
          {selectedCompany && (
            <div className="mb-4">
              <button className="mb-4 p-2 bg-blue-500 text-white rounded shadow md:hidden" onClick={() => setSelectedCompany(null)}>
                Back to Companies
              </button>
        
            </div>
          )}
          <h2 className="text-xl font-bold">Chats</h2>
          <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar" ref={chatContainerRef}>
            <div className="flex flex-col space-y-4">
              {selectedCompany ? (
                chats.length > 0 ? (
                  chats.map((chat) => (
                    <div key={chat.id} className={`p-4 ${chat.isadmin === '2' ? 'bg-green-100' : 'bg-blue-100'} rounded-2xl shadow`} style={{}}>
                      <p className="text-sm font-bold">{chat.isadmin === '2' ? 'Admin' : chat.fullname}</p>
                      <p>
                          {
                          String(chat.message).startsWith('http') ?
                          <a href={`${chat.message}`} style={{textDecoration:"underline",color:'blue'}}>View</a> :
                          <pre className="text-sm" style={{ whiteSpace: "break-spaces" }}>
                            {chat.message}
                          </pre>
                        }
                      </p>
                      <p className="text-xs text-gray-500 text-left mt-1">{new Date(chat.timestamp).toLocaleString('en-GB')}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm">No chats available for {selectedCompany.company_name}</p>
                )
              ) : (
                <p className="text-sm">Select a company to view chats</p>
              )}
            </div>
          </div>

          {selectedCompany && (
            <div className="sticky bottom-0 bg-gray-100 p-4">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  className="flex-1 p-4 rounded-full border-0 shadow-md"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handlekeyDown}
                />
                <button className="p-4 bg-blue-500 text-white rounded-full shadow-md " onClick={handleSendMessage}>
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentForumPage;