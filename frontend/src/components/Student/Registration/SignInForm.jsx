// import React, { useState } from 'react';
// import validateForm from './validate';
// import SignUpForm from './SignUpForm'; // Assuming validate.jsx is correctly implemented
// import { HiEye, HiEyeOff } from 'react-icons/hi'; 

// const SignInForm = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm(formData);
//     if (Object.keys(validationErrors).length === 0) {
//       alert('Sign In successful!'); // Replace with actual sign in logic
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   }

//   const handleSignUpClick = () => {
//     // Handle navigation to sign up form or display sign up form
//     // Example: Show SignUpForm component
//     // You might want to implement this navigation or conditional rendering logic
//     // Here, I'm just rendering the component conditionally based on a state
//     setShowSignUp(true);
//   };

//   const [showSignUp, setShowSignUp] = useState(false);

//   if (showSignUp) {
//     // Assuming SignUpForm is correctly imported and rendered
//     return <SignUpForm />;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
//         <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back!</h1>
//         <h3 className="text-sm text-gray-600 mb-4">Please enter your credentials to sign in.</h3>
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
//             <div className='relative'>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               placeholder="Password"
//             />
//             <button
//               type="button"
//               className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
//               onClick={togglePasswordVisibility}
//             >
//               {showPassword ? <HiEye /> : <HiEyeOff />}
//             </button>
//             </div>
//             {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//           </div>
//             <div>
//               <a href="/" className="text-sm text-blue-500 hover:text-blue-700">
//                 Forgot password?
//               </a>
//             </div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
//               >
//                 Submit
//               </button>
//           <p className="mt-2 text-sm text-gray-600">
//             Don't have an account?{' '}
//             <button
//               type="button"
//               className="text-blue-500 hover:text-blue-700 focus:outline-none"
//               onClick={handleSignUpClick}
//             >
//               Sign Up
//             </button>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignInForm;
