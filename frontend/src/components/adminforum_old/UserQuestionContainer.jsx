import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import api from '../../api';

function UserQuestionContainer({ id }) {
  const [postuser, setPostUsers] = useState([]);
  const [replyText, setReplyText] = useState("");

  const DateTimeFormatter = (dateTime) => {
    let formattedDateTime = "";
    try {
      formattedDateTime = format(new Date(dateTime), "dd/MM/yyyy hh:mm a");
    } catch (error) {
      console.error("Error formatting date:", error);
    }

    return formattedDateTime;
  };

  useEffect(() => {
    const fetchPostusers = async () => {
      try {
        const response = await api.get(`forums/${id}`);
        setPostUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPostusers();
  }, [id]);

  const handleReplySubmit = async (postId) => {
    try {
      const response = await api.put(
        `forums/${postId}`,
        {
          answer: replyText,
        }
      );
      console.log("Reply posted successfully:", response.data);
      // Optionally update the UI after posting the reply
      // You can reload data or update state as needed
      setReplyText("");
      window.location.reload(); // Clear the reply input field after successful submission
    } catch (err) {
      console.error("Error posting reply:", err);
    }
  };

  if (!postuser || postuser.length === 0) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div
      className="w-full max-w-4xl mx-auto mt-10 bg-gray-50 p-6 rounded-lg shadow-lg"
      style={{ height: "400px", overflowY: "auto" }}
    >
      {postuser.map((user, index) => (
        <div
          key={index}
          className="bg-white border border-gray-300 rounded-lg shadow-md mb-6 p-6 transition-transform transform hover:scale-105"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <IoPersonOutline className="text-indigo-600 text-2xl" />
              <div className="ml-2">
                <div className="text-md font-semibold text-indigo-700">
                  {user.full_name}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <SlCalender className="text-gray-500 mr-1" />
                  {DateTimeFormatter(user.question_time)}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-start mb-4">
            <div className="max-w-xs rounded-lg shadow-md bg-blue-100 text-white py-2 px-4 break-words">
              <h4 className="font-bold text-lg text-indigo-600">Question:</h4>
              <p className="text-sm text-gray-700">{user.question}</p>
            </div>
          </div>
          {user.answer ? (
            <div className="flex justify-end mb-4">
              <div className="max-w-xs rounded-lg shadow-md bg-gray-200 py-2 px-4 break-words">
                <h4 className="font-bold text-lg  text-indigo-600">Answer:</h4>
                <p className="text-sm t text-gray-600">{user.answer}</p>
                <p className="text-xs  text-gray-400">
                  {DateTimeFormatter(user.answer_time)}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center mt-4">
              <textarea
                id={`reply-${index}`}
                rows="2"
                className="flex-1 p-1 m-0 border  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400"
                placeholder="Enter your reply"
                style={{ resize: "none" }}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              ></textarea>
              <button
                type="button"
                className="ml-2 px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                onClick={() => handleReplySubmit(user.id)}
              >
                Reply
              </button>
            </div>
          )}{" "}
        </div>
      ))}
    </div>
  );
}

export default UserQuestionContainer;
