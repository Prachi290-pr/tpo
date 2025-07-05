import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../../api';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const ForumsDetailsIntership = ({ uid }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    const selectedPost = posts.find((post) => post.id === id);
    if (selectedPost) {
      navigate('/adminforumintership', {
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

  const handleDelete = async (id) => {
    const confirmation = prompt("Type 'DELETE' to confirm deletion:");
    if (confirmation === 'DELETE') {
      try {
        await api.post(`/forums/admin/intership/delete/${id}`);
        setPosts(posts.filter((post) => post.id !== id));
        alert('Post deleted successfully.');
      } catch (err) {
        console.error(err);
        alert('Failed to delete the post. Please try again.');
      }
    } else {
      alert('Deletion cancelled.');
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/forums/admin/intership');
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
    return format(date, 'dd-MM-yyyy');
  };

  return (
    <div className='container mx-auto p-6'>
      <br />
      <br />

      <div className='overflow-x-auto'>
        <div className='overflow-x-auto shadow-xl rounded-lg max-h-[500px] overflow-y-auto'>
          <table className=''>
            <thead className='sticky top-0 bg-gray-800 z-8 w-fulls'>
              <tr className='text-xs font-medium text-gray-500 uppercase tracking-wider'>
                <th className='px-4 py-2 text-center text-sm font-medium text-white'>
                  Name
                </th>
                <th className='px-4 py-2 text-center text-sm font-medium text-white'>
                  Location
                </th>
                <th className='px-4 py-2 text-center text-sm font-medium text-white'>
                  Job Description
                </th>
                <th className='px-4 py-2 text-center text-sm font-medium text-white'>
                  Package Details
                </th>
                <th className='px-4 py-2 text-center text-sm font-medium text-white'>
                  Roles
                </th>
                <th className='px-4 py-2 text-center text-sm font-medium text-white'>
                  Company Type
                </th>
                <th className='px-4 py-2 text-center text-sm font-medium text-white'>
                  Created At
                </th>
                <th className='px-4 py-2 text-center text-sm font-medium text-white'>
                  Action
                </th>
                <th className='px-4 py-2 text-center text-sm font-medium text-white'>
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {currentPosts.map((post, index) => (
                <tr key={index} className='hover:bg-gray-100'>
                  <td className='px-6 py-4 whitespace-nowrap  bg-white '>
                    {post.name}
                  </td>
                  <td className='px-6 py-3'>{post.location}</td>
                  <td className='px-6 py-3'>{post.job_description}</td>
                  <td className='px-6 py-3'>{post.package_details}</td>
                  <td className='px-6 py-3'>{post.roles}</td>
                  <td className='px-6 py-3'>{post.company_type}</td>
                  <td className='px-6 py-3'>{formatDate(post.createdAt)}</td>
                  <td className='px-6 py-3'>
                    <button
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                      onClick={() => handleClick(post.id)}
                    >
                      Forum
                    </button>
                  </td>
                  <td className='px-6 py-3'>
                    <button
                      className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='flex justify-center mt-4'>
        <nav className='block'>
          <ul className='flex pl-0 space-x-2'>
            {Array(Math.ceil(posts.length / postsPerPage))
              .fill()
              .map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 rounded-md text-sm font-medium text-black-600 hover:bg-blue-200 focus:outline focus:bg-blue-200 text-black ${
                      currentPage === index + 1 ? 'bg-gray-200 text-black' : ''
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

export default ForumsDetailsIntership;