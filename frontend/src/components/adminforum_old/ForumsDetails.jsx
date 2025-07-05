// // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // import { format } from "date-fns";
// // import PostForm from "./PostForm";
// // import { useNavigate } from "react-router-dom";
// // import api from '../../api';

// // const ForumsDetails = () => {
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [posts, setPosts] = useState([]);
// //   const navigate = useNavigate();

// //   const handleClick = (id) => {
// //     const selectedPost = posts.find((post) => post.id === id);
// //     if (selectedPost) {
// //       navigate("/postform", {
// //         state: {
// //           id: selectedPost.id,
// //           name: selectedPost.name,
// //           location: selectedPost.location,
// //           job_description: selectedPost.job_description,
// //           package_details: selectedPost.package_details,
// //           roles: selectedPost.roles,
// //           createdAt: formatDate(selectedPost.createdAt),
// //         },
// //       });
// //     }
// //   };

// //   useEffect(() => {
// //     const fetchPosts = async () => {
// //       try {
// //         const response = await api.get("forums");
// //         setPosts(response.data);
// //       } catch (err) {
// //         console.log(err);
// //       }
// //     };

// //     fetchPosts();
// //   }, []);

// //   const postsPerPage = 7;
// //   const indexOfLastPost = currentPage * postsPerPage;
// //   const indexOfFirstPost = indexOfLastPost - postsPerPage;
// //   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     return format(date, "dd-MM-yyyy");
// //   };

// //   return (
// //     <div className="container">
// //       <div className="container">
// //         <h4 className="font-bold text-4xl  text-center text-indigo-700">
// //           POSTS{" "}
// //         </h4>
// //       </div>
// //       <div className="container">
// //         <div className="w-full  bg-gray-30 border-solid border-2 rounded  p-6 rounded-lg shadow-lg mt-10 mx-auto">
// //           <div className="overflow-x-auto">
// //             <div className="shadow-lg border-solid border-2 rounded-xl">
// //               <table className="min-w-full divide-y  divide-gray-200 bg-white">
// //                 <thead className="bg-gray-50">
// //                   <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     <th className="px-6 py-5 sticky whitespace-nowrap  left-0 bg-white z-10">
// //                       Name
// //                     </th>
// //                     <th className="px-6 py-5">Location</th>
// //                     <th className="px-6 py-5">Job Description</th>
// //                     <th className="px-6 py-5">Package Details</th>
// //                     <th className="px-6 py-5">Roles</th>
// //                     <th className="px-6 py-5">Created At</th>
// //                     <th className="px-6 py-5">Action</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-gray-200">
// //                   {currentPosts.map((post, index) => (
// //                     <tr key={index} className="hover:bg-gray-100">
// //                       <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white z-10">
// //                         {post.name}
// //                       </td>
// //                       <td className="px-6 py-3">{post.location}</td>
// //                       <td className="px-6 py-3">{post.job_description}</td>
// //                       <td className="px-6 py-3">{post.package_details}</td>
// //                       <td className="px-6 py-3">{post.roles}</td>
// //                       <td className="px-6 py-3">
// //                         {formatDate(post.createdAt)}
// //                       </td>
// //                       <td className="px-6 py-3">
// //                         <button
// //                           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// //                           onClick={() => handleClick(post.id)}
// //                         >
// //                           Forum
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //           <div className="flex justify-end mt-4">
// //             <nav className="block">
// //               <ul className="flex pl-0 space-x-2">
// //                 {Array(Math.ceil(posts.length / postsPerPage))
// //                   .fill()
// //                   .map((_, index) => (
// //                     <li key={index}>
// //                       <button
// //                         onClick={() => setCurrentPage(index + 1)}
// //                         className={`px-3 py-1 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 ${
// //                           currentPage === index + 1 ? "bg-gray-200" : ""
// //                         }`}
// //                       >
// //                         {index + 1}
// //                       </button>
// //                     </li>
// //                   ))}
// //               </ul>
// //             </nav>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ForumsDetails;

