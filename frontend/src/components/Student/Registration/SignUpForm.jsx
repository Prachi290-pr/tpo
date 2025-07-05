// import React, { useState } from 'react';
// import validateForm from './validate';
// // import SignInForm from './SignInForm';
// import { HiEye, HiEyeOff } from 'react-icons/hi';
// import axios from 'axios';
// import RegistrationForm from './RegistrationForm';
// import LoginPage from '../../Login/Login';
// import { useLocation, useNavigate } from "react-router-dom";

// const SignUpForm = () => {
//     // const location = useLocation();
//     const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [err, setErr] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm(formData);
//     if (Object.keys(validationErrors).length === 0) {
//       if (formData.password !== formData.confirmPassword) {
//         setErrors({ confirmPassword: 'Passwords do not match' });
//       } else {
//         try {
//           const res = await axios.post("https://api.tpo.getflytechnologies.com/register/", { email: formData.email, pass: formData.password });
//           console.log(res);
//           alert('Form submitted successfully!');
//           setIsSubmitted(true);
//         } catch (error) {
//           console.log(error);
//           setErr(error.response.data);
//         }
//       }
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   const handleSignInClick = () => {
//     setShowSignIn(true);
//   };

//   const [showSignIn, setShowSignIn] = useState(false);

//   if (showSignIn) {
//     // return <LoginPage />;
//     navigate('/');
//   }

//   if (isSubmitted) {
//     // return <RegistrationForm email={formData.email} />;
//     navigate('/registration', {state: {email: formData.email}});
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
//         <h1 className="text-2xl font-bold text-gray-800 mb-2">Sign up</h1>
//         <h3 className="text-sm text-gray-600 mb-4">Create your account</h3>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               placeholder="Email"
//             />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 placeholder="Password"
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? <HiEyeOff className="h-5 w-5 text-white-500" /> : <HiEye className="h-5 w-5 text-white-500" />}
//               </button>
//             </div>
//             {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 placeholder="Confirm Password"
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
//                 onClick={toggleConfirmPasswordVisibility}
//               >
//                 {showConfirmPassword ? <HiEyeOff className="h-5 w-5 text-white-500" /> : <HiEye className="h-5 w-5 text-white-500" />}
//               </button>
//             </div>
//             {err && <p className='text-red-500 text-sm'>{err}</p>}
//             {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
//             >
//               Submit
//             </button>
//             <p className='mt-2 text-sm text-gray-600'>
//               Already have an account? 
//               <button
//               type='button'
//               className='text-white-500 hover:text-blue-700 focus:outline-none  '
//               onClick={handleSignInClick} 
//               >Sign In</button>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;


import React, { useState, useEffect } from 'react';
import validateForm from './validate';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../../api';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [err, setErr] = useState(null);

  const [isActive, setIsActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await api.get('/register/registrationStatus');

        if (response.status === 200) {
          setIsActive(response.data.val);
        } else {
          setStatusMessage('Failed to fetch registration status.');
        }
      } catch (error) {
        setStatusMessage('Failed to fetch registration status. Please try again.');
      }
    };

    fetchStatus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: 'Passwords do not match' });
      } else {
        try {
          const res = await axios.post("https://api.tpo.getflytechnologies.com/register/", { email: formData.email, pass: formData.password });
          console.log(res);
          alert('Form submitted successfully!');
          setIsSubmitted(true);
        } catch (error) {
          console.log(error);
          setErr(error.response.data);
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignInClick = () => {
    navigate('/');
  };

  if (!isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Registrations Closed</h1>
          <p className="text-sm text-gray-600 mb-4">
            Registrations are currently closed. Please visit the TPO office for more details.
          </p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    navigate('/registration', { state: { email: formData.email } });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Sign up</h1>
        <h3 className="text-sm text-gray-600 mb-4">Create your account</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <HiEyeOff className="h-5 w-5 text-white-500" /> : <HiEye className="h-5 w-5 text-white-500" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <HiEyeOff className="h-5 w-5 text-white-500" /> : <HiEye className="h-5 w-5 text-white-500" />}
              </button>
            </div>
            {err && <p className="text-red-500 text-sm">{err}</p>}
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Submit
            </button>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                className="text-white-500 hover:text-blue-700 focus:outline-none"
                onClick={handleSignInClick}
              >
                Sign In
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;