// import React, { useEffect, useState } from 'react'
// import Post from './Post'
// import UserQuestionContainer from './UserQuestionContainer'
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';

// const AdminForum = () => {
//     const [UsersData,SetUserData] =useState()
   
// let location = useLocation();
  
//     // useEffect(() => {
       
//     //     const fetchuserdata = async () => {
//     //       try {
//     //         const response = await axios.get("http://localhost:8000/api/admin/forum/1");
//     //         SetUserData(response.data)
//     //       } catch (err) {
//     //         console.log(err);
//     //       }
//     //     };
    
//     //     fetchuserdata();
//     //   }, []);
//  console.log(location.state.name)

//   return (
//     <divz>
//        <Post
//         companyName={location.state.name}
//         date={location.state.createdAt}
//         location={location.state.location}
//         jobDescription={location.state.job_description}
//       />
//       <UserQuestionContainer id={location.state.id} /> 
//     </divz>
//   )
// }

// export default AdminForum
import React, { useEffect, useState } from 'react';
import Post from './Post';
import UserQuestionContainer from './UserQuestionContainer';
import { useLocation } from 'react-router-dom';

const AdminForum = () => {
  const location = useLocation();
  const { name, createdAt, joblocation, job_description, id } = location.state;
  console.log(location.state);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg ">
      <Post
        companyName={name}
        date={createdAt}
        location={location.state.location}
        jobDescription={job_description}
      />
      <UserQuestionContainer id={id} />
    </div>
  );
};

export default AdminForum;