// import React, { useEffect, useState } from "react";
// import { format } from "date-fns";
// import PostForm from "./PostForm";
// import { useNavigate } from "react-router-dom";
// import api from '../../api';

// const ForumsDetails = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [posts, setPosts] = useState([]);
//   const navigate = useNavigate();

//   const handleClick = (id) => {
//     const selectedPost = posts.find((post) => post.id === id);
//     if (selectedPost) {
//       navigate("/postform", {
//         state: {
//           id: selectedPost.id,
//           name: selectedPost.name,
//           location: selectedPost.location,
//           job_description: selectedPost.job_description,
//           package_details: selectedPost.package_details,
//           roles: selectedPost.roles,
//           createdAt: formatDate(selectedPost.createdAt),
//         },
//       });
//     }
//   };

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await api.get("forums");
//         setPosts(response.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const postsPerPage = 7;
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return format(date, "dd-MM-yyyy");
//   };

//   return (
//     <div className="container mx-auto mt-12">
//       <h4 className="font-bold text-4xl text-center text-indigo-700">POSTS</h4>
//       <div className="w-full bg-gray-30 border-solid border-2 rounded p-6 rounded-lg shadow-lg mt-10 mx-auto">
//         <div className="overflow-x-auto">
//           <div className="shadow-lg border-solid border-2 rounded-xl">
//             <table className="min-w-full divide-y divide-gray-200 bg-white">
//               <thead className="bg-gray-50">
//                 <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   <th className="px-6 py-5 sticky left-0 bg-white z-10">Name</th>
//                   <th className="px-6 py-5">Location</th>
//                   <th className="px-6 py-5">Job Description</th>
//                   <th className="px-6 py-5">Package Details</th>
//                   <th className="px-6 py-5">Roles</th>
//                   <th className="px-6 py-5">Created At</th>
//                   <th className="px-6 py-5">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {currentPosts.map((post, index) => (
//                   <tr key={index} className="hover:bg-gray-100">
//                     <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white z-10">{post.name}</td>
//                     <td className="px-6 py-3">{post.location}</td>
//                     <td className="px-6 py-3">{post.job_description}</td>
//                     <td className="px-6 py-3">{post.package_details}</td>
//                     <td className="px-6 py-3">{post.roles}</td>
//                     <td className="px-6 py-3">{formatDate(post.createdAt)}</td>
//                     <td className="px-6 py-3">
//                       <button
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                         onClick={() => handleClick(post.id)}
//                       >
//                         Forum
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <div className="flex justify-end mt-4">
//           <nav className="block">
//             <ul className="flex pl-0 space-x-2">
//               {Array(Math.ceil(posts.length / postsPerPage))
//                 .fill()
//                 .map((_, index) => (
//                   <li key={index}>
//                     <button
//                       onClick={() => setCurrentPage(index + 1)}
//                       className={`px-3 py-1 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 ${
//                         currentPage === index + 1 ? "bg-gray-200" : ""
//                       }`}
//                     >
//                       {index + 1}
//                     </button>
//                   </li>
//                 ))}
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForumsDetails;

// import React, { useEffect, useState } from "react";
// import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";
// import api from '../../api';

// const ForumsDetails = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [posts, setPosts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await api.get("forums");
//         setPosts(response.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const postsPerPage = 7;
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return format(date, "dd-MM-yyyy");
//   };

//   return (
//     <div className="p-4 min-h-screen">
//       <h4 className="font-bold text-4xl text-center text-black-700 mb-2">POSTS</h4>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded-lg shadow-lg">
//           <thead className="text-black">
//             <tr>
//               <th className="py-2 px-6 border-b text-black bg-gray-200 sticky left-0">
//                 Name
//               </th>
//               <th className="py-2 px-6 border-b text-black bg-gray-200">
//                 Location
//               </th>
//               <th className="py-2 px-6 border-b text-black bg-gray-200">
//                 Job Description
//               </th>
//               <th className="py-2 px-6 border-b text-black bg-gray-200">
//                 Package Details
//               </th>
//               <th className="py-2 px-6 border-b text-black bg-gray-200">
//                 Roles
//               </th>
//               <th className="py-2 px-6 border-b text-black bg-gray-200">
//                 Created At
//               </th>
//               <th className="py-2 px-6 border-b text-black bg-gray-200">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentPosts.map((post, index) => (
//               <tr key={index}>
//                 <td className="py-4 px-6 border-b sticky left-0 bg-white">
//                   {post.name}
//                 </td>
//                 <td className="py-3 px-6 border-b bg-white">
//                   {post.location}
//                 </td>
//                 <td className="py-3 px-6 border-b bg-white">
//                   {post.job_description}
//                 </td>
//                 <td className="py-3 px-6 border-b bg-white">
//                   {post.package_details}
//                 </td>
//                 <td className="py-3 px-6 border-b bg-white">
//                   {post.roles}
//                 </td>
//                 <td className="py-3 px-6 border-b bg-white">
//                   {formatDate(post.createdAt)}
//                 </td>
//                 <td className="py-3 px-6 border-b bg-white">
//                   <button
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                     onClick={() => navigate(/postform/${post.id})}
//                   >
//                     Forum
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="flex justify-end mt-4">
//         <nav className="block">
//           <ul className="flex pl-0 space-x-2">
//             {Array(Math.ceil(posts.length / postsPerPage))
//               .fill()
//               .map((_, index) => (
//                 <li key={index}>
//                   <button
//                     onClick={() => setCurrentPage(index + 1)}
//                     className={`px-3 py-1 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 ${
//                       currentPage === index + 1 ? "bg-gray-200" : ""
//                     }`}
//                   >
//                     {index + 1}
//                   </button>
//                 </li>
//               ))}
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default ForumsDetails;

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const ForumsDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("forums");
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, []);

  const postsPerPage = 7;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd-MM-yyyy");
  };

  const handleClick = (id) => {
    console.log("ID:",id);
        const selectedPost = posts.find((post) => post.id === id);
        if (selectedPost) {
          navigate("/postform", {
            state: {
              id: selectedPost.id,
              name: selectedPost.name,
              location: selectedPost.location,
              job_description: selectedPost.job_description,
              package_details: selectedPost.package_details,
              roles: selectedPost.roles,
              createdAt: formatDate(selectedPost.createdAt),
            },
          });
        }
      };

  return (
    <div className="p-4 min-h-screen">
      <h4 className="font-bold text-4xl text-center text-black-700 my-4">
        Posts
      </h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="text-black">
            <tr>
              <th className="py-2 px-6 border-b text-black bg-gray-200 sticky left-0">
                Name
              </th>
              <th className="py-2 px-6 border-b text-black bg-gray-200">
                Location
              </th>
              <th className="py-2 px-6 border-b text-black bg-gray-200">
                Job Description
              </th>
              <th className="py-2 px-6 border-b text-black bg-gray-200">
                Package Details
              </th>
              <th className="py-2 px-6 border-b text-black bg-gray-200">
                Roles
              </th>
              <th className="py-2 px-6 border-b text-black bg-gray-200">
                Created At
              </th>
              <th className="py-2 px-6 border-b text-black bg-gray-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post, index) => (
              <tr key={index}>
                <td className="py-4 px-6 border-b sticky left-0 bg-white">
                  {post.name}
                </td>
                <td className="py-3 px-6 border-b bg-white">{post.location}</td>
                <td className="py-3 px-6 border-b bg-white">
                  {post.job_description}
                </td>
                <td className="py-3 px-6 border-b bg-white">
                  {post.package_details}
                </td>
                <td className="py-3 px-6 border-b bg-white">{post.roles}</td>
                <td className="py-3 px-6 border-b bg-white">
                  {formatDate(post.createdAt)}
                </td>
                <td className="py-3 px-6 border-b bg-white">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={()=>handleClick(post.id)}
                  >
                    Forum
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <nav className="block">
          <ul className="flex pl-0 space-x-2">
            {Array(Math.ceil(posts.length / postsPerPage))
              .fill()
              .map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 ${
                      currentPage === index + 1 ? "bg-gray-200" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ForumsDetails;
